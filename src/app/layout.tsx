import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { type ReactNode } from 'react';
import { cn } from 'src/lib/utils';
import { Toaster } from 'src/shared/components/ui/toaster';
import '../styles/global.css';
import { ReactQueryClientProvider } from './ReactQueryClientProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Suppli 360 - ISPayment',
  description: 'Bienvenido a Suppli 360 - ISPayment',
  icons: {
    icon: ['/favicon/favicon.ico?v=4'],
    apple: ['/favicon/apple-touch-icon.png?v=4'],
    shortcut: ['/favicon/apple-touch-icon.png'],
  },
};

const RootLayout = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  return (
    <html lang="es" className="h-full overflow-hidden">
      <body
        className={cn(
          'relative h-full font-sans antialiased overflow-hidden',
          inter.className,
        )}
      >
        <ReactQueryClientProvider>
          {children}
          <Toaster />
        </ReactQueryClientProvider>
      </body>
    </html>
  );
};

export default RootLayout;
