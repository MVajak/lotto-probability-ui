import { ComponentProps, ReactNode } from 'react';

import { cn } from '@obsidian/ui';

interface TileProps extends ComponentProps<'div'> {
  title: string;
  actions?: React.ReactNode;
}

export const Tile = ({ title, actions, className, children, ...props }: TileProps) => {
  return (
    <div
      data-slot="tile"
      className={cn('flex w-90 shrink-0 flex-col gap-4 rounded-2xl bg-accent p-4 px-2 pt-5 pb-2', className)}
      {...props}
    >
      <div className="flex items-center justify-between gap-2 px-4">
        <h3 className="grow text-title-small">{title}</h3>
        {actions && <div className="shrink-0">{actions}</div>}
      </div>
      <div className="scrollbar-none mask-y-from-[calc(100%-12px)] mask-y-to-100% -my-2 flex grow flex-col gap-2 overflow-y-auto rounded-lg py-2">
        {children}
      </div>
    </div>
  );
};

interface EmptyProps extends ComponentProps<'div'> {
  title: string;
  avatar: ReactNode;
}

export const TileEmpty = ({ title, avatar, className, children, ...props }: EmptyProps) => {
  return (
    <div className="h-full w-full grow rounded-lg border border-border border-dashed">
      <div
        className={cn(
          'flex min-h-full flex-col items-center justify-center gap-2 p-4 text-center *:data-[slot="avatar"]:size-10',
          className
        )}
        {...props}
      >
        {avatar}
        <h3 className="not-first:mt-2 text-body-default-bold">{title}</h3>
        <p className="text-body-default text-muted-foreground">{children}</p>
      </div>
    </div>
  );
};

export const TileWrapper = ({ children, className, ...props }: ComponentProps<'div'>) => {
  return (
    <div className={cn('flex h-full gap-4', className)} {...props}>
      {children}
    </div>
  );
};
