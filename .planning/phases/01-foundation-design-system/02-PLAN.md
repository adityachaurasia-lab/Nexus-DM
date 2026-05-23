# Plan 02: Theme Provider & Font System

---
wave: 2
depends_on: [01]
files_modified:
  - hooks/useTheme.ts
  - components/layout/ThemeToggle.tsx
  - components/providers/ThemeProvider.tsx
  - app/layout.tsx
autonomous: true
requirements: [FOUND-03, FOUND-04, FOUND-05]
---

## Objective

Implement the theme provider with persistent theme state (localStorage + system preference detection), the theme toggle component, and ensure all 5 font families load correctly with font-display: swap.

## Tasks

<task id="02.1">
<title>Create useTheme hook with localStorage persistence</title>
<read_first>
- app/globals.css (to verify CSS variable names)
</read_first>
<action>
Create `hooks/useTheme.ts`:

```typescript
'use client';

import { useCallback, useEffect, useState } from 'react';

type Theme = 'light' | 'dark' | 'system';
type ResolvedTheme = 'light' | 'dark';

const STORAGE_KEY = 'nexus-theme';

function getSystemTheme(): ResolvedTheme {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function getStoredTheme(): Theme {
  if (typeof window === 'undefined') return 'system';
  return (localStorage.getItem(STORAGE_KEY) as Theme) || 'system';
}

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>('system');
  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>('light');
  const [mounted, setMounted] = useState(false);

  const applyTheme = useCallback((resolved: ResolvedTheme) => {
    document.documentElement.setAttribute('data-theme', resolved);
    setResolvedTheme(resolved);
  }, []);

  const setTheme = useCallback((newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem(STORAGE_KEY, newTheme);
    const resolved = newTheme === 'system' ? getSystemTheme() : newTheme;
    applyTheme(resolved);
  }, [applyTheme]);

  useEffect(() => {
    const stored = getStoredTheme();
    setThemeState(stored);
    const resolved = stored === 'system' ? getSystemTheme() : stored;
    applyTheme(resolved);
    setMounted(true);

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      if (getStoredTheme() === 'system') {
        applyTheme(getSystemTheme());
      }
    };
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [applyTheme]);

  return { theme, resolvedTheme, setTheme, mounted };
}
```
</action>
<acceptance_criteria>
- `hooks/useTheme.ts` contains `export function useTheme()`
- `hooks/useTheme.ts` contains `data-theme`
- `hooks/useTheme.ts` contains `localStorage`
- `hooks/useTheme.ts` contains `prefers-color-scheme`
</acceptance_criteria>
</task>

<task id="02.2">
<title>Create ThemeProvider component</title>
<read_first>
- hooks/useTheme.ts
</read_first>
<action>
Create `components/providers/ThemeProvider.tsx`:

```tsx
'use client';

import { createContext, useContext, type ReactNode } from 'react';
import { useTheme } from '@/hooks/useTheme';

type Theme = 'light' | 'dark' | 'system';
type ResolvedTheme = 'light' | 'dark';

interface ThemeContextValue {
  theme: Theme;
  resolvedTheme: ResolvedTheme;
  setTheme: (theme: Theme) => void;
  mounted: boolean;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const themeState = useTheme();

  return (
    <ThemeContext.Provider value={themeState}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useThemeContext() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeContext must be used within a ThemeProvider');
  }
  return context;
}
```
</action>
<acceptance_criteria>
- `components/providers/ThemeProvider.tsx` contains `export function ThemeProvider`
- `components/providers/ThemeProvider.tsx` contains `export function useThemeContext`
- `components/providers/ThemeProvider.tsx` contains `ThemeContext`
</acceptance_criteria>
</task>

<task id="02.3">
<title>Create ThemeToggle component with animation</title>
<read_first>
- components/providers/ThemeProvider.tsx
</read_first>
<action>
Create `components/layout/ThemeToggle.tsx`:

```tsx
'use client';

import { Sun, Moon, Monitor } from 'lucide-react';
import { useThemeContext } from '@/components/providers/ThemeProvider';
import { motion, AnimatePresence } from 'framer-motion';

const themes = [
  { value: 'light' as const, icon: Sun, label: 'Light mode' },
  { value: 'dark' as const, icon: Moon, label: 'Dark mode' },
  { value: 'system' as const, icon: Monitor, label: 'System theme' },
];

export function ThemeToggle() {
  const { theme, setTheme, mounted } = useThemeContext();

  if (!mounted) {
    return (
      <div
        className="w-10 h-10 rounded-lg border border-soft"
        aria-hidden="true"
      />
    );
  }

  const currentIndex = themes.findIndex((t) => t.value === theme);
  const nextTheme = themes[(currentIndex + 1) % themes.length];
  const CurrentIcon = themes[currentIndex]?.icon ?? Sun;

  return (
    <button
      onClick={() => setTheme(nextTheme.value)}
      className="relative w-10 h-10 flex items-center justify-center rounded-lg
                 border border-soft hover:border-sharp
                 transition-all duration-fast ease-spring
                 cursor-pointer"
      aria-label={`Switch to ${nextTheme.label}`}
      title={`Current: ${themes[currentIndex]?.label}. Click for ${nextTheme.label}`}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={theme}
          initial={{ y: -10, opacity: 0, rotate: -90 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ y: 10, opacity: 0, rotate: 90 }}
          transition={{ duration: 0.2, ease: [0.34, 1.56, 0.64, 1] }}
        >
          <CurrentIcon className="w-5 h-5 text-text-primary" />
        </motion.div>
      </AnimatePresence>
    </button>
  );
}
```
</action>
<acceptance_criteria>
- `components/layout/ThemeToggle.tsx` contains `export function ThemeToggle`
- `components/layout/ThemeToggle.tsx` contains `aria-label`
- `components/layout/ThemeToggle.tsx` contains `AnimatePresence`
- `components/layout/ThemeToggle.tsx` contains `lucide-react`
</acceptance_criteria>
</task>

<task id="02.4">
<title>Integrate ThemeProvider into root layout</title>
<read_first>
- app/layout.tsx
- components/providers/ThemeProvider.tsx
</read_first>
<action>
Update `app/layout.tsx` to wrap children with ThemeProvider.

Add a theme initialization script in `<head>` to prevent flash of wrong theme:

```tsx
<script
  dangerouslySetInnerHTML={{
    __html: `
      (function() {
        try {
          var theme = localStorage.getItem('nexus-theme') || 'system';
          var resolved = theme;
          if (theme === 'system') {
            resolved = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
          }
          document.documentElement.setAttribute('data-theme', resolved);
        } catch (e) {}
      })();
    `,
  }}
/>
```

Wrap body children with `<ThemeProvider>`:
```tsx
import { ThemeProvider } from '@/components/providers/ThemeProvider';

<body className="font-body antialiased">
  <ThemeProvider>
    {children}
  </ThemeProvider>
</body>
```
</action>
<acceptance_criteria>
- `app/layout.tsx` contains `ThemeProvider`
- `app/layout.tsx` contains `nexus-theme`
- `app/layout.tsx` contains `dangerouslySetInnerHTML`
</acceptance_criteria>
</task>

## Verification

- [ ] Theme toggle cycles through light → dark → system
- [ ] Theme persists across page refresh
- [ ] No flash of wrong theme on page load
- [ ] System preference changes auto-update when theme = system
- [ ] All fonts render (check in browser DevTools → Network → Font)

## must_haves

1. Theme toggle works between light/dark/system
2. Theme persists in localStorage across sessions
3. No flash of unstyled theme on initial load
4. All 5 font families load correctly
