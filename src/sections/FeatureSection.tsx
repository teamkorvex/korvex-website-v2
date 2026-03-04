import { useRef, useLayoutEffect, type ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface FeatureSectionProps {
  id: string;
  headline: string;
  body: string;
  secondaryText?: string;
  icon: ReactNode;
  backgroundImage: string;
  zIndex: number;
  entranceDirection?: 'bottom' | 'left' | 'right' | 'scale';
}

export function FeatureSection({
  id,
  headline,
  body,
  secondaryText,
  icon,
  backgroundImage,
  zIndex,
  entranceDirection = 'bottom',
}: FeatureSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const secondaryRef = useRef<HTMLParagraphElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const orb = orbRef.current;
    const headlineEl = headlineRef.current;
    const bodyEl = bodyRef.current;
    const secondaryEl = secondaryRef.current;
    const bg = bgRef.current;

    if (!section || !orb || !headlineEl || !bodyEl || !bg) return;

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

      // Entrance animations based on direction
      let orbEntrance: gsap.TweenVars = { scale: 0.6, opacity: 0, y: '18vh' };
      let headlineEntrance: gsap.TweenVars = { y: '-10vh', opacity: 0 };
      let bodyEntrance: gsap.TweenVars = { y: '6vh', opacity: 0 };

      switch (entranceDirection) {
        case 'left':
          orbEntrance = { x: '-18vw', scale: 0.7, opacity: 0 };
          headlineEntrance = { x: '10vw', opacity: 0 };
          bodyEntrance = { x: '10vw', opacity: 0 };
          break;
        case 'right':
          orbEntrance = { x: '18vw', scale: 0.7, opacity: 0 };
          headlineEntrance = { x: '-10vw', opacity: 0 };
          bodyEntrance = { x: '-10vw', opacity: 0 };
          break;
        case 'scale':
          orbEntrance = { scale: 0.6, opacity: 0, rotate: -8 };
          headlineEntrance = { y: '6vh', opacity: 0 };
          bodyEntrance = { y: '6vh', opacity: 0 };
          break;
      }

      // Phase 1 (0-30%): Entrance
      scrollTl
        .fromTo(bg, 
          { scale: 1.08, opacity: 0.7 }, 
          { scale: 1, opacity: 1, ease: 'none' }, 
          0
        )
        .fromTo(orb, 
          orbEntrance, 
          { x: 0, y: 0, scale: 1, opacity: 1, rotate: 0, ease: 'none' }, 
          0
        )
        .fromTo(headlineEl, 
          headlineEntrance, 
          { x: 0, y: 0, opacity: 1, ease: 'none' }, 
          0.05
        )
        .fromTo(bodyEl, 
          bodyEntrance, 
          { x: 0, y: 0, opacity: 1, ease: 'none' }, 
          0.1
        );

      if (secondaryEl) {
        scrollTl.fromTo(secondaryEl, 
          { y: '4vh', opacity: 0 }, 
          { y: 0, opacity: 1, ease: 'none' }, 
          0.15
        );
      }

      // Phase 2 (30-70%): Settle - no animation

      // Phase 3 (70-100%): Exit
      scrollTl
        .fromTo(orb, 
          { scale: 1, opacity: 1 }, 
          { scale: 0.85, opacity: 0, ease: 'power2.in' }, 
          0.70
        )
        .fromTo([headlineEl, bodyEl], 
          { y: 0, opacity: 1 }, 
          { y: '-18vh', opacity: 0, ease: 'power2.in' }, 
          0.70
        )
        .fromTo(bg, 
          { scale: 1, opacity: 1 }, 
          { scale: 1.05, opacity: 0.7, ease: 'power2.in' }, 
          0.70
        );

      if (secondaryEl) {
        scrollTl.fromTo(secondaryEl, 
          { y: 0, opacity: 1 }, 
          { y: '-16vh', opacity: 0, ease: 'power2.in' }, 
          0.70
        );
      }
    }, section);

    return () => ctx.revert();
  }, [entranceDirection]);

  return (
    <section
      ref={sectionRef}
      id={id}
      className="relative w-full h-screen overflow-hidden"
      style={{ zIndex }}
    >
      {/* Background Image */}
      <div
        ref={bgRef}
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: `url(${backgroundImage})`,
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
          {headline}
        </h2>

        {/* Body */}
        <p
          ref={bodyRef}
          className="mt-6 text-base md:text-lg text-secondary-light text-center max-w-lg"
        >
          {body}
        </p>

        {/* Secondary Text */}
        {secondaryText && (
          <p
            ref={secondaryRef}
            className="mt-4 text-sm text-secondary-light/70"
          >
            {secondaryText}
          </p>
        )}

        {/* Orb Icon */}
        <div
          ref={orbRef}
          className="absolute left-1/2 top-[52%] -translate-x-1/2 -translate-y-1/2"
        >
          <div className="w-32 h-32 md:w-40 md:h-40 lg:w-44 lg:h-44 rounded-full orb-gradient flex items-center justify-center border border-white/10">
            {icon}
          </div>
        </div>
      </div>
    </section>
  );
}
