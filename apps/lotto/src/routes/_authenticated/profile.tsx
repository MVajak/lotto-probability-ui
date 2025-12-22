import { Suspense } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

import { Card, CardContent, Spinner } from '@lotto/ui';

import { currentUserQuery } from '@/domains/auth';
import { ProfileForm } from '@/domains/auth/components';
import { PageLayout } from '@/layouts/PageLayout';

export const Route = createFileRoute('/_authenticated/profile')({
  loader: ({ context }) => context.queryClient.ensureQueryData(currentUserQuery),
  component: ProfilePage,
});

function ProfilePage() {
  return (
    <PageLayout>
      <div className="py-6">
        <div className="mx-auto max-w-2xl">
          <Suspense fallback={<ProfileSkeleton />}>
            <ProfileContent />
          </Suspense>
        </div>
      </div>
    </PageLayout>
  );
}

function ProfileSkeleton() {
  return (
    <Card>
      <CardContent className="flex items-center justify-center p-12">
        <Spinner className="size-8" />
      </CardContent>
    </Card>
  );
}

function ProfileContent() {
  const { data } = useSuspenseQuery(currentUserQuery);

  return (
    <Card>
      <CardContent className="p-6 sm:p-8">
        <ProfileForm user={data.user} />
      </CardContent>
    </Card>
  );
}
