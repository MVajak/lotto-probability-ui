import type React from 'react';
import { useState } from 'react';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import {
  Avatar,
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Field,
  FieldDescription,
  FieldLabel,
  Input,
  Separator,
} from '@lotto/ui';

import { useDeleteAccountMutation, useUpdateProfileMutation } from '@/domains/auth';

import type { UpdateProfileInput, User } from '../../types';

interface ProfileFormProps {
  user: User;
}

export const ProfileForm: React.FC<ProfileFormProps> = ({ user }) => {
  const { t, i18n } = useTranslation();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const updateProfileMutation = useUpdateProfileMutation();
  const deleteAccountMutation = useDeleteAccountMutation();

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<UpdateProfileInput>({
    defaultValues: {
      firstName: user.firstName ?? '',
      lastName: user.lastName ?? '',
      phoneNumber: user.phoneNumber ?? '',
      country: user.country ?? '',
    },
    mode: 'onChange',
  });

  const onSubmit = (data: UpdateProfileInput) => {
    updateProfileMutation.mutate(data);
  };

  const handleDeleteConfirm = () => {
    setShowDeleteDialog(false);
    deleteAccountMutation.mutate();
  };

  const displayName = [user.firstName, user.lastName].filter(Boolean).join(' ') || user.email;
  const memberSince = new Date(user.createdAt).toLocaleDateString(i18n.language, {
    year: 'numeric',
    month: 'long',
  });

  return (
    <>
      {/* Profile Header */}
      <div className="mb-8 flex items-center gap-4">
        <Avatar displayName={displayName} color="blue" className="size-16 text-title-default" />
        <div className="flex-1">
          <h2 className="text-title-default">{displayName}</h2>
          <p className="text-body-small text-muted-foreground">{user.email}</p>
          <p className="text-label-small text-muted-foreground/70">{t('profile.memberSince', { date: memberSince })}</p>
        </div>
      </div>

      <Separator className="mb-8" />

      {/* Profile Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <Controller
            name="firstName"
            control={control}
            render={({ field }) => (
              <Field data-invalid={!!errors.firstName}>
                <FieldLabel htmlFor="firstName">{t('profile.firstName')}</FieldLabel>
                <Input id="firstName" placeholder={t('profile.firstNamePlaceholder')} {...field} />
              </Field>
            )}
          />
          <Controller
            name="lastName"
            control={control}
            render={({ field }) => (
              <Field data-invalid={!!errors.lastName}>
                <FieldLabel htmlFor="lastName">{t('profile.lastName')}</FieldLabel>
                <Input id="lastName" placeholder={t('profile.lastNamePlaceholder')} {...field} />
              </Field>
            )}
          />
        </div>

        <Field>
          <FieldLabel htmlFor="email">{t('profile.email')}</FieldLabel>
          <Input id="email" type="email" value={user.email} disabled />
          <FieldDescription>{t('profile.emailCannotBeChanged')}</FieldDescription>
        </Field>

        <Controller
          name="phoneNumber"
          control={control}
          render={({ field }) => (
            <Field data-invalid={!!errors.phoneNumber}>
              <FieldLabel htmlFor="phoneNumber">{t('profile.phoneNumber')}</FieldLabel>
              <Input id="phoneNumber" type="tel" placeholder={t('profile.phoneNumberPlaceholder')} {...field} />
            </Field>
          )}
        />

        <Controller
          name="country"
          control={control}
          render={({ field }) => (
            <Field data-invalid={!!errors.country}>
              <FieldLabel htmlFor="country">{t('profile.country')}</FieldLabel>
              <Input id="country" placeholder={t('profile.countryPlaceholder')} {...field} />
            </Field>
          )}
        />

        <div className="pt-4">
          <Button
            type="submit"
            loading={updateProfileMutation.isPending}
            variant="primary"
            disabled={!isDirty}
            className="w-full sm:w-auto"
          >
            {t('profile.saveChanges')}
          </Button>
        </div>
      </form>

      <Separator className="my-8" />

      <section>
        <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-body-default-bold">{t('profile.deleteAccount')}</p>
              <p className="text-body-small text-muted-foreground">{t('profile.deleteAccountDescription')}</p>
            </div>
            <Button type="button" variant="error" size="sm" onClick={() => setShowDeleteDialog(true)}>
              {t('profile.deleteAccount')}
            </Button>
          </div>
        </div>
      </section>

      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-destructive/10">
              <ExclamationTriangleIcon className="size-6 text-destructive" />
            </div>
            <DialogTitle className="text-center">{t('profile.deleteConfirmTitle')}</DialogTitle>
            <DialogDescription className="text-center">{t('profile.deleteConfirmDescription')}</DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:justify-center">
            <DialogClose asChild>
              <Button variant="outline">{t('profile.cancel')}</Button>
            </DialogClose>
            <Button variant="error" loading={deleteAccountMutation.isPending} onClick={handleDeleteConfirm}>
              {t('profile.confirmDelete')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
