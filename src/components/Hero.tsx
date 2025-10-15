'use client';
import Image from 'next/image';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const heroRef = useRef(null);

  useGSAP(() => {
    const ctx = gsap.context(() => {
      // 🏔 Background layer (logo) — moves slowest
      gsap.to('#logo', {
        yPercent: 15, // small movement = far away
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
        yPercent: 35,
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
        yPercent: 60,
        scale: 1.05,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
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
        src="/images/mountain-bg.jpg"
        alt="Distant Background"
        fill
        id="logo"
        className="z-[0] object-cover"
        priority
      />

      {/* 🏔 Mid-Ground Layer */}
      <Image
        src="/images/landscape_andy.png"
        alt="Middle Mountain"
        fill
        id="mountain-1"
        className="z-[1] object-cover"
        priority
      />

      {/* 🪨 Foreground Layer */}
      <Image
        src="/images/mountain.png"
        alt="Front Mountain"
        fill
        id="mountain-2"
        className="z-[2] object-cover"
        priority
      />

      {/* 🌫 Gradient Overlay */}
      <div className="absolute bottom-0 left-0 z-[3] h-24 w-full bg-gradient-to-t from-black via-black/70 to-transparent"></div>
    </section>
  );
}
