'use client';

import type React from 'react';
import type { ReactNode } from 'react';

import { cn } from '@lotto/ui/utils';

import { Card, CardContent } from '../Card';

interface StatCardProps {
  icon: ReactNode;
  label: string;
  value: string | number;
  unit?: string;
  description?: string;
  className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({ icon, label, value, unit, description, className }) => {
  return (
    <Card className={cn('rounded bg-muted/50 transition-colors hover:bg-muted/70', className)}>
      <CardContent className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          {icon}
          <span className="text-body-small text-muted-foreground">{label}</span>
        </div>
        <p className="text-title-default-bold">
          {value}
          {unit && <span className="ml-1 font-normal text-body-small text-muted-foreground">{unit}</span>}
        </p>
        {description && <p className="text-body-small text-subtle-foreground">{description}</p>}
      </CardContent>
    </Card>
  );
};
