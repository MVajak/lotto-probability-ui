import type { QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';

import { Toaster } from '@lotto/ui';

import { config } from '@/config';
import { ThemeApplier, ThemeProvider } from '@/domains/theme';

function RootComponent() {
  return (
    <ThemeProvider>
      <ThemeApplier />
      <Toaster />
      <Outlet />
      {config.isDev && (
        <>
          <TanStackRouterDevtools position="bottom-right" />
          <ReactQueryDevtools buttonPosition="bottom-left" />
        </>
      )}
    </ThemeProvider>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  component: RootComponent,
});
