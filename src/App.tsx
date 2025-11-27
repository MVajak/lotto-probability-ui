import { Navigate, Route, Routes } from 'react-router-dom';

import { AuthProvider } from './features/auth/AuthProvider';
import { HomePage } from './HomePage';
import { LoginPage } from './LoginPage';
import { MagicLinkVerifyPage } from './MagicLinkVerifyPage';
import { ProfilePage } from './ProfilePage';
import { SubscriptionPage } from './SubscriptionPage';
import { pageRoutes } from './shared/types';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Navigate to={pageRoutes.Home} replace />} />
        <Route path={pageRoutes.Login} element={<LoginPage />} />
        <Route path={pageRoutes.Verify} element={<MagicLinkVerifyPage />} />
        <Route path={pageRoutes.Home} element={<HomePage />} />
        <Route path={pageRoutes.Profile} element={<ProfilePage />} />
        <Route path={pageRoutes.Subscription} element={<SubscriptionPage />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
