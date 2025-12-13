'use client';

import type React from 'react';
import type { ReactNode } from 'react';

import { cn } from '@lotto/ui/utils';

type BannerVariant = 'success' | 'warning' | 'error' | 'info' | 'neutral';

interface BannerProps {
  variant?: BannerVariant;
  icon?: ReactNode;
  title: string;
  description?: string;
  className?: string;
  children?: ReactNode;
}

const variantStyles: Record<
  BannerVariant,
  { border: string; bg: string; iconBg: string; iconText: string; titleText: string }
> = {
  success: {
    border: 'border-l-primary-green',
    bg: 'bg-gradient-to-r from-primary-green/15 to-primary-green/5',
    iconBg: 'bg-primary-green/20',
    iconText: 'text-primary-green',
    titleText: 'text-primary-green',
  },
  warning: {
    border: 'border-l-gold',
    bg: 'bg-gradient-to-r from-gold/15 to-gold/5',
    iconBg: 'bg-gold/20',
    iconText: 'text-gold',
    titleText: 'text-gold',
  },
  error: {
    border: 'border-l-primary-red',
    bg: 'bg-gradient-to-r from-primary-red/15 to-primary-red/5',
    iconBg: 'bg-primary-red/20',
    iconText: 'text-primary-red',
    titleText: 'text-primary-red',
  },
  info: {
    border: 'border-l-primary-blue',
    bg: 'bg-gradient-to-r from-primary-blue/15 to-primary-blue/5',
    iconBg: 'bg-primary-blue/20',
    iconText: 'text-primary-blue',
    titleText: 'text-primary-blue',
  },
  neutral: {
    border: 'border-l-muted-foreground',
    bg: 'bg-gradient-to-r from-muted/50 to-muted/20',
    iconBg: 'bg-muted',
    iconText: 'text-muted-foreground',
    titleText: 'text-muted-foreground',
  },
};

export const Banner: React.FC<BannerProps> = ({
  variant = 'neutral',
  icon,
  title,
  description,
  className,
  children,
}) => {
  const styles = variantStyles[variant];

  return (
    <div className={cn('flex items-center gap-3 rounded-lg border-l-4 px-4 py-3', styles.border, styles.bg, className)}>
      {icon && (
        <div
          className={cn(
            'flex size-10 shrink-0 items-center justify-center rounded-full',
            styles.iconBg,
            styles.iconText
          )}
        >
          {icon}
        </div>
      )}
      <div className="flex-1">
        <p className={cn('text-title-default-bold', styles.titleText)}>{title}</p>
        {description && <span className="text-body-small text-muted-foreground">{description}</span>}
        {children}
      </div>
    </div>
  );
};

export type { BannerVariant, BannerProps };
