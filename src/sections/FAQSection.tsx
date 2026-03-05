import { useRef, useLayoutEffect, useState } from 'react';
import { ChevronDownIcon } from '@/components/icons/OrbIcons';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: 'Is Korvex really free?',
    answer: 'Yes, Korvex is 100% free. There are no premium tiers, no paywalls, and no hidden limits. All blacklisting features are available to every server at no cost.',
  },
  {
    question: 'Can server admins edit the global blacklist?',
    answer: 'No, individual server admins cannot directly edit the global blacklist. This prevents abuse and ensures the integrity of the system. Blacklist entries are managed through a structured appeals process and verified reports from trusted korvex adminstration team.',
  },
  {
    question: 'How does Korvex prevent abuse?',
    answer: 'Korvex employs multiple safeguards: all blacklist additions require verification, appeals are reviewed by multiple moderators, and the system tracks audit logs for every action. We also have rate limiting and reputation systems to prevent spam reports.',
  },
  {
    question: 'What happens if someone is falsely blacklisted?',
    answer: 'Users can submit an appeal through our support server. Each appeal is reviewed by multiple moderators who examine the evidence. If the appeal is approved, the user is removed from the blacklist immediately and all affected servers are notified.',
  },
  {
    question: 'How do I configure alerts?',
    answer: 'After adding Korvex to your server, use the /setup command to configure your log channel. All ban actions and detections will be sent to that channel automatically. You can customize alert types and formats through the dashboard.',
  },
  {
    question: 'Where is your support server?',
    answer: 'You can join our official server here: https://discord.gg/nFab4cZKcG',
  },
];

export function FAQSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const items = itemsRef.current.filter(Boolean);

    if (!section || !title) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(title,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: title,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          }
        }
      );

      items.forEach((item, index) => {
        gsap.fromTo(item,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            delay: index * 0.08,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            }
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      ref={sectionRef}
      id="faq"
      className="relative w-full py-24 bg-[#0f1117]"
    >
      <div className="max-w-3xl mx-auto px-6">
        {/* Title */}
        <h2
          ref={titleRef}
          className="font-bold text-3xl md:text-4xl text-white text-center mb-12"
        >
          Frequently Asked Questions
        </h2>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqData.map((item, index) => (
            <div
              key={index}
              ref={(el) => { itemsRef.current[index] = el; }}
              className="bg-card-dark rounded-xl overflow-hidden"
            >
              <button
                onClick={() => toggleItem(index)}
                className="w-full flex items-center justify-between p-5 text-left hover:bg-white/[0.03] transition-colors"
              >
                <span className="font-medium text-white pr-4">
                  {item.question}
                </span>
                <ChevronDownIcon
                  size={20}
                  className={`text-gray-500 flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96' : 'max-h-0'
                }`}
              >
                <p className="px-5 pb-5 text-gray-400 leading-relaxed">
                  {item.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
