'use client';

import { useState, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Menu } from 'lucide-react';
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
      className="fixed top-8 z-50 container flex min-w-full items-center justify-between"
    >
      <button
        className="bg-foreground text-background flex-center hover:bg-background hover:text-foreground transitionEffects size-14 cursor-pointer rounded-full"
        onClick={() => setShowMenu(!showMenu)}
      >
        <Menu />
      </button>

      <Link href="/" className="flex-center relative flex-col">
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

      <button className="flex-center bg-foreground text-background hover:bg-background hover:text-foreground transitionEffects cursor-pointer rounded-full">
        <h2 className="p-4 px-5">Get in touch</h2>
      </button>
    </header>
  );
}
