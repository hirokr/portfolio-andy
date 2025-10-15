import type { Metadata } from 'next';
import { Poppins, Courier_Prime, Cutive_Mono } from 'next/font/google';
import './globals.css';
import gsap from 'gsap';
import { ScrollTrigger, SplitText } from 'gsap/all';
import Header from '@/components/Header';
gsap.registerPlugin(ScrollTrigger, SplitText);

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

export const experimental_ppr = true;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressContentEditableWarning
      suppressHydrationWarning
      spellCheck
    >
      <body
        className={`${poppins.variable} ${courierPrime.variable} ${cutiveMono.variable} antialiased`}
      >
        <Header />
        {children}
      </body>
    </html>
  );
}
