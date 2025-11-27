import type React from 'react';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../app/hooks';
import { getMe, verifyMagicLink } from '../features/auth/authThunks';
import { AuthLayout } from '../shared/layouts/AuthLayout';
import { ErrorLayout } from '../shared/layouts/ErrorLayout';
import { LoadingLayout } from '../shared/layouts/LoadingLayout';
import { SuccessLayout } from '../shared/layouts/SuccessLayout';
import { pageRoutes } from '../shared/types';

export const MagicLinkVerifyPage: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { verificationError, isAuthenticated, user } = useAppSelector((state) => state.auth);

  const token = searchParams.get('token');

  useEffect(() => {
    if (!token) {
      return;
    }

    // Verify the magic link token and fetch user data
    const verifyAndFetchUser = async () => {
      const result = await dispatch(verifyMagicLink({ token }));

      // If verification was successful, fetch user data
      if (verifyMagicLink.fulfilled.match(result)) {
        dispatch(getMe());
      }
    };

    void verifyAndFetchUser();
  }, [dispatch, token]);

  useEffect(() => {
    // Redirect to Eurojackpot page after successful authentication and user data is loaded
    if (isAuthenticated && user) {
      const timer = setTimeout(() => {
        navigate(pageRoutes.Home);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [isAuthenticated, user, navigate]);

  // No token provided
  if (!token) {
    return (
      <AuthLayout>
        <ErrorLayout
          title={t('verify.invalidLink')}
          message={t('verify.noTokenProvided')}
          actionLabel={t('verify.backToLogin')}
          actionPath={pageRoutes.Login}
        />
      </AuthLayout>
    );
  }

  // Verification error
  if (verificationError) {
    return (
      <AuthLayout>
        <ErrorLayout
          title={t('verify.verificationFailed')}
          actionLabel={t('verify.backToLogin')}
          actionPath={pageRoutes.Login}
        />
      </AuthLayout>
    );
  }

  // Verification successful and user data loaded
  if (isAuthenticated && user) {
    return (
      <AuthLayout>
        <SuccessLayout title={t('verify.verificationSuccessful')} message={t('verify.redirecting')} />
      </AuthLayout>
    );
  }

  // Verifying (loading state)
  return (
    <AuthLayout>
      <LoadingLayout title={t('verify.verifying')} message={t('verify.pleaseWait')} />
    </AuthLayout>
  );
};
