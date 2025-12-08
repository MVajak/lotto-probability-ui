'use client';

import type React from 'react';
import { type MouseEvent, useCallback, useEffect } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

import { cn } from '@lotto/ui/utils';

import { IconButton } from '../..';
import { ModalPosition, type ModalProps } from './types';
import { closeButtonWrapperVariants, modalVariants, wrapperVariants } from './variants';

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
  position = ModalPosition.CENTER,
  showCloseButton = true,
  closeOnOverlayClick = true,
  closeOnEscape = true,
  testId = 'modal',
}) => {
  // Handle escape key press
  const handleEscape = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape' && closeOnEscape) {
        onClose();
      }
    },
    [onClose, closeOnEscape]
  );

  // Handle overlay click
  const handleOverlayClick = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      if (closeOnOverlayClick && event.target === event.currentTarget) {
        onClose();
      }
    },
    [onClose, closeOnOverlayClick]
  );

  // Add/remove escape key listener
  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, handleEscape]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" data-testid={testId}>
      <div
        className="fixed inset-0 bg-foreground/20 transition-opacity"
        onClick={handleOverlayClick}
        aria-hidden="true"
      />

      <div className={wrapperVariants({ position })}>
        <div className={cn(modalVariants({ position, size, isOpen }))}>
          {(title || showCloseButton) && (
            <div className="flex items-center justify-between p-8">
              {title && <h2 className="text-body-large text-subtle-foreground">{title}</h2>}
              {showCloseButton && (
                <div className={closeButtonWrapperVariants({ hasTitle: !!title })}>
                  <IconButton onClick={onClose} label="Close modal" variant="ghost">
                    <XMarkIcon />
                  </IconButton>
                </div>
              )}
            </div>
          )}

          <div className="overflow-y-auto">{children}</div>
        </div>
      </div>
    </div>
  );
};
