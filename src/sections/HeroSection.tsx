import { useRef, useLayoutEffect } from 'react';
import { Button } from '@/components/ui/button';
import { DiscordIcon, BookIcon, CheckIcon } from '@/components/icons/OrbIcons';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;

    if (!section || !content) return;

    const ctx = gsap.context(() => {
      // Entrance animation
      gsap.fromTo(content,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const DASHBOARD_URL = 'https://discord.com/oauth2/authorize?client_id=1478785957569233028&response_type=code&redirect_uri=https%3A%2F%2Fvelu-coming-soon-lan-0r0u.bolt.host&scope=identify+connections+guilds.members.read+presences.read';

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen bg-gradient-hero flex items-center justify-center"
    >
      {/* Content */}
      <div ref={contentRef} className="relative z-10 flex flex-col items-center justify-center px-6 py-32 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-sm text-gray-300">100% Free Forever</span>
        </div>

        {/* Headline */}
        <h1 className="font-bold text-4xl md:text-5xl lg:text-6xl text-white text-center tracking-tight max-w-4xl leading-tight">
          Global Security for{' '}
          <span className="text-gray-400">Every Discord Server</span>
        </h1>

        {/* Subheadline */}
        <p className="mt-6 text-lg md:text-xl text-gray-400 text-center max-w-2xl leading-relaxed">
          The only all-in-one global blacklisting system that protects your community automatically. 
          No paywalls. No premium tiers. Just security.
        </p>

        {/* CTA Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row gap-4">
          <Button
            onClick={() => window.open('https://discord.com/oauth2/authorize?client_id=1474463953886122167&permissions=4504976164457700&integration_type=0&scope=bot', '_blank')}
            className="bg-[#5865F2] hover:bg-[#4752C4] text-white px-8 py-6 rounded-xl flex items-center gap-2 transition-all hover:-translate-y-0.5 text-base font-medium"
          >
            <DiscordIcon size={20} />
            Add to Discord
          </Button>
          <Button
            onClick={() => window.open(DASHBOARD_URL, '_blank')}
            variant="outline"
            className="border-white/20 bg-white/5 text-white hover:bg-white/10 px-8 py-6 rounded-xl flex items-center gap-2 transition-all hover:-translate-y-0.5 text-base font-medium"
          >
            <BookIcon size={20} />
            Dashboard
          </Button>
        </div>

        {/* Trust Badges */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <CheckIcon size={16} className="text-green-500" />
            <span>No credit card required</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckIcon size={16} className="text-green-500" />
            <span>2-minute setup</span>
          </div>
        </div>
      </div>
    </section>
  );
}
