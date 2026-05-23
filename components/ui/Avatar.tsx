'use client';

import Image from 'next/image';
import { useState } from 'react';
import { cn } from '@/lib/utils/cn';

type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type AvatarStatus = 'online' | 'offline' | 'away';

interface AvatarProps {
  src?: string;
  name: string;
  size?: AvatarSize;
  status?: AvatarStatus;
  className?: string;
}

const sizeClasses: Record<AvatarSize, string> = {
  xs: 'w-6 h-6 text-xs',
  sm: 'w-8 h-8 text-sm',
  md: 'w-10 h-10 text-base',
  lg: 'w-12 h-12 text-lg',
  xl: 'w-16 h-16 text-2xl',
};

const statusColors: Record<AvatarStatus, string> = {
  online: 'bg-green-500',
  offline: 'bg-gray-400',
  away: 'bg-yellow-500',
};

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 0) return '';
  if (parts.length === 1) return parts[0]?.substring(0, 2).toUpperCase() || '';
  return `${parts[0]?.charAt(0)}${parts[parts.length - 1]?.charAt(0)}`.toUpperCase();
}

export function Avatar({ src, name, size = 'md', status, className }: AvatarProps) {
  const [imageError, setImageError] = useState(false);
  const initials = getInitials(name);

  return (
    <div className={cn('relative inline-flex items-center justify-center flex-shrink-0', className)}>
      <div
        className={cn(
          'relative w-full h-full rounded-full overflow-hidden border border-[var(--border-soft)] bg-[var(--bg-inset)] text-[var(--text-secondary)] font-bold flex items-center justify-center',
          sizeClasses[size]
        )}
      >
        {src && !imageError ? (
          <Image
            src={src}
            alt={name}
            fill
            sizes="100vw"
            referrerPolicy="no-referrer"
            onError={() => setImageError(true)}
            className="object-cover"
          />
        ) : (
          <span>{initials}</span>
        )}
      </div>

      {status && (
        <span
          className={cn(
            'absolute bottom-0 right-0 block w-2.5 h-2.5 rounded-full border-2 border-[var(--bg-canvas)]',
            statusColors[status]
          )}
        />
      )}
    </div>
  );
}
