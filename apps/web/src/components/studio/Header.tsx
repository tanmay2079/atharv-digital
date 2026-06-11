'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Camera, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
];

export function Header() {
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = navItems.map((item) => ({
        id: item.href.replace('#', ''),
        el: document.getElementById(item.href.replace('#', '')),
      }));

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section.el) {
          const rect = section.el.getBoundingClientRect();
          if (rect.top <= 150) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/80 backdrop-blur-xl border-b border-gray-200/80 shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <motion.div
            whileHover={{ rotate: 15, scale: 1.1 }}
            className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center"
          >
            <Camera className="text-white w-5 h-5" />
          </motion.div>
          <span className={`font-semibold tracking-tight ${scrolled ? 'text-gray-900' : 'text-white'}`}>
            Atharv Digital Photo Studio
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 h-full">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`h-full flex items-center mt-[2px] text-sm transition-colors ${
                activeSection === item.href.replace('#', '')
                  ? `font-medium border-b-2 border-blue-600 ${scrolled ? 'text-gray-900' : 'text-white'}`
                  : `font-normal border-b-2 border-transparent hover:text-gray-300 ${scrolled ? 'text-gray-500' : 'text-white/70'}`
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Link
            href="/#contact"
            className="bg-blue-600 text-white rounded-full px-4 py-1.5 text-sm font-medium inline-flex items-center gap-1.5 hover:bg-blue-700 transition-colors shadow-md shadow-blue-600/20"
          >
            Book Now
          </Link>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`md:hidden p-2 rounded-lg ${scrolled ? 'text-gray-900' : 'text-white'}`}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-200 overflow-hidden"
          >
            <div className="px-6 py-4 space-y-3">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className={`block text-sm py-2 ${
                    activeSection === item.href.replace('#', '')
                      ? 'text-blue-600 font-medium'
                      : 'text-gray-600'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
