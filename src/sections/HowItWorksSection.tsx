import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: '01',
    title: 'Add Korvex to Your Server',
    description: 'Click the "Add to Discord" button and authorize Korvex with the required permissions.',
  },
  {
    number: '02',
    title: 'Set Up Your Log Channel',
    description: 'Use the /setup command to configure where you want to receive security alerts.',
  },
  {
    number: '03',
    title: 'Stay Protected',
    description: 'Korvex automatically monitors and protects your server 24/7. No further action needed.',
  },
];

export function HowItWorksSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const stepsEl = stepsRef.current;

    if (!section || !stepsEl) return;

    const ctx = gsap.context(() => {
      const stepElements = stepsEl.querySelectorAll('.step-item');
      
      gsap.fromTo(stepElements,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.15,
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
      id="how-it-works"
      className="relative w-full py-24 bg-gradient-dark"
    >
      <div className="max-w-4xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-bold text-3xl md:text-4xl text-white mb-4">
            How It Works
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Get started with Korvex in just 3 simple steps
          </p>
        </div>

        {/* Steps */}
        <div ref={stepsRef} className="space-y-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="step-item flex items-start gap-6 bg-card-dark rounded-2xl p-8"
            >
              <div className="flex-shrink-0 w-16 h-16 rounded-xl bg-[#5865F2]/20 flex items-center justify-center">
                <span className="font-bold text-xl text-[#5865F2]">{step.number}</span>
              </div>
              <div>
                <h3 className="font-semibold text-xl text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
