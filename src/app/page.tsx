import Hero from '@/components/Hero';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  return (
    <main className="h-[200vh] ">
      <Hero />
    </main>
  );
}
