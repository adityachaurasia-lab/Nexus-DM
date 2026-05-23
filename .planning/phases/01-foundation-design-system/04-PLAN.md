# Plan 04: UI Primitive Components

---
wave: 3
depends_on: [01, 02]
files_modified:
  - components/ui/Button.tsx
  - components/ui/Card.tsx
  - components/ui/Input.tsx
  - components/ui/Modal.tsx
  - components/ui/Toast.tsx
  - components/ui/Badge.tsx
  - components/ui/Avatar.tsx
  - components/ui/Tooltip.tsx
  - components/ui/Dropdown.tsx
  - components/ui/Switch.tsx
  - components/ui/Progress.tsx
  - components/ui/Skeleton.tsx
  - components/ui/index.ts
autonomous: true
requirements: [FOUND-02, FOUND-10]
---

## Objective

Build all 12 UI primitive components following the Liquid Brutalism design language: brutal borders, magnetic hover effects, spring animations, and correct theming in both Solar Paper and Void Matter modes.

## Tasks

<task id="04.1">
<title>Create Button component with 3 variants (Ghost, Solid, Magnetic)</title>
<read_first>
- app/globals.css (verify CSS variable names and utility classes)
</read_first>
<action>
Create `components/ui/Button.tsx`:

```tsx
'use client';

import { forwardRef, type ButtonHTMLAttributes, type ReactNode, useRef } from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils/cn';

type ButtonVariant = 'ghost' | 'solid' | 'magnetic';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-sm gap-1.5',
  md: 'px-5 py-2.5 text-sm gap-2',
  lg: 'px-7 py-3.5 text-base gap-2.5',
};

const variantClasses: Record<ButtonVariant, string> = {
  ghost: `border-2 border-[var(--border-sharp)] bg-transparent text-[var(--text-primary)]
          hover:bg-[var(--accent-primary)] hover:text-[var(--text-inverse)] hover:border-[var(--accent-primary)]`,
  solid: `bg-[var(--accent-primary)] text-white border-2 border-[var(--accent-primary)]
          hover:shadow-[var(--shadow-brutal)]`,
  magnetic: `bg-[var(--accent-primary)] text-white border-2 border-[var(--accent-primary)]`,
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'solid', size = 'md', children, isLoading, leftIcon, rightIcon, className, ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: variant === 'magnetic' ? 1.02 : 1 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        className={cn(
          'inline-flex items-center justify-center font-medium rounded-md',
          'transition-all duration-fast ease-spring cursor-pointer',
          'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-primary)]',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          sizeClasses[size],
          variantClasses[variant],
          className
        )}
        disabled={isLoading}
        {...props}
      >
        {isLoading ? (
          <motion.span
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
            className="w-4 h-4 border-2 border-current border-t-transparent rounded-full"
          />
        ) : (
          <>
            {leftIcon}
            {children}
            {rightIcon}
          </>
        )}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';
```

Also create `lib/utils/cn.ts`:
```typescript
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

Install missing utility deps: `npm install clsx tailwind-merge`
</action>
<acceptance_criteria>
- `components/ui/Button.tsx` contains `export const Button`
- `components/ui/Button.tsx` contains `variant = 'solid'`
- `components/ui/Button.tsx` contains `'ghost' | 'solid' | 'magnetic'`
- `components/ui/Button.tsx` contains `whileHover`
- `components/ui/Button.tsx` contains `aria` or `focus-visible`
- `lib/utils/cn.ts` contains `export function cn`
</acceptance_criteria>
</task>

<task id="04.2">
<title>Create Card component with brutal border hover</title>
<read_first>
- app/globals.css
- components/ui/Button.tsx (for pattern reference)
</read_first>
<action>
Create `components/ui/Card.tsx`:

```tsx
'use client';

import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils/cn';

interface CardProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  children: ReactNode;
  variant?: 'default' | 'elevated' | 'inset';
  hoverable?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

const variantClasses = {
  default: 'bg-[var(--bg-surface)] border border-[var(--border-soft)]',
  elevated: 'bg-[var(--bg-elevated)] border-2 border-[var(--border-sharp)]',
  inset: 'bg-[var(--bg-inset)] border border-[var(--border-soft)]',
};

const paddingClasses = {
  none: '',
  sm: 'p-3',
  md: 'p-5',
  lg: 'p-7',
};

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ children, variant = 'default', hoverable = false, padding = 'md', className, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        whileHover={hoverable ? {
          y: -2,
          boxShadow: 'var(--shadow-brutal)',
          transition: { type: 'spring', stiffness: 300, damping: 20 },
        } : undefined}
        className={cn(
          'rounded-lg overflow-hidden',
          'transition-all duration-normal',
          hoverable && 'cursor-pointer',
          variantClasses[variant],
          paddingClasses[padding],
          className
        )}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

Card.displayName = 'Card';
```
</action>
<acceptance_criteria>
- `components/ui/Card.tsx` contains `export const Card`
- `components/ui/Card.tsx` contains `'default' | 'elevated' | 'inset'`
- `components/ui/Card.tsx` contains `shadow-brutal`
</acceptance_criteria>
</task>

<task id="04.3">
<title>Create Input component with floating label animation</title>
<read_first>
- app/globals.css
</read_first>
<action>
Create `components/ui/Input.tsx`:

```tsx
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
        <div className="relative">
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
                top: isFocused || props.value ? '-8px' : '12px',
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
```
</action>
<acceptance_criteria>
- `components/ui/Input.tsx` contains `export const Input`
- `components/ui/Input.tsx` contains `aria-invalid`
- `components/ui/Input.tsx` contains floating label `motion.label`
- `components/ui/Input.tsx` contains `focus:border-[var(--accent-primary)]`
</acceptance_criteria>
</task>

<task id="04.4">
<title>Create Modal, Toast, Badge, Avatar, Tooltip, Dropdown, Switch, Progress, Skeleton components</title>
<read_first>
- components/ui/Button.tsx (for pattern reference)
- components/ui/Card.tsx (for pattern reference)
- app/globals.css
</read_first>
<action>
Create the remaining 9 UI primitives. Each file should follow the same patterns as Button/Card/Input: forwardRef, cn() utility, CSS variables, motion animations, ARIA attributes.

**`components/ui/Modal.tsx`** — Backdrop blur 20px + slide-up spring animation. Uses `AnimatePresence` for enter/exit. Portal rendered via React's `createPortal`. Props: `isOpen`, `onClose`, `title`, `children`, `size`. Close on Escape key and backdrop click. `role="dialog"`, `aria-modal="true"`.

**`components/ui/Toast.tsx`** — Stack top-right, swipe-to-dismiss via `drag="x"` with `dragConstraints`. Duration indicator bar that depletes. Variants: `success`, `error`, `warning`, `info`. Auto-dismiss with configurable `duration` (default 5000ms). Context + hook pattern (`useToast()`).

**`components/ui/Badge.tsx`** — Small label chip. Variants: `default`, `success`, `warning`, `error`, `info`. Sizes: `sm`, `md`. Optional `dot` indicator (pulsing circle).

**`components/ui/Avatar.tsx`** — Circular image with fallback initials. Sizes: `xs` (24px), `sm` (32px), `md` (40px), `lg` (48px), `xl` (64px). Status indicator dot (online/offline/away). Uses Next.js `Image` component.

**`components/ui/Tooltip.tsx`** — Hover tooltip with `AnimatePresence` fade+scale. Positions: `top`, `bottom`, `left`, `right`. Delay of 200ms before show. `role="tooltip"`, linked via `aria-describedby`.

**`components/ui/Dropdown.tsx`** — Click-triggered dropdown menu. Uses `AnimatePresence` for slide-down animation. Items with optional icons. Keyboard navigation (arrow keys, Enter, Escape). `role="menu"` + `role="menuitem"`.

**`components/ui/Switch.tsx`** — Toggle switch with spring-animated thumb. Props: `checked`, `onChange`, `label`, `disabled`. `role="switch"`, `aria-checked`.

**`components/ui/Progress.tsx`** — Animated progress bar. Props: `value` (0-100), `variant` (default/gradient), `size` (sm/md/lg), `showLabel`. Uses `motion.div` for width animation with spring easing.

**`components/ui/Skeleton.tsx`** — Loading placeholder with shimmer animation. Variants: `text`, `circle`, `rect`, `card`. Uses CSS animation with gradient background sweep.
</action>
<acceptance_criteria>
- `components/ui/Modal.tsx` contains `role="dialog"` and `aria-modal`
- `components/ui/Toast.tsx` contains `useToast` or toast context
- `components/ui/Badge.tsx` contains variant types
- `components/ui/Avatar.tsx` contains fallback initials logic
- `components/ui/Tooltip.tsx` contains `role="tooltip"`
- `components/ui/Dropdown.tsx` contains `role="menu"`
- `components/ui/Switch.tsx` contains `role="switch"` and `aria-checked`
- `components/ui/Progress.tsx` contains `motion.div`
- `components/ui/Skeleton.tsx` contains shimmer animation class
</acceptance_criteria>
</task>

<task id="04.5">
<title>Create barrel export file for all UI components</title>
<read_first>
- components/ui/ (all files)
</read_first>
<action>
Create `components/ui/index.ts`:

```typescript
export { Button } from './Button';
export { Card } from './Card';
export { Input } from './Input';
export { Modal } from './Modal';
export { Toast, useToast, ToastProvider } from './Toast';
export { Badge } from './Badge';
export { Avatar } from './Avatar';
export { Tooltip } from './Tooltip';
export { Dropdown } from './Dropdown';
export { Switch } from './Switch';
export { Progress } from './Progress';
export { Skeleton } from './Skeleton';
```
</action>
<acceptance_criteria>
- `components/ui/index.ts` contains exports for all 12 components
- `components/ui/index.ts` contains `Button`, `Card`, `Input`, `Modal`, `Toast`, `Badge`, `Avatar`, `Tooltip`, `Dropdown`, `Switch`, `Progress`, `Skeleton`
</acceptance_criteria>
</task>

## Verification

- [ ] All 12 components can be imported from `@/components/ui`
- [ ] Components render correctly in both themes
- [ ] Components have proper ARIA attributes
- [ ] Hover/focus states work with spring animations
- [ ] Reduced motion preference is respected

## must_haves

1. All 12 UI primitive components created and exported
2. Button has 3 variants (ghost/solid/magnetic) with motion
3. Card has brutal border hover effect
4. Input has floating label animation
5. Modal has backdrop blur + spring animation
6. All components have proper ARIA labels and keyboard support
7. All components use CSS variables for theming
