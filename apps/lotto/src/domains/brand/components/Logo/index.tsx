import { cn } from '@lotto/ui/utils';

const sizeClasses = {
  sm: 'size-10',
  md: 'size-12',
  lg: 'size-16',
  xl: 'size-24',
} as const;

interface LogoProps {
  size?: keyof typeof sizeClasses;
  className?: string;
}

export function Logo({ size = 'md', className }: LogoProps) {
  return <img src="/img/lotto_lens.png" alt="LottoLens" className={cn(sizeClasses[size], className)} />;
}
