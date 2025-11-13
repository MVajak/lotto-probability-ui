import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
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

  // Fetch user data on app initialization if token exists
  useEffect(() => {
    if (isAuthenticated && !user) {
      dispatch(getMe());
    }
  }, [dispatch, isAuthenticated, user]);

  // Redirect unauthenticated users to login
  useEffect(() => {
    const isPublicRoute = PUBLIC_ROUTES.includes(location.pathname);

    if (!isAuthenticated && !isPublicRoute) {
      navigate('/login');
    }
  }, [isAuthenticated, location.pathname, navigate]);

  return <>{children}</>;
};
