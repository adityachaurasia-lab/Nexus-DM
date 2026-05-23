'use client';

import { createContext, useContext, useState, type ReactNode, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, AlertTriangle, Info, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

type ToastType = 'success' | 'error' | 'warning' | 'info';

interface ToastItem {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
}

interface ToastContextValue {
  toast: (message: string, type?: ToastType, duration?: number) => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const toast = useCallback((message: string, type: ToastType = 'info', duration = 5000) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type, duration }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, duration);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      {/* Toast Portal Container */}
      <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 w-full max-w-sm pointer-events-none">
        <AnimatePresence>
          {toasts.map((t) => (
            <Toast key={t.id} item={t} onClose={() => removeToast(t.id)} />
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}

const icons: Record<ToastType, typeof CheckCircle> = {
  success: CheckCircle,
  error: AlertCircle,
  warning: AlertTriangle,
  info: Info,
};

const toastColors: Record<ToastType, string> = {
  success: 'bg-[var(--bg-elevated)] border-green-500 text-green-600 dark:text-green-400',
  error: 'bg-[var(--bg-elevated)] border-red-500 text-red-600 dark:text-red-400',
  warning: 'bg-[var(--bg-elevated)] border-yellow-500 text-yellow-600 dark:text-yellow-400',
  info: 'bg-[var(--bg-elevated)] border-[var(--accent-secondary)] text-[var(--accent-secondary)]',
};

function Toast({ item, onClose }: { item: ToastItem; onClose: () => void }) {
  const Icon = icons[item.type];

  return (
    <motion.div
      layout
      drag="x"
      dragConstraints={{ left: 0, right: 300 }}
      onDragEnd={(_, info) => {
        if (info.offset.x > 150) {
          onClose();
        }
      }}
      initial={{ opacity: 0, y: -20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, x: 200, scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 400, damping: 28 }}
      className={cn(
        'flex items-center gap-3 p-4 rounded-md border-l-4 border-2 border-y-[var(--border-soft)] border-r-[var(--border-soft)] shadow-md pointer-events-auto cursor-grab active:cursor-grabbing',
        toastColors[item.type]
      )}
    >
      <Icon className="w-5 h-5 flex-shrink-0" />
      <span className="text-sm font-medium text-[var(--text-primary)] flex-grow">{item.message}</span>
      <button
        onClick={onClose}
        className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
        aria-label="Dismiss toast"
      >
        <X className="w-4 h-4" />
      </button>
    </motion.div>
  );
}
