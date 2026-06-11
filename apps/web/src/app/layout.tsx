import type React from 'react';
import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import './global.css';
import { Providers } from './providers';
import { CursorTrail } from '@/components/studio/CursorTrail';
import { Toaster } from '@/components/ui/sonner';
import { WhatsAppButton } from '@/components/studio/WhatsAppButton';

export const metadata: Metadata = {
  title: 'Atharv Digital Photo Studio | Bhogewadi',
  description:
    'Premium photography and digital imaging services in Bhogewadi, Maharashtra. Wedding photography, passport photos, event coverage, and digital services.',
  keywords: [
    'photography',
    'photo studio',
    'Bhogewadi',
    'wedding photography',
    'passport photos',
    'digital imaging',
  ],
  icons: {
    icon: '/favicon.png',
  },
  openGraph: {
    title: 'Atharv Digital Photo Studio',
    description: 'Premium photography and digital imaging services in Bhogewadi.',
    type: 'website',
    locale: 'en_IN',
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="/fontawesome/releases/v6.3.0/css/pro.min.css?token=2c15cc0cc7"
        />
      </head>
      <body className="antialiased">
        <Providers>
          {children}
          <CursorTrail />
          <WhatsAppButton />
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
