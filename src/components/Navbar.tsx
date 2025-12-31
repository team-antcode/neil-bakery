'use client';

import { useState } from 'react';
import { NAV_ITEMS } from '@/lib/constants';
import { scrollToSection } from '@/lib/utils';
import Image from 'next/image';
import { FaInstagram } from 'react-icons/fa';
import { FaFacebookSquare } from 'react-icons/fa';
import { FaTiktok } from 'react-icons/fa6';
import { Facebook, Instagram, Menu, X } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const router = useRouter();
  const pathname = usePathname();

  const handleNavClick = (sectionId: string) => {
    // If we're not on the homepage, navigate there first
    if (pathname !== '/') {
      router.push(`/#${sectionId}`);
    } else {
      scrollToSection(sectionId);
    }
    setActiveSection(sectionId);
    setIsMenuOpen(false);
  };

  const handleLogoClick = () => {
    // Navigate to homepage
    router.push('/');
    setActiveSection('home');
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-2 sm:top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] sm:w-[90%] md:w-[85%] lg:w-[80%]">
      <div className="bg-[#3b3f3f] rounded-full px-3 sm:px-4 md:px-6 py-2 sm:py-3 flex items-center justify-between shadow-lg border border-gray-500">
        {/* Logo & Brand */}
        <div
          className="flex items-center space-x-2 sm:space-x-3 cursor-pointer group"
          onClick={handleLogoClick}
        >
          <div className="relative">
            <Image
              src="/logo.png"
              alt="Company Logo"
              width={40}
              height={40}
              className="rounded-full w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 transition-transform group-hover:scale-110 duration-300 ring-2 ring-[#e98d1a]/20"
            />
          </div>
          <span className="text-white font-bold tracking-tight text-base sm:text-lg md:text-xl">
            Neil Bakery
          </span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-2 xl:space-x-4">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className="relative px-4 py-2 text-base  transition-all duration-300 rounded-lg text-white hover:text-[#e98d1a] active:text-[#e98d1a] cursor-pointer"
            >
              {item.name}
            </button>
          ))}
        </div>

        {/* Social Links */}
        <div className="hidden lg:flex items-center gap-2">
          <a
            href="https://www.facebook.com/share/1CrJrfdCLF/"
            target="_blank"
            rel="noopener noreferrer"
            className="group p-2 bg-white/5 hover:bg-linear-to-r hover:from-[#e98d1a] hover:to-[#d17a0f] active:bg-linear-to-r active:from-[#e98d1a] active:to-[#d17a0f] rounded-lg border border-white/10 hover:border-transparent active:border-transparent transition-all duration-300 hover:scale-110 active:scale-110"
          >
            <Facebook className="w-4 h-4 text-gray-400 group-hover:text-white group-active:text-white transition-colors" />
          </a>
          <a
            href="https://www.instagram.com/neil.bakery?igsh=MTU5OTh1dGd4cnI2eg=="
            target="_blank"
            rel="noopener noreferrer"
            className="group p-2 bg-white/5 hover:bg-linear-to-r hover:from-[#e98d1a] hover:to-[#d17a0f] active:bg-linear-to-r active:from-[#e98d1a] active:to-[#d17a0f] rounded-lg border border-white/10 hover:border-transparent active:border-transparent transition-all duration-300 hover:scale-110 active:scale-110"
          >
            <Instagram className="w-4 h-4 text-gray-400 group-hover:text-white group-active:text-white transition-colors" />
          </a>
          <a
            href="https://www.tiktok.com/@neil.bakery?_r=1&_t=ZS-92fo6yS6fib"
            target="_blank"
            rel="noopener noreferrer"
            className="group p-2 bg-white/5 hover:bg-linear-to-r hover:from-[#e98d1a] hover:to-[#d17a0f] active:bg-linear-to-r active:from-[#e98d1a] active:to-[#d17a0f] rounded-lg border border-white/10 hover:border-transparent active:border-transparent transition-all duration-300 hover:scale-110 active:scale-110"
          >
            <FaTiktok className="w-4 h-4 text-gray-400 group-hover:text-white group-active:text-white transition-colors" />
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden p-2 text-white hover:text-[#e98d1a] active:text-[#e98d1a] transition-all duration-300 cursor-pointer"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-[#3b3f3f] mt-2 rounded-2xl py-4 px-3 shadow-2xl border border-gray-500 animate-slide-down">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className="block w-full text-left py-3 px-4 text-base font-semibold rounded-lg transition-all duration-300 text-white hover:text-[#e98d1a] active:text-[#e98d1a] active:bg-white/5 cursor-pointer"
            >
              {item.name}
            </button>
          ))}

          <div className="flex items-center justify-center space-x-4 mt-4 pt-4 border-t border-gray-600">
            <a
              href="https://www.instagram.com/neil.bakery?igsh=MTU5OTh1dGd4cnI2eg=="
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-white hover:text-[#e98d1a] active:text-[#e98d1a] transition-all duration-300"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href="https://www.facebook.com/share/1CrJrfdCLF/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-white hover:text-[#e98d1a] active:text-[#e98d1a] transition-all duration-300"
            >
              <Facebook className="w-5 h-5" />
            </a>
            <a
              href="https://tiktok.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-white hover:text-[#e98d1a] active:text-[#e98d1a] transition-all duration-300"
            >
              <FaTiktok className="w-5 h-5" />
            </a>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes slide-down {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slide-down {
          animation: slide-down 0.3s ease-out;
        }
      `}</style>
    </nav>
  );
}
