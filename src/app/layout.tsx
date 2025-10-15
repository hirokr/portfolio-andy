import type { Metadata } from 'next';
import { Poppins, Courier_Prime, Cutive_Mono } from 'next/font/google';
import './globals.css';

const poppins = Poppins({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['400', '500', '600', '700'],
});

const courierPrime = Courier_Prime({
  subsets: ['latin'],
  variable: '--font-serif',
  weight: ['400', '700'],
});

const cutiveMono = Cutive_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['400'],
});

export const metadata: Metadata = {
  title: 'Andy Clone',
  description: 'Clone of Andy Portfolio',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressContentEditableWarning suppressHydrationWarning spellCheck>
      <body
        className={`${poppins.variable} ${courierPrime.variable} ${cutiveMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
