import { cva } from 'class-variance-authority';

import { ModalPosition } from './types';

export const wrapperVariants = cva('flex min-h-screen items-center', {
  variants: {
    position: {
      [ModalPosition.CENTER]: 'justify-center p-4',
      [ModalPosition.RIGHT]: 'justify-end p-4',
      [ModalPosition.LEFT]: 'justify-start p-4',
    },
  },
  defaultVariants: {
    position: ModalPosition.CENTER,
  },
});

export const modalVariants = cva('flex flex-col rounded-3xl bg-background shadow-xl', {
  variants: {
    position: {
      [ModalPosition.CENTER]: 'relative w-full transform overflow-hidden transition-all',
      [ModalPosition.RIGHT]:
        'fixed top-4 right-4 h-[calc(100%-32px)] transform transition-transform duration-300 ease-out',
      [ModalPosition.LEFT]:
        'fixed top-4 left-4 h-[calc(100%-32px)] transform transition-transform duration-300 ease-out',
    },
    size: {
      sm: '',
      md: '',
      lg: '',
      xl: '',
    },
    isOpen: {
      true: '',
      false: '',
    },
  },
  compoundVariants: [
    // Center position sizes
    {
      position: ModalPosition.CENTER,
      size: 'sm',
      className: 'max-w-md',
    },
    {
      position: ModalPosition.CENTER,
      size: 'md',
      className: 'max-w-lg',
    },
    {
      position: ModalPosition.CENTER,
      size: 'lg',
      className: 'max-w-2xl',
    },
    {
      position: ModalPosition.CENTER,
      size: 'xl',
      className: 'max-w-4xl',
    },
    // Side modal sizes
    {
      position: [ModalPosition.RIGHT, ModalPosition.LEFT],
      size: ['sm', 'md', 'lg'],
      className: 'w-full max-w-md',
    },
    {
      position: [ModalPosition.RIGHT, ModalPosition.LEFT],
      size: 'xl',
      className: 'w-[800px] max-w-4xl',
    },
    // Right modal animations
    {
      position: ModalPosition.RIGHT,
      isOpen: true,
      className: 'translate-x-0',
    },
    {
      position: ModalPosition.RIGHT,
      isOpen: false,
      className: 'translate-x-full',
    },
    // Left modal animations
    {
      position: ModalPosition.LEFT,
      isOpen: true,
      className: 'translate-x-0',
    },
    {
      position: ModalPosition.LEFT,
      isOpen: false,
      className: '-translate-x-full',
    },
  ],
  defaultVariants: {
    position: ModalPosition.CENTER,
    size: 'md',
    isOpen: true,
  },
});

export const closeButtonWrapperVariants = cva('', {
  variants: {
    hasTitle: {
      true: '',
      false: 'ml-auto',
    },
  },
  defaultVariants: {
    hasTitle: false,
  },
});
