import { useRef, useLayoutEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ShieldCheckIcon, DiscordIcon } from '@/components/icons/OrbIcons';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function CTASection() {
  const sectionRef = useRef<HTMLElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const orb = orbRef.current;
    const headline = headlineRef.current;
    const body = bodyRef.current;
    const cta = ctaRef.current;
    const bg = bgRef.current;

    if (!section || !orb || !headline || !body || !cta || !bg) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        }
      });

      // Phase 1 (0-30%): Entrance
      scrollTl
        .fromTo(bg, 
          { scale: 1.08, opacity: 0.75 }, 
          { scale: 1, opacity: 1, ease: 'none' }, 
          0
        )
        .fromTo(orb, 
          { scale: 0.6, opacity: 0, y: '18vh' }, 
          { scale: 1, opacity: 1, y: 0, ease: 'none' }, 
          0
        )
        .fromTo(headline, 
          { y: '-10vh', opacity: 0 }, 
          { y: 0, opacity: 1, ease: 'none' }, 
          0.05
        )
        .fromTo(body, 
          { y: '6vh', opacity: 0 }, 
          { y: 0, opacity: 1, ease: 'none' }, 
          0.1
        )
        .fromTo(cta, 
          { y: '8vh', opacity: 0 }, 
          { y: 0, opacity: 1, ease: 'none' }, 
          0.15
        );

      // Phase 2 (30-70%): Settle

      // Phase 3 (70-100%): Exit
      scrollTl
        .fromTo(orb, 
          { scale: 1, opacity: 1 }, 
          { scale: 0.9, opacity: 0, ease: 'power2.in' }, 
          0.70
        )
        .fromTo([headline, body, cta], 
          { y: 0, opacity: 1 }, 
          { y: '-12vh', opacity: 0, ease: 'power2.in' }, 
          0.70
        )
        .fromTo(bg, 
          { scale: 1, opacity: 1 }, 
          { scale: 1.04, opacity: 0.7, ease: 'power2.in' }, 
          0.70
        );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden"
      style={{ zIndex: 90 }}
    >
      {/* Background Image */}
      <div
        ref={bgRef}
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: 'url(/hero_bg_hallway_alt.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-dark/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-6">
        {/* Headline */}
        <h2
          ref={headlineRef}
          className="font-heading font-semibold text-3xl md:text-4xl lg:text-5xl text-primary-light text-center tracking-tight"
        >
          Ready to protect your server?
        </h2>

        {/* Body */}
        <p
          ref={bodyRef}
          className="mt-6 text-base md:text-lg text-secondary-light text-center max-w-lg"
        >
          Start blocking threats in minutes. No credit card required.
        </p>

        {/* CTA Buttons */}
        <div ref={ctaRef} className="mt-8 flex flex-col sm:flex-row gap-4">
          <Button
            onClick={() => window.open('https://discord.com/oauth2/authorize?client_id=1474463953886122167&permissions=4504976164457700&integration_type=0&scope=bot', '_blank')}
            className="bg-cobalt hover:bg-cobalt-dark text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-all hover:-translate-y-0.5 hover:scale-[1.02]"
          >
            <DiscordIcon size={20} />
            Add to Discord
          </Button>
          <Button
            onClick={() => window.open('https://discord.gg/korvex', '_blank')}
            variant="outline"
            className="border-white/20 text-primary-light hover:bg-white/5 px-6 py-3 rounded-lg transition-all hover:-translate-y-0.5"
          >
            Join Support Server
          </Button>
        </div>

        {/* Orb Icon */}
        <div
          ref={orbRef}
          className="absolute left-1/2 top-[52%] -translate-x-1/2 -translate-y-1/2"
        >
          <div className="w-32 h-32 md:w-40 md:h-40 lg:w-44 lg:h-44 rounded-full orb-gradient flex items-center justify-center border border-white/10">
            <ShieldCheckIcon size={56} className="text-cobalt" />
          </div>
        </div>
      </div>
    </section>
  );
}
