'use client';

import { useState } from 'react';
import { ThemeToggle } from '@/components/layout/ThemeToggle';
import {
  Button,
  Card,
  Input,
  Modal,
  ToastProvider,
  useToast,
  Badge,
  Avatar,
  Tooltip,
  Dropdown,
  Switch,
  Progress,
  Skeleton,
} from '@/components/ui';
import { Mail, ArrowRight, UserPlus, Trash, Sparkles } from 'lucide-react';

function DesignSystemContent() {
  const { toast } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [switchChecked, setSwitchChecked] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [inputValueErr, setInputValueErr] = useState('');

  const dropdownItems = [
    { label: 'Edit profile', onClick: () => toast('Clicked Edit Profile', 'info'), icon: <UserPlus className="w-4 h-4" /> },
    { label: 'Settings', onClick: () => toast('Clicked Settings', 'info') },
    { label: 'Delete account', onClick: () => toast('Cannot delete in demo', 'error'), icon: <Trash className="w-4 h-4" />, disabled: true },
  ];

  return (
    <main className="min-h-screen px-6 py-12 max-w-6xl mx-auto flex flex-col gap-16 noise-overlay">
      {/* 1. Header Section */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pb-8 border-b-4 border-[var(--border-sharp)]">
        <div>
          <span className="text-stat-label">System Specification</span>
          <h1 className="text-hero gradient-text uppercase tracking-tighter">NEXUS DM</h1>
          <p className="text-lg font-medium text-[var(--text-secondary)] mt-2 max-w-xl">
            Design showcase and interactive testbed for our <strong className="text-[var(--accent-primary)] font-bold">Liquid Brutalism meets Kinetic Editorial</strong> design system.
          </p>
        </div>
        <div className="flex items-center gap-4 bg-[var(--bg-surface)] p-3 rounded-lg border-2 border-[var(--border-sharp)] brutal-shadow">
          <span className="text-xs font-mono font-bold text-[var(--text-secondary)]">ACTIVE THEME:</span>
          <ThemeToggle />
        </div>
      </header>

      {/* 2. Colors Section */}
      <section className="flex flex-col gap-6">
        <h2 className="text-display border-b border-[var(--border-soft)] pb-2">01 / Palette Tokens</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          <div className="flex flex-col gap-2 p-4 rounded-lg bg-[var(--bg-canvas)] border border-[var(--border-sharp)] brutal-shadow">
            <div className="h-12 w-full rounded bg-[var(--bg-canvas)] border border-[var(--border-soft)]" />
            <span className="text-xs font-mono font-bold text-[var(--text-primary)]">--bg-canvas</span>
            <span className="text-xs font-mono text-[var(--text-muted)]">Main Background</span>
          </div>
          <div className="flex flex-col gap-2 p-4 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-sharp)] brutal-shadow">
            <div className="h-12 w-full rounded bg-[var(--bg-surface)] border border-[var(--border-soft)]" />
            <span className="text-xs font-mono font-bold text-[var(--text-primary)]">--bg-surface</span>
            <span className="text-xs font-mono text-[var(--text-muted)]">Surface Block</span>
          </div>
          <div className="flex flex-col gap-2 p-4 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-sharp)] brutal-shadow">
            <div className="h-12 w-full rounded bg-[var(--bg-elevated)] border border-[var(--border-soft)]" />
            <span className="text-xs font-mono font-bold text-[var(--text-primary)]">--bg-elevated</span>
            <span className="text-xs font-mono text-[var(--text-muted)]">Elevated Modal</span>
          </div>
          <div className="flex flex-col gap-2 p-4 rounded-lg bg-[var(--bg-inset)] border border-[var(--border-sharp)] brutal-shadow">
            <div className="h-12 w-full rounded bg-[var(--bg-inset)] border border-[var(--border-soft)]" />
            <span className="text-xs font-mono font-bold text-[var(--text-primary)]">--bg-inset</span>
            <span className="text-xs font-mono text-[var(--text-muted)]">Inset / Input</span>
          </div>
          <div className="flex flex-col gap-2 p-4 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-sharp)] brutal-shadow">
            <div className="h-12 w-full rounded bg-[var(--accent-primary)]" />
            <span className="text-xs font-mono font-bold text-[var(--text-primary)]">--accent-primary</span>
            <span className="text-xs font-mono text-[var(--text-muted)]">Electric Orange</span>
          </div>
          <div className="flex flex-col gap-2 p-4 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-sharp)] brutal-shadow">
            <div className="h-12 w-full rounded bg-[var(--accent-secondary)]" />
            <span className="text-xs font-mono font-bold text-[var(--text-primary)]">--accent-secondary</span>
            <span className="text-xs font-mono text-[var(--text-muted)]">Deep Indigo</span>
          </div>
          <div className="flex flex-col gap-2 p-4 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-sharp)] brutal-shadow">
            <div className="h-12 w-full rounded bg-[var(--accent-tertiary)]" />
            <span className="text-xs font-mono font-bold text-[var(--text-primary)]">--accent-tertiary</span>
            <span className="text-xs font-mono text-[var(--text-muted)]">Cyber Mint</span>
          </div>
          <div className="flex flex-col gap-2 p-4 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-sharp)] brutal-shadow">
            <div className="h-12 w-full rounded bg-[var(--accent-warning)]" />
            <span className="text-xs font-mono font-bold text-[var(--text-primary)]">--accent-warning</span>
            <span className="text-xs font-mono text-[var(--text-muted)]">Solar Amber</span>
          </div>
        </div>
      </section>

      {/* 3. Typography Section */}
      <section className="flex flex-col gap-6">
        <h2 className="text-display border-b border-[var(--border-soft)] pb-2">02 / Typography Hierarchy</h2>
        <div className="flex flex-col gap-6 bg-[var(--bg-surface)] p-6 rounded-lg border border-[var(--border-soft)]">
          <div className="flex flex-col gap-1">
            <span className="text-stat-label">Display font (Cabinet Grotesk / Fallback)</span>
            <span className="text-hero leading-tight uppercase font-black">THE VISUAL BUILDER</span>
          </div>
          <div className="flex flex-col gap-1 border-t border-[var(--border-soft)] pt-4">
            <span className="text-stat-label">Heading font (Fraunces Serif)</span>
            <span className="text-heading font-bold italic">"Automate direct message workflows at scale."</span>
          </div>
          <div className="flex flex-col gap-1 border-t border-[var(--border-soft)] pt-4">
            <span className="text-stat-label">Body font (Sora Sans)</span>
            <p className="text-base text-[var(--text-secondary)]">
              Sora is optimized for interfaces and legibility. It handles user settings, list entries, and metrics configuration screens with supreme balance.
            </p>
          </div>
          <div className="flex flex-col gap-1 border-t border-[var(--border-soft)] pt-4">
            <span className="text-stat-label">Mono font (JetBrains Mono)</span>
            <code className="text-sm bg-[var(--bg-inset)] p-2 rounded block">
              const rateLimit = (userId: string) =&gt; `rate:${"{userId}"}:inbox`;
            </code>
          </div>
          <div className="flex flex-col gap-1 border-t border(--border-soft) pt-4">
            <span className="text-stat-label">Accent font (Bebas Neue)</span>
            <span className="font-accent text-3xl tracking-widest text-[var(--accent-primary)]">ANALYTICS: 94.2% COMPLETION RATE</span>
          </div>
        </div>
      </section>

      {/* 4. Buttons Section */}
      <section className="flex flex-col gap-6">
        <h2 className="text-display border-b border-[var(--border-soft)] pb-2">03 / Actions & Buttons</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-[var(--bg-surface)] p-6 rounded-lg border border-[var(--border-soft)]">
          <div className="flex flex-col gap-3">
            <span className="text-stat-label">Solid Variants</span>
            <Button variant="solid" size="sm">Small Action</Button>
            <Button variant="solid" size="md" rightIcon={<ArrowRight className="w-4 h-4" />}>
              Standard Action
            </Button>
            <Button variant="solid" size="lg">Large Execution</Button>
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-stat-label">Ghost Variants</span>
            <Button variant="ghost" size="sm">Small Ghost</Button>
            <Button variant="ghost" size="md">Standard Ghost</Button>
            <Button variant="ghost" size="lg">Large Ghost</Button>
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-stat-label">States & Magnetic</span>
            <Button variant="magnetic" size="md" leftIcon={<Sparkles className="w-4 h-4" />}>
              Magnetic Spring
            </Button>
            <Button variant="solid" size="md" isLoading>
              Loading
            </Button>
            <Button variant="solid" size="md" disabled>
              Disabled State
            </Button>
          </div>
        </div>
      </section>

      {/* 5. Cards Section */}
      <section className="flex flex-col gap-6">
        <h2 className="text-display border-b border-[var(--border-soft)] pb-2">04 / Layout Cards</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card variant="default" padding="lg">
            <h3 className="font-bold text-lg mb-2">Default Card</h3>
            <p className="text-sm text-[var(--text-secondary)]">Standard card layout with border-soft bounds and static placement.</p>
          </Card>
          <Card variant="elevated" padding="lg" hoverable>
            <h3 className="font-bold text-lg mb-2">Elevated Hoverable</h3>
            <p className="text-sm text-[var(--text-secondary)]">Hover this block to witness spring y-translation and heavy brutalist shadows activation.</p>
          </Card>
          <Card variant="inset" padding="lg">
            <h3 className="font-bold text-lg mb-2">Inset Container</h3>
            <p className="text-sm text-[var(--text-secondary)]">Card utilizing dark inset backgrounds. Ideal for statistics listing or secondary metrics.</p>
          </Card>
        </div>
      </section>

      {/* 6. Inputs Section */}
      <section className="flex flex-col gap-6">
        <h2 className="text-display border-b border-[var(--border-soft)] pb-2">05 / Form Inputs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-[var(--bg-surface)] p-6 rounded-lg border border-[var(--border-soft)]">
          <div className="flex flex-col gap-4">
            <span className="text-stat-label">Floating Label</span>
            <Input
              label="Creator Email Address"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              leftIcon={<Mail className="w-4 h-4" />}
            />
          </div>
          <div className="flex flex-col gap-4">
            <span className="text-stat-label">Validation Alert</span>
            <Input
              label="Username"
              value={inputValueErr}
              onChange={(e) => {
                setInputValueErr(e.target.value);
                if (e.target.value.length < 3) {
                  setInputValueErr(e.target.value);
                }
              }}
              error="Username must be at least 3 characters"
            />
          </div>
        </div>
      </section>

      {/* 7. Badges Section */}
      <section className="flex flex-col gap-6">
        <h2 className="text-display border-b border-[var(--border-soft)] pb-2">06 / Status Chips</h2>
        <div className="flex flex-wrap gap-3 bg-[var(--bg-surface)] p-6 rounded-lg border border-[var(--border-soft)]">
          <Badge variant="default">Idle Mode</Badge>
          <Badge variant="success" dot>Active Automations</Badge>
          <Badge variant="warning">Rate Limiting</Badge>
          <Badge variant="error" dot>Webhook Outage</Badge>
          <Badge variant="info">WhatsApp Syncing</Badge>
        </div>
      </section>

      {/* 8. Extra Components Section */}
      <section className="flex flex-col gap-6">
        <h2 className="text-display border-b border-[var(--border-soft)] pb-2">07 / Interactive Widgets</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-[var(--bg-surface)] p-6 rounded-lg border border-[var(--border-soft)]">
          {/* Avatar and Switch */}
          <div className="flex flex-col gap-6">
            <div>
              <span className="text-stat-label block mb-3">Avatars & Sync Status</span>
              <div className="flex items-center gap-3">
                <Avatar name="Aditya Chaurasia" size="xs" status="online" />
                <Avatar name="Instagram Bot" size="sm" status="away" />
                <Avatar name="Nexus Platform" size="md" status="online" />
                <Avatar name="Super Creator" size="lg" status="offline" />
                <Avatar name="Global Admin" size="xl" />
              </div>
            </div>
            <div>
              <span className="text-stat-label block mb-3">Switch Trigger</span>
              <Switch
                checked={switchChecked}
                onChange={(val) => {
                  setSwitchChecked(val);
                  toast(`Automation queue: ${val ? 'ENABLED' : 'DISABLED'}`, val ? 'success' : 'warning');
                }}
                label="Activate Rate Limiting Safeguards"
              />
            </div>
          </div>

          {/* Progress and Skeletals */}
          <div className="flex flex-col gap-6">
            <div>
              <span className="text-stat-label block mb-2">Metrics Progress</span>
              <Progress value={78} variant="gradient" showLabel />
            </div>
            <div>
              <span className="text-stat-label block mb-2">Tooltips & Popovers</span>
              <div className="flex gap-4">
                <Tooltip content="Instagram rates: 50 / hour limit" position="top">
                  <Button variant="ghost" size="sm">Hover Tooltip (Top)</Button>
                </Tooltip>
                <Dropdown
                  trigger={<Button variant="solid" size="sm">Trigger Dropdown</Button>}
                  items={dropdownItems}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Feedback & Demos */}
      <section className="flex flex-col gap-6">
        <h2 className="text-display border-b border-[var(--border-soft)] pb-2">08 / Overlays & Skeletons</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-[var(--bg-surface)] p-6 rounded-lg border border-[var(--border-soft)]">
          <div className="flex flex-col gap-4">
            <span className="text-stat-label">Overlay Triggers</span>
            <div className="flex gap-3">
              <Button variant="solid" size="md" onClick={() => setIsModalOpen(true)}>
                Open Modal Overlay
              </Button>
              <Button variant="ghost" size="md" onClick={() => toast('Direct message queue normal.', 'success')}>
                Trigger Success Toast
              </Button>
            </div>
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="System Overload Safety">
              <p className="text-sm mb-4">
                The global messaging queues are currently running at <strong className="text-[var(--accent-primary)]">87% rate limit threshold</strong>. Safety bounds have automatically connected to prevent Instagram account suspension.
              </p>
              <div className="flex justify-end gap-2">
                <Button variant="ghost" size="sm" onClick={() => setIsModalOpen(false)}>
                  Acknowledge
                </Button>
                <Button variant="solid" size="sm" onClick={() => {
                  setIsModalOpen(false);
                  toast('Triggered full safety sync', 'success');
                }}>
                  Trigger Flush
                </Button>
              </div>
            </Modal>
          </div>
          <div className="flex flex-col gap-4">
            <span className="text-stat-label">Skeletal Shimmer Loading</span>
            <Skeleton variant="card" />
          </div>
        </div>
      </section>

      <footer className="text-center pt-8 border-t border-[var(--border-soft)] text-xs text-[var(--text-muted)] font-mono">
        NEXUS DM — BUILD STAGE: FOUNDATION SYSTEM · © 2026
      </footer>
    </main>
  );
}

export default function DesignSystemPage() {
  return (
    <ToastProvider>
      <DesignSystemContent />
    </ToastProvider>
  );
}
