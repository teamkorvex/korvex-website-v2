import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { DiscordIcon, BookIcon, MenuIcon, XIcon, ShieldIcon } from '@/components/icons/OrbIcons';

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const DASHBOARD_URL = 'https://discord.com/oauth2/authorize?client_id=1478785957569233028&response_type=code&redirect_uri=https%3A%2F%2Fwww.korvex.xyz%2Fdashboard&scope=identify+email';

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0f1117]/95 backdrop-blur-md border-b border-white/5'
          : 'bg-transparent'
      }`}
    >
      <div className="w-full px-6 lg:px-12">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2 font-semibold text-lg text-white hover:text-[#5865F2] transition-colors"
          >
            <div className="w-8 h-8 rounded-lg bg-[#5865F2] flex items-center justify-center">
              <ShieldIcon size={18} className="text-white" />
            </div>
            Korvex
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection('features')}
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection('how-it-works')}
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              How it Works
            </button>
            <button
              onClick={() => scrollToSection('comparison')}
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              Comparison
            </button>
            <button
              onClick={() => scrollToSection('faq')}
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              FAQ
            </button>
          </div>

          {/* Right Side Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Button
              onClick={() => window.open(DASHBOARD_URL, '_blank')}
              variant="outline"
              className="border-white/20 bg-white/5 text-white hover:bg-white/10 text-sm px-4 py-2 rounded-lg flex items-center gap-2 transition-all"
            >
              <BookIcon size={16} />
              Dashboard
            </Button>
            <Button
              onClick={() => window.open('https://discord.com/oauth2/authorize?client_id=1474463953886122167&permissions=4504976164457700&integration_type=0&scope=bot', '_blank')}
              className="bg-[#5865F2] hover:bg-[#4752C4] text-white text-sm px-4 py-2 rounded-lg flex items-center gap-2 transition-all"
            >
              <DiscordIcon size={16} />
              Add to Discord
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-white p-2"
          >
            {isMobileMenuOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#0f1117]/98 backdrop-blur-md border-b border-white/5">
          <div className="px-6 py-4 space-y-4">
            <button
              onClick={() => scrollToSection('features')}
              className="block w-full text-left text-gray-400 hover:text-white transition-colors py-2"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection('how-it-works')}
              className="block w-full text-left text-gray-400 hover:text-white transition-colors py-2"
            >
              How it Works
            </button>
            <button
              onClick={() => scrollToSection('comparison')}
              className="block w-full text-left text-gray-400 hover:text-white transition-colors py-2"
            >
              Comparison
            </button>
            <button
              onClick={() => scrollToSection('faq')}
              className="block w-full text-left text-gray-400 hover:text-white transition-colors py-2"
            >
              FAQ
            </button>
            <div className="pt-4 border-t border-white/10 space-y-3">
              <Button
                onClick={() => window.open(DASHBOARD_URL, '_blank')}
                variant="outline"
                className="w-full border-white/20 bg-white/5 text-white hover:bg-white/10"
              >
                <BookIcon size={16} className="mr-2" />
                Dashboard
              </Button>
              <Button
                onClick={() => window.open('https://discord.com/oauth2/authorize?client_id=1474463953886122167&permissions=4504976164457700&integration_type=0&scope=bot', '_blank')}
                className="w-full bg-[#5865F2] hover:bg-[#4752C4] text-white"
              >
                <DiscordIcon size={16} className="mr-2" />
                Add to Discord
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
