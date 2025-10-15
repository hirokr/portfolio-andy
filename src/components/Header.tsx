'use client';

import { useState, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Divide, Menu } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { ScrollTrigger } from 'gsap/all';

gsap.registerPlugin(ScrollTrigger);

export default function Header() {
  const [showMenu, setShowMenu] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const ctx = gsap.context(() => {
      const navTween = gsap.timeline({
        scrollTrigger: {
          trigger: headerRef.current,
          start: '200 10%',
          // markers: true,
          toggleActions: 'play none none reverse',
        },
      });

      navTween
        .to('#titleText', {
          y: -10,
          opacity: 0,
        })
        .fromTo('#andyLogo', { opacity: 0, y: 0 }, { opacity: 1, y: -7 });
    }, headerRef);

    return () => ctx.revert();
  }, []);

  return (
    <header
      ref={headerRef}
      id="header"
      className="fixed top-8 z-50 container min-w-full"
    >
      <nav className="z-[99] flex items-center justify-between">
        <button
          className="bg-foreground text-background flex-center hover:bg-background hover:text-foreground transitionEffects z-[99] size-14 cursor-pointer rounded-full"
          onClick={() => setShowMenu(!showMenu)}
        >
          <Menu />
        </button>

        <Link href="/" className="flex-center relative z-[99] flex-col">
          <h2 id="titleText" className="font-sans text-xl tracking-widest">
            GSAP Portfolio
          </h2>
          <Image
            id="andyLogo"
            src="/images/andy-logo.png"
            alt="Andy Logo"
            width={100}
            height={100}
            priority
            className="absolute"
          />
        </Link>

        <button className="flex-center bg-foreground text-background hover:bg-background hover:text-foreground transitionEffects z-[99] cursor-pointer rounded-full">
          <h2 className="p-4 px-5">Get in touch</h2>
        </button>
      </nav>
      <MenuOverlay showMenu={showMenu} />
    </header>
  );
}

export function MenuOverlay({ showMenu }: { showMenu: boolean }) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!overlayRef.current || !contentRef.current) return;

    if (showMenu) {
      // Entry animation
      gsap.set(overlayRef.current, { display: 'flex' });

      const tl = gsap.timeline();
      tl.fromTo(
        overlayRef.current,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, ease: 'power3.out' }
      ).fromTo(
        contentRef.current.children,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.1, ease: 'power2.out' },
        '-=0.2'
      );
    } else {
      // Exit animation
      const tl = gsap.timeline({
        onComplete: () => {
          gsap.set(overlayRef.current, { display: 'none' });
        },
      });

      tl.to(contentRef.current.children, {
        opacity: 0,
        y: -20,
        duration: 0.2,
        stagger: 0.05,
        ease: 'power2.in',
      }).to(
        overlayRef.current,
        {
          scale: 0,
          opacity: 0,
          duration: 0.4,
          ease: 'power3.in',
        },
        '-=0.1'
      );
    }
  }, [showMenu]);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-30 hidden items-center justify-center bg-black"
      style={{ transformOrigin: 'center center' }}
    >
      <div ref={contentRef} className="flex flex-col items-center gap-8">
        {/* Main Navigation */}
        <nav className="flex gap-12 text-center">
          <Link
            href="/"
            className="text-5xl font-bold text-white transition-colors hover:text-gray-400"
          >
            Homepage
          </Link>
          <Link
            href="/portfolio"
            className="text-5xl font-bold text-gray-500 transition-colors hover:text-white"
          >
            Portfolio
          </Link>
          <Link
            href="/motion"
            className="text-5xl font-bold text-gray-500 transition-colors hover:text-white"
          >
            Motion
          </Link>
        </nav>

        {/* Sub Navigation Links */}
        <div className="flex gap-16 pt-8">
          <Link
            href="/mail-list"
            className="flex items-center gap-2 text-sm tracking-wider text-gray-400 uppercase transition-colors hover:text-white"
          >
            MAIL LIST <span className="text-xl">↗</span>
          </Link>
          <Link
            href="/education"
            className="flex items-center gap-2 text-sm tracking-wider text-gray-400 uppercase transition-colors hover:text-white"
          >
            EDUCATION <span className="text-xl">↗</span>
          </Link>
          <Link
            href="/presets"
            className="flex items-center gap-2 text-sm tracking-wider text-gray-400 uppercase transition-colors hover:text-white"
          >
            MY PRESETS <span className="text-xl">↗</span>
          </Link>
          <Link
            href="/prints"
            className="flex items-center gap-2 text-sm tracking-wider text-gray-400 uppercase transition-colors hover:text-white"
          >
            PRINTS <span className="text-xl">↗</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
