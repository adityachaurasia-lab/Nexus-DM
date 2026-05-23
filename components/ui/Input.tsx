'use client';

import { forwardRef, type InputHTMLAttributes, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils/cn';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, leftIcon, className, id, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

    return (
      <div className="relative w-full">
        <div className="relative pt-4">
          {leftIcon && (
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]">
              {leftIcon}
            </span>
          )}
          <input
            ref={ref}
            id={inputId}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className={cn(
              'w-full px-4 py-3 bg-transparent',
              'border-b-2 border-[var(--border-soft)]',
              'text-[var(--text-primary)] placeholder:text-[var(--text-muted)]',
              'focus:border-[var(--accent-primary)] focus:outline-none',
              'transition-colors duration-fast',
              leftIcon && 'pl-10',
              error && 'border-red-500',
              className
            )}
            aria-invalid={error ? 'true' : undefined}
            aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
            {...props}
          />
          {label && (
            <motion.label
              htmlFor={inputId}
              className={cn(
                'absolute left-0 pointer-events-none',
                'text-[var(--text-muted)] transition-all duration-fast',
                leftIcon && 'left-10',
              )}
              animate={{
                top: isFocused || props.value ? '-8px' : '20px',
                fontSize: isFocused || props.value ? '0.75rem' : '0.875rem',
                color: isFocused ? 'var(--accent-primary)' : 'var(--text-muted)',
              }}
              transition={{ duration: 0.15, ease: [0.34, 1.56, 0.64, 1] }}
            >
              {label}
            </motion.label>
          )}
        </div>
        <AnimatePresence>
          {error && (
            <motion.p
              id={`${inputId}-error`}
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="mt-1 text-xs text-red-500"
              role="alert"
            >
              {error}
            </motion.p>
          )}
        </AnimatePresence>
        {helperText && !error && (
          <p id={`${inputId}-helper`} className="mt-1 text-xs text-[var(--text-muted)]">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
