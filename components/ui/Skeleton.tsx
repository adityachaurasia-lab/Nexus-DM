import { cn } from '@/lib/utils/cn';

type SkeletonVariant = 'text' | 'circle' | 'rect' | 'card';

interface SkeletonProps {
  variant?: SkeletonVariant;
  className?: string;
}

const variantClasses: Record<SkeletonVariant, string> = {
  text: 'h-4 w-full rounded',
  circle: 'h-12 w-12 rounded-full',
  rect: 'h-24 w-full rounded-md',
  card: 'h-40 w-full rounded-lg border border-[var(--border-soft)] p-5 flex flex-col gap-3',
};

export function Skeleton({ variant = 'text', className }: SkeletonProps) {
  if (variant === 'card') {
    return (
      <div className={cn('bg-[var(--bg-surface)] animate-pulse', variantClasses.card, className)}>
        <div className="h-6 w-1/3 rounded bg-[var(--bg-inset)]" />
        <div className="h-4 w-full rounded bg-[var(--bg-inset)]" />
        <div className="h-4 w-2/3 rounded bg-[var(--bg-inset)]" />
        <div className="flex gap-2 mt-auto">
          <div className="h-8 w-20 rounded bg-[var(--bg-inset)]" />
          <div className="h-8 w-20 rounded bg-[var(--bg-inset)]" />
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'bg-[var(--bg-inset)] animate-pulse relative overflow-hidden',
        'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/10 dark:before:via-black/10 before:to-transparent',
        variantClasses[variant],
        className
      )}
    />
  );
}
