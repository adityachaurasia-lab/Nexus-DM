'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils/cn';

interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  className?: string;
}

export function Switch({ checked, onChange, label, disabled = false, className }: SwitchProps) {
  const toggle = () => {
    if (!disabled) onChange(!checked);
  };

  return (
    <label className={cn('inline-flex items-center gap-3 cursor-pointer select-none', disabled && 'opacity-50 cursor-not-allowed', className)}>
      <div
        role="switch"
        aria-checked={checked}
        onClick={toggle}
        className={cn(
          'w-11 h-6 rounded-full border-2 border-[var(--border-sharp)] p-0.5 transition-colors duration-normal flex items-center',
          checked ? 'bg-[var(--accent-primary)]' : 'bg-[var(--bg-inset)]'
        )}
      >
        <motion.div
          animate={{ x: checked ? 20 : 0 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          className="w-4 h-4 rounded-full bg-[var(--text-primary)] border border-[var(--border-sharp)] shadow-sm"
        />
      </div>
      {label && <span className="text-sm font-medium text-[var(--text-primary)]">{label}</span>}
    </label>
  );
}
