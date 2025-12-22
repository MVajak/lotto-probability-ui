import { useAuthStore } from '../auth/store';
import type { AuthTokens } from '../auth/types';

const API_URL = import.meta.env.VITE_API_URL;

/**
 * Track if we're currently refreshing tokens to prevent multiple simultaneous refresh calls.
 * When a refresh is in progress, subsequent 401s will wait for it to complete.
 */
let isRefreshing = false;
let refreshPromise: Promise<AuthTokens> | null = null;

/**
 * Low-level fetch without automatic token refresh.
 * Used internally for the refresh endpoint itself.
 */
async function rawFetch(endpoint: string, options: RequestInit = {}): Promise<Response> {
  const token = useAuthStore.getState().accessToken;

  return fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  });
}

/**
 * Refresh access token using the refresh token.
 * Returns new tokens or throws if refresh fails.
 */
async function refreshTokens(): Promise<AuthTokens> {
  const refreshToken = useAuthStore.getState().refreshToken;

  if (!refreshToken) {
    throw new Error('No refresh token available');
  }

  const response = await fetch(`${API_URL}/auth/refresh`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refreshToken }),
  });

  if (!response.ok) {
    throw new Error('Token refresh failed');
  }

  return response.json();
}

/**
 * Handle token refresh with deduplication.
 * Multiple concurrent 401s will share the same refresh request.
 */
async function handleTokenRefresh(): Promise<AuthTokens> {
  if (isRefreshing && refreshPromise) {
    return refreshPromise;
  }

  isRefreshing = true;
  refreshPromise = refreshTokens()
    .then((tokens) => {
      useAuthStore.getState().setTokens(tokens);
      return tokens;
    })
    .finally(() => {
      isRefreshing = false;
      refreshPromise = null;
    });

  return refreshPromise;
}

/**
 * Main API fetch function with automatic token refresh on 401.
 *
 * Flow:
 * 1. Make request with current access token
 * 2. If 401 (unauthorized), attempt to refresh tokens
 * 3. Retry original request with new access token
 * 4. If refresh fails, logout user and throw error
 */
export async function apiFetch<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  let response = await rawFetch(endpoint, options);

  // Handle 401 Unauthorized - attempt token refresh
  if (response.status === 401) {
    try {
      await handleTokenRefresh();

      // Retry the original request with new token
      response = await rawFetch(endpoint, options);
    } catch {
      // Refresh failed - logout user
      useAuthStore.getState().logout();
      throw new Error('Session expired. Please login again.');
    }
  }

  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`);
  }

  // Handle 204 No Content responses
  if (response.status === 204) {
    return undefined as T;
  }

  return response.json();
}
