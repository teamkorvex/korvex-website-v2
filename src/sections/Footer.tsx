import { useRef, useLayoutEffect } from 'react';
import { BookIcon, DiscordIcon, ShieldIcon } from '@/components/icons/OrbIcons';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const footer = footerRef.current;
    const content = contentRef.current;

    if (!footer || !content) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(content,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: footer,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          }
        }
      );
    }, footer);

    return () => ctx.revert();
  }, []);

  const DASHBOARD_URL = 'https://discord.com/oauth2/authorize?client_id=1478785957569233028&response_type=code&redirect_uri=https%3A%2F%2Fwww.korvex.xyz%2Fdashboard&scope=identify+email';

  return (
    <footer
      ref={footerRef}
      className="relative w-full bg-[#0a0c10] py-16 border-t border-white/5"
    >
      <div ref={contentRef} className="max-w-4xl mx-auto px-6">
        <div className="flex flex-col items-center text-center">
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2 font-semibold text-xl text-white hover:text-[#5865F2] transition-colors mb-4"
          >
            <div className="w-8 h-8 rounded-lg bg-[#5865F2] flex items-center justify-center">
              <ShieldIcon size={18} className="text-white" />
            </div>
            Korvex
          </a>

          {/* Tagline */}
          <p className="text-gray-500 mb-8">
            Global protection for every server.
          </p>

          {/* Links */}
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            <a
              href={DASHBOARD_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
            >
              <BookIcon size={16} />
              Dashboard
            </a>
            <a
              href="#faq"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              Support
            </a>
            <a
              href="https://discord.com/oauth2/authorize?client_id=1474463953886122167&permissions=4504976164457700&integration_type=0&scope=bot"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
            >
              <DiscordIcon size={16} />
              Invite Bot
            </a>
            <a
              href="#"
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              Privacy Policy
            </a>
          </div>

          {/* Copyright */}
          <p className="text-xs text-gray-600">
            © {new Date().getFullYear()} Korvex. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
