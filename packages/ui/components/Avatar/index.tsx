import type React from 'react';
import { Children, type ComponentProps, cloneElement } from 'react';
import * as AvatarPrimitive from '@radix-ui/react-avatar';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@lotto/ui/utils';

import { Tooltip, TooltipContent, TooltipTrigger } from '../Tooltip';
import { getInitials } from './getInitials';

const avatarVariants = cva('relative flex size-10 shrink-0 overflow-hidden rounded-full', {
  variants: {
    color: {
      gray: 'text-foreground *:data-[slot="avatar-fallback"]:bg-secondary',
      orange: 'text-primary-orange *:data-[slot="avatar-fallback"]:bg-base-orange',
      yellow: 'text-primary-yellow *:data-[slot="avatar-fallback"]:bg-base-yellow',
      blue: 'text-primary-blue *:data-[slot="avatar-fallback"]:bg-base-blue',
      green: 'text-primary-green *:data-[slot="avatar-fallback"]:bg-base-green',
      purple: 'text-primary-purple *:data-[slot="avatar-fallback"]:bg-base-purple',
      red: 'text-primary-red *:data-[slot="avatar-fallback"]:bg-base-red',
      gold: 'text-gold-dark *:data-[slot="avatar-fallback"]:bg-gold-light/30',
    },
  },
  defaultVariants: {
    color: 'gray',
  },
});

export interface AvatarProps
  extends Omit<ComponentProps<typeof AvatarPrimitive.Root>, 'color'>,
    VariantProps<typeof avatarVariants> {
  src?: string;
  displayName?: string;
  icon?: React.ReactNode;
  wrapWithTooltip?: boolean;
  /** Use 'contain' for logos to show full image without cropping */
  objectFit?: 'cover' | 'contain';
}

export const Avatar = ({
  src,
  displayName,
  icon,
  color,
  className,
  wrapWithTooltip = false,
  objectFit = 'cover',
  ...props
}: AvatarProps) => {
  const content = (
    <AvatarPrimitive.Root className={cn(avatarVariants({ color }), className)} data-slot="avatar" {...props}>
      {src && (
        <AvatarPrimitive.Image
          src={src}
          alt={displayName}
          className={cn('aspect-square size-full', objectFit === 'contain' ? 'object-contain' : 'object-cover')}
        />
      )}
      <AvatarPrimitive.Fallback
        data-slot="avatar-fallback"
        className="flex size-full items-center justify-center rounded-full"
      >
        {icon ? (
          <div className="flex size-3/5 items-center justify-center">{icon}</div>
        ) : (
          <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" className="size-full">
            <text
              x="16"
              y="16"
              fill="currentColor"
              dominantBaseline="central"
              textAnchor="middle"
              className="font-(family-name:--font-public-sans) text-body-default"
            >
              {getInitials(displayName ?? '')}
            </text>
          </svg>
        )}
      </AvatarPrimitive.Fallback>
    </AvatarPrimitive.Root>
  );

  return wrapWithTooltip ? (
    <Tooltip>
      <TooltipTrigger asChild>{content}</TooltipTrigger>
      <TooltipContent>{displayName}</TooltipContent>
    </Tooltip>
  ) : (
    content
  );
};

interface AvatarGroupProps extends ComponentProps<'div'> {
  children: React.ReactElement<AvatarProps> | React.ReactElement<AvatarProps>[];
}

export const AvatarGroup = ({ className, children, ...props }: AvatarGroupProps) => {
  return (
    <div className={cn('-space-x-2 flex', className)} {...props}>
      {Children.map(children, (child) =>
        cloneElement(child, {
          className: cn(
            child.props.className,
            'hover:-translate-y-1 ring-2 ring-background transition-all duration-300 ease-in-out hover:z-1 hover:shadow-md'
          ),
          wrapWithTooltip: true,
        })
      )}
    </div>
  );
};
