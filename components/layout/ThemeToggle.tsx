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
