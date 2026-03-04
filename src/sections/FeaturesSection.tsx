import { useRef, useLayoutEffect } from 'react';
import { GlobeIcon, DocumentCheckIcon, EnvelopeIcon, FingerprintIcon } from '@/components/icons/OrbIcons';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: GlobeIcon,
    title: 'Global Blacklist Database',
    description: 'A single, continuously updated record of flagged users—shared across every server that uses Korvex.',
  },
  {
    icon: DocumentCheckIcon,
    title: 'Automatic Detection',
    description: 'When a flagged user joins, Korvex recognizes the risk instantly—no manual checks required.',
  },
  {
    icon: EnvelopeIcon,
    title: 'Instant Alerts & Logging',
    description: 'Ban actions are logged with clear reasons. Moderators stay informed with concise, real-time alerts.',
  },
  {
    icon: FingerprintIcon,
    title: 'Abuse-Resistant System',
    description: 'Adds, appeals, and audits are structured so the list stays accurate—and hard to game.',
  },
];

export function FeaturesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const cards = cardsRef.current;

    if (!section || !cards) return;

    const ctx = gsap.context(() => {
      const cardElements = cards.querySelectorAll('.feature-card');
      
      gsap.fromTo(cardElements,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          }
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="features"
      className="relative w-full py-24 bg-[#0f1117]"
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-bold text-3xl md:text-4xl text-white mb-4">
            Powerful Security Features
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Everything you need to protect your Discord community
          </p>
        </div>

        {/* Feature Cards */}
        <div ref={cardsRef} className="grid md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="feature-card bg-card-dark rounded-2xl p-8 hover:bg-white/[0.05] transition-colors"
            >
              <div className="w-12 h-12 rounded-xl bg-[#5865F2]/20 flex items-center justify-center mb-6">
                <feature.icon size={24} className="text-[#5865F2]" />
              </div>
              <h3 className="font-semibold text-xl text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
