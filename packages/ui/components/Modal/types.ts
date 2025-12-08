import type { ReactNode } from 'react';

export enum ModalPosition {
  CENTER = 'center',
  RIGHT = 'right',
  LEFT = 'left',
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  position?: ModalPosition;
  showCloseButton?: boolean;
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  testId?: string;
}
