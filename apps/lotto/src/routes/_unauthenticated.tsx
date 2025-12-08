import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';

import { useAuthStore } from '@/domains/auth';

export const Route = createFileRoute('/_unauthenticated')({
  beforeLoad: () => {
    const accessToken = useAuthStore.getState().accessToken;
    if (accessToken) {
      throw redirect({ to: '/home' });
    }
  },
  component: UnauthenticatedLayout,
});

function UnauthenticatedLayout() {
  return <Outlet />;
}
