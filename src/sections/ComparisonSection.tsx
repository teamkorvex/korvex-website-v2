import { useRef, useLayoutEffect } from 'react';
import { CheckIcon, XIcon } from '@/components/icons/OrbIcons';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const otherBotsFeatures = [
  'Expensive monthly subscriptions',
  'Essential features locked behind paywall',
  'Server and user limits on free tier',
  'Complex configuration required',
  'Bloated with unnecessary features',
  'Isolated protection per server',
  'Limited or paid support',
];

const korvexFeatures = [
  '100% free forever',
  'No premium features or paywalls',
  'No hidden limits on servers or users',
  'Simple 2-minute setup',
  'Focused purely on security',
  'Community-driven protection',
  'Regular updates and support',
];

export function ComparisonSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const cards = cardsRef.current;

    if (!section || !cards) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(cards,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
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
      id="comparison"
      className="relative w-full py-24 bg-gradient-dark"
    >
      <div className="max-w-5xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="font-bold text-3xl md:text-4xl text-white mb-4">
            Why Choose Korvex?
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            See how we compare to other Discord security bots
          </p>
        </div>

        {/* Comparison Cards */}
        <div ref={cardsRef} className="grid md:grid-cols-2 gap-6">
          {/* Other Bots Card */}
          <div className="bg-card-others rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <XIcon size={24} className="text-red-500" />
              <h3 className="font-semibold text-xl text-red-400">Other Bots</h3>
            </div>
            <ul className="space-y-4">
              {otherBotsFeatures.map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <XIcon size={18} className="text-red-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Korvex Card */}
          <div className="bg-card-korvex rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <CheckIcon size={24} className="text-green-500" />
              <h3 className="font-semibold text-xl text-green-400">With Korvex</h3>
            </div>
            <ul className="space-y-4">
              {korvexFeatures.map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckIcon size={18} className="text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
