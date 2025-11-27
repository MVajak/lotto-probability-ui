import type React from 'react';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { pageRoutes } from '../../shared/types';
import { getMe } from './authThunks';

interface AuthProviderProps {
  children: React.ReactNode;
}

const PUBLIC_ROUTES = ['/login', '/verify'];

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);

  // Fetch user data on app initialization if token exists (but not on public routes)
  useEffect(() => {
    const isPublicRoute = PUBLIC_ROUTES.includes(location.pathname);

    if (isAuthenticated && !user && !isPublicRoute) {
      dispatch(getMe());
    }
  }, [dispatch, isAuthenticated, user, location.pathname]);

  // Redirect unauthenticated users to login
  useEffect(() => {
    const isPublicRoute = PUBLIC_ROUTES.includes(location.pathname);

    if (!isAuthenticated && !isPublicRoute) {
      navigate(pageRoutes.Login);
    }
  }, [isAuthenticated, location.pathname, navigate]);

  return <>{children}</>;
};
