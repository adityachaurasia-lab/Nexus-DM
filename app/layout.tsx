import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { ToastProvider } from '@/components/ui';

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
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
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
      </head>
      <body className="font-body antialiased">
        <ThemeProvider>
          <ToastProvider>
            {children}
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
