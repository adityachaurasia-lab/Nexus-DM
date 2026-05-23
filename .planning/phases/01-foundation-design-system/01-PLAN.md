# Plan 01: Next.js 14 Project Scaffolding

---
wave: 1
depends_on: []
files_modified:
  - package.json
  - tsconfig.json
  - next.config.js
  - tailwind.config.ts
  - postcss.config.js
  - app/layout.tsx
  - app/page.tsx
  - app/globals.css
  - .env.example
  - .gitignore
  - vercel.json
autonomous: true
requirements: [FOUND-01, FOUND-08, FOUND-09]
---

## Objective

Scaffold a Next.js 14 App Router project with TypeScript strict mode, Tailwind CSS 3.x configured with the NEXUS DM design tokens, and all foundational configuration files.

## Tasks

<task id="01.1">
<title>Initialize Next.js 14 project</title>
<read_first>
- (none — greenfield project)
</read_first>
<action>
Run `npx -y create-next-app@latest ./ --typescript --tailwind --eslint --app --src-dir=false --import-alias="@/*" --use-npm` in the project root `e:\Dev Projects\DMAUtO`.

If the command requires interactive input, use these options:
- TypeScript: Yes
- ESLint: Yes
- Tailwind CSS: Yes
- `src/` directory: No
- App Router: Yes
- Import alias: @/*

After creation, verify `package.json` exists and contains `"next"`.
</action>
<acceptance_criteria>
- `package.json` contains `"next": "14`
- `package.json` contains `"typescript"`
- `tsconfig.json` exists and contains `"strict": true`
- `app/layout.tsx` exists
- `app/page.tsx` exists
- `tailwind.config.ts` exists
</acceptance_criteria>
</task>

<task id="01.2">
<title>Install all required dependencies</title>
<read_first>
- package.json
</read_first>
<action>
Run npm install for all required dependencies:

**Production dependencies:**
```
npm install framer-motion@11 zustand @tanstack/react-query react-hook-form zod reactflow recharts lucide-react mongoose @upstash/redis @upstash/kafka next-auth@5 pusher pusher-js stripe razorpay @aws-sdk/client-s3 resend
```

**Dev dependencies:**
```
npm install -D @types/node @types/react @types/react-dom css-modules-typescript-loader
```
</action>
<acceptance_criteria>
- `package.json` contains `"framer-motion"`
- `package.json` contains `"zustand"`
- `package.json` contains `"reactflow"`
- `package.json` contains `"mongoose"`
- `package.json` contains `"@upstash/redis"`
- `package.json` contains `"next-auth"`
- `package.json` contains `"lucide-react"`
- `package.json` contains `"recharts"`
- `node_modules` directory exists
</acceptance_criteria>
</task>

<task id="01.3">
<title>Configure TypeScript strict mode</title>
<read_first>
- tsconfig.json
</read_first>
<action>
Update `tsconfig.json` to enforce strict mode with these exact settings:

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./*"] },
    "forceConsistentCasingInFileNames": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```
</action>
<acceptance_criteria>
- `tsconfig.json` contains `"strict": true`
- `tsconfig.json` contains `"noUncheckedIndexedAccess": true`
- `tsconfig.json` contains `"noImplicitReturns": true`
</acceptance_criteria>
</task>

<task id="01.4">
<title>Configure Tailwind CSS with NEXUS DM design tokens</title>
<read_first>
- tailwind.config.ts
</read_first>
<action>
Replace `tailwind.config.ts` with full NEXUS DM configuration:

```typescript
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Cabinet Grotesk', 'sans-serif'],
        heading: ['Fraunces', 'serif'],
        body: ['Sora', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        accent: ['Bebas Neue', 'sans-serif'],
      },
      colors: {
        canvas: 'var(--bg-canvas)',
        surface: 'var(--bg-surface)',
        elevated: 'var(--bg-elevated)',
        inset: 'var(--bg-inset)',
        'accent-primary': 'var(--accent-primary)',
        'accent-secondary': 'var(--accent-secondary)',
        'accent-tertiary': 'var(--accent-tertiary)',
        'accent-warning': 'var(--accent-warning)',
        'text-primary': 'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',
        'text-muted': 'var(--text-muted)',
        'text-inverse': 'var(--text-inverse)',
      },
      borderColor: {
        sharp: 'var(--border-sharp)',
        soft: 'var(--border-soft)',
      },
      boxShadow: {
        brutal: 'var(--shadow-brutal)',
        float: 'var(--shadow-float)',
        deep: 'var(--shadow-deep)',
      },
      backgroundImage: {
        'gradient-hero': 'var(--gradient-hero)',
        'gradient-card': 'var(--gradient-card)',
      },
      spacing: {
        xs: '0.25rem',
        sm: '0.5rem',
        md: '1rem',
        lg: '1.5rem',
        xl: '2.5rem',
        '2xl': '4rem',
        '3xl': '7rem',
        '4xl': '10rem',
      },
      borderRadius: {
        sm: '4px',
        md: '8px',
        lg: '16px',
        xl: '24px',
        pill: '9999px',
      },
      transitionTimingFunction: {
        spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'in-expo': 'cubic-bezier(0.7, 0, 0.84, 0)',
        magnetic: 'cubic-bezier(0.23, 1, 0.32, 1)',
      },
      transitionDuration: {
        instant: '80ms',
        fast: '150ms',
        normal: '300ms',
        slow: '600ms',
        dramatic: '1200ms',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'slide-up': 'slide-up 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        'fade-in': 'fade-in 0.4s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        'slide-up': {
          from: { transform: 'translateY(20px)', opacity: '0' },
          to: { transform: 'translateY(0)', opacity: '1' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
```
</action>
<acceptance_criteria>
- `tailwind.config.ts` contains `fontFamily` with `display`, `heading`, `body`, `mono`, `accent`
- `tailwind.config.ts` contains `darkMode: ['class', '[data-theme="dark"]']`
- `tailwind.config.ts` contains `'accent-primary'`
- `tailwind.config.ts` contains `transitionTimingFunction` with `spring` and `magnetic`
</acceptance_criteria>
</task>

<task id="01.5">
<title>Create globals.css with full design token system</title>
<read_first>
- app/globals.css
</read_first>
<action>
Replace `app/globals.css` with the complete NEXUS DM design token system:

```css
/* ══════════════════════════════════════════════════════
   NEXUS DM — Design System Tokens
   "Liquid Brutalism meets Kinetic Editorial"
   ══════════════════════════════════════════════════════ */

/* ── Google Fonts Import ── */
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Fraunces:ital,opsz,wght@0,9..144,100..900;1,9..144,100..900&family=JetBrains+Mono:wght@300;400;500;600;700&family=Sora:wght@300;400;500;600;700&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

/* ── Cabinet Grotesk (self-hosted or fallback) ── */
/* Note: Cabinet Grotesk is available from fontsource or as a variable font download */

/* ── LIGHT MODE "SOLAR PAPER" ── */
:root,
:root[data-theme="light"] {
  --bg-canvas:       #F5F0E8;
  --bg-surface:      #FFFDF7;
  --bg-elevated:     #FFFFFF;
  --bg-inset:        #EDE8DC;

  --accent-primary:  #FF3D00;
  --accent-secondary:#1A0AFF;
  --accent-tertiary: #00E5A0;
  --accent-warning:  #FFB800;

  --text-primary:    #0A0A0A;
  --text-secondary:  #3D3D3D;
  --text-muted:      #8A8A8A;
  --text-inverse:    #F5F0E8;

  --border-sharp:    #0A0A0A;
  --border-soft:     rgba(10,10,10,0.12);

  --shadow-brutal:   4px 4px 0px #0A0A0A;
  --shadow-float:    0 20px 60px rgba(255,61,0,0.15), 0 4px 20px rgba(0,0,0,0.08);
  --shadow-deep:     0 40px 120px rgba(0,0,0,0.2);

  --gradient-hero:   linear-gradient(135deg, #FF3D00 0%, #FF8C00 50%, #1A0AFF 100%);
  --gradient-card:   linear-gradient(160deg, rgba(255,61,0,0.06) 0%, transparent 60%);

  /* Typography scale */
  --text-hero:    clamp(4rem, 10vw, 9rem);
  --text-display: clamp(2.5rem, 5vw, 5rem);
  --text-heading: clamp(1.5rem, 3vw, 2.5rem);
  --text-body:    clamp(0.875rem, 1.2vw, 1rem);

  /* Spacing */
  --space-xs:  0.25rem;
  --space-sm:  0.5rem;
  --space-md:  1rem;
  --space-lg:  1.5rem;
  --space-xl:  2.5rem;
  --space-2xl: 4rem;
  --space-3xl: 7rem;
  --space-4xl: 10rem;

  /* Radii */
  --radius-sm:   4px;
  --radius-md:   8px;
  --radius-lg:   16px;
  --radius-xl:   24px;
  --radius-pill: 9999px;

  /* Motion */
  --ease-spring:   cubic-bezier(0.34, 1.56, 0.64, 1);
  --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-in-expo:  cubic-bezier(0.7, 0, 0.84, 0);
  --ease-magnetic: cubic-bezier(0.23, 1, 0.32, 1);

  --duration-instant:  80ms;
  --duration-fast:     150ms;
  --duration-normal:   300ms;
  --duration-slow:     600ms;
  --duration-dramatic: 1200ms;

  color-scheme: light;
}

/* ── DARK MODE "VOID MATTER" ── */
:root[data-theme="dark"] {
  --bg-canvas:       #080808;
  --bg-surface:      #0F0F0F;
  --bg-elevated:     #161616;
  --bg-inset:        #1E1E1E;

  --accent-primary:  #FF4D1A;
  --accent-secondary:#4D6BFF;
  --accent-tertiary: #00FFB2;
  --accent-warning:  #FFD60A;

  --text-primary:    #F0EDE6;
  --text-secondary:  #B0ACA3;
  --text-muted:      #555550;
  --text-inverse:    #080808;

  --border-sharp:    #F0EDE6;
  --border-soft:     rgba(240,237,230,0.08);

  --shadow-brutal:   4px 4px 0px rgba(255,77,26,0.8);
  --shadow-float:    0 20px 60px rgba(255,77,26,0.2), 0 4px 20px rgba(0,0,0,0.4);
  --shadow-deep:     0 40px 120px rgba(0,0,0,0.8);

  --gradient-hero:   linear-gradient(135deg, #FF4D1A 0%, #FF8C42 40%, #4D6BFF 100%);
  --gradient-card:   linear-gradient(160deg, rgba(255,77,26,0.08) 0%, transparent 60%);

  color-scheme: dark;
}

/* ── CSS Reset ── */
@layer base {
  *,
  *::before,
  *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    scroll-behavior: smooth;
    -webkit-text-size-adjust: 100%;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    font-family: 'Sora', sans-serif;
    font-weight: 400;
    line-height: 1.6;
    color: var(--text-primary);
    background-color: var(--bg-canvas);
    transition: background-color var(--duration-slow) var(--ease-out-expo),
                color var(--duration-slow) var(--ease-out-expo);
  }

  h1, h2, h3, h4 {
    font-family: 'Fraunces', serif;
    font-weight: 700;
    line-height: 1.1;
    letter-spacing: -0.02em;
  }

  code, pre, kbd {
    font-family: 'JetBrains Mono', monospace;
  }

  ::selection {
    background-color: var(--accent-primary);
    color: var(--text-inverse);
  }

  :focus-visible {
    outline: 2px solid var(--accent-primary);
    outline-offset: 2px;
  }

  /* Reduced motion */
  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
}

/* ── Utility Classes ── */
@layer utilities {
  .text-hero {
    font-size: var(--text-hero);
    font-family: 'Cabinet Grotesk', 'Sora', sans-serif;
    font-weight: 900;
    line-height: 0.9;
    letter-spacing: -0.04em;
  }

  .text-display {
    font-size: var(--text-display);
    font-family: 'Fraunces', serif;
    font-weight: 700;
    line-height: 1.05;
  }

  .text-stat-label {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 0.75rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--text-muted);
  }

  .brutal-border {
    border: 2px solid var(--border-sharp);
  }

  .brutal-shadow {
    box-shadow: var(--shadow-brutal);
  }

  .float-shadow {
    box-shadow: var(--shadow-float);
  }

  .noise-overlay {
    position: relative;
  }

  .noise-overlay::after {
    content: '';
    position: absolute;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
    pointer-events: none;
    z-index: 1;
  }

  .gradient-text {
    background: var(--gradient-hero);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .glass {
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    background: rgba(255,255,255,0.05);
    border: 1px solid var(--border-soft);
  }
}
```
</action>
<acceptance_criteria>
- `app/globals.css` contains `data-theme="light"` CSS rule
- `app/globals.css` contains `data-theme="dark"` CSS rule
- `app/globals.css` contains `--accent-primary`
- `app/globals.css` contains `--text-hero`
- `app/globals.css` contains `prefers-reduced-motion`
- `app/globals.css` contains `font-family: 'Sora'`
- `app/globals.css` contains `.brutal-border`
- `app/globals.css` contains `.noise-overlay`
</acceptance_criteria>
</task>

<task id="01.6">
<title>Create root layout with font loading and theme provider setup</title>
<read_first>
- app/layout.tsx
- app/globals.css
</read_first>
<action>
Replace `app/layout.tsx` with:

```tsx
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'NEXUS DM — Automate. Connect. Dominate.',
    template: '%s | NEXUS DM',
  },
  description: 'The world\'s most beautiful DM automation platform for creators and influencers. Automate messages across Instagram, Facebook, YouTube, WhatsApp, Twitter, and more.',
  keywords: ['DM automation', 'Instagram automation', 'WhatsApp automation', 'social media automation', 'influencer tools', 'creator tools'],
  authors: [{ name: 'NEXUS DM' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'NEXUS DM',
    title: 'NEXUS DM — Automate. Connect. Dominate.',
    description: 'The world\'s most beautiful DM automation platform for creators and influencers.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NEXUS DM — Automate. Connect. Dominate.',
    description: 'The world\'s most beautiful DM automation platform for creators and influencers.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="light" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="font-body antialiased">
        {children}
      </body>
    </html>
  );
}
```
</action>
<acceptance_criteria>
- `app/layout.tsx` contains `data-theme="light"`
- `app/layout.tsx` contains `metadata` export with `title` and `description`
- `app/layout.tsx` contains `suppressHydrationWarning`
- `app/layout.tsx` contains `font-body`
</acceptance_criteria>
</task>

<task id="01.7">
<title>Create configuration files (.env.example, next.config.js, vercel.json)</title>
<read_first>
- next.config.js (or next.config.mjs if created by create-next-app)
</read_first>
<action>
Create `.env.example`:
```
# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=

# Database
MONGODB_URI=

# Cache
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=

# Queue
UPSTASH_KAFKA_REST_URL=
UPSTASH_KAFKA_REST_USERNAME=
UPSTASH_KAFKA_REST_PASSWORD=

# Real-time
PUSHER_APP_ID=
NEXT_PUBLIC_PUSHER_KEY=
PUSHER_SECRET=
PUSHER_CLUSTER=

# Auth Providers
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

# Payments
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
RAZORPAY_WEBHOOK_SECRET=

# Platform APIs
META_APP_ID=
META_APP_SECRET=
META_WEBHOOK_VERIFY_TOKEN=

# Storage
CLOUDFLARE_R2_ENDPOINT=
CLOUDFLARE_R2_ACCESS_KEY_ID=
CLOUDFLARE_R2_SECRET_ACCESS_KEY=
CLOUDFLARE_R2_BUCKET=

# Email
RESEND_API_KEY=

# Security
ENCRYPTION_SECRET=
```

Create/update `next.config.js` (or `.mjs`) with security headers:
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '*.fbcdn.net' },
      { protocol: 'https', hostname: '*.twimg.com' },
      { protocol: 'https', hostname: '*.cloudflare.com' },
      { protocol: 'https', hostname: 'lh3.googleusercontent.com' },
    ],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
      {
        source: '/api/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'no-store' },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
```

Create `vercel.json`:
```json
{
  "crons": [
    { "path": "/api/cron/webhook-normalizer", "schedule": "* * * * *" },
    { "path": "/api/cron/automation-matcher", "schedule": "* * * * *" },
    { "path": "/api/cron/message-sender", "schedule": "* * * * *" },
    { "path": "/api/cron/retry-processor", "schedule": "*/2 * * * *" },
    { "path": "/api/cron/token-refresh", "schedule": "0 * * * *" },
    { "path": "/api/cron/sync-usage", "schedule": "0 * * * *" },
    { "path": "/api/cron/usage-reset", "schedule": "0 0 1 * *" }
  ]
}
```
</action>
<acceptance_criteria>
- `.env.example` contains `MONGODB_URI=`
- `.env.example` contains `UPSTASH_REDIS_REST_URL=`
- `.env.example` contains `ENCRYPTION_SECRET=`
- `next.config.js` (or `.mjs`) contains `X-Frame-Options`
- `next.config.js` (or `.mjs`) contains `reactStrictMode: true`
- `vercel.json` contains `crons` array
</acceptance_criteria>
</task>

## Verification

- [ ] `npm run dev` starts without errors
- [ ] TypeScript compiler reports no errors (`npx tsc --noEmit`)
- [ ] Tailwind config loads custom design tokens
- [ ] Both theme CSS variable sets are defined in globals.css

## must_haves

1. Next.js 14 App Router with TypeScript strict mode compiles
2. Tailwind CSS configured with all NEXUS DM design tokens
3. Both themes (Solar Paper + Void Matter) CSS variables defined
4. Security headers configured in next.config.js
5. All production dependencies installed
