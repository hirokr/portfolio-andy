'use client';
import Image from 'next/image';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';
import { Compass } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const heroRef = useRef(null);

  useGSAP(() => {
    const ctx = gsap.context(() => {
      // 🏔 Background layer (logo) — moves slowest
      gsap.to('#logo', {
        yPercent: 50, // small movement = far away
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      // 🌄 Mid-ground layer (mountain-bg)
      gsap.to('#mountain-1', {
        yPercent: 40,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      // 🪨 Foreground mountain — moves fastest, appears closest
      gsap.to('#mountain-2', {
        yPercent: 15,
        scale: 1.05,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      // 🧭 Compass rotation effect
      gsap.to('#compass', {
        rotate: 360,
        ease: 'sine.inOut',
        repeat: -1,
        duration: 3,
        delay: 1,
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen overflow-hidden bg-transparent"
    >
      {/* 🌌 Background Logo Layer */}
      <Image
        id="logo"
        src="/images/mountain-bg.jpg"
        alt="Distant Background"
        fill
        className="z-[0] object-cover"
        priority
      />

      {/* 🏔 Mid-Ground Layer */}
      <Image
        id="mountain-1"
        src="/images/landscape_andy.png"
        alt="Middle Mountain"
        fill
        className="z-[1] object-cover"
        priority
      />

      {/* 🪨 Foreground Layer */}
      <Image
        id="mountain-2"
        src="/images/mountain.png"
        alt="Front Mountain"
        fill
        className="z-[2] object-cover"
        priority
      />

      {/* 🌫 Gradient Overlay */}
      <div className="absolute bottom-0 left-0 z-[3] container flex h-24 w-full min-w-full items-center justify-between bg-gradient-to-t from-black via-black/70 to-transparent">
        <div className="flex-center gap-2">
          <Compass id="compass" className="text-white/90" />
          <span className="text-white/60">37.8136° S, 144.9631° E</span>
        </div>
        <p className="text-white/60">Creating films in Melbourne / Bright</p>
      </div>
    </section>
  );
}
