import Image from 'next/image';
import { COMPANY_INFO, NAV_ITEMS } from '@/lib/constants';
import { MapPin, Phone, Mail, Facebook, Instagram, ArrowRight } from 'lucide-react';
import { FaTiktok } from 'react-icons/fa6';

const QUICK_LINKS = NAV_ITEMS.filter((item) => item.id !== 'home');

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-linear-to-b from-gray-900 via-gray-950 to-black text-white py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
          {/* About Section with Logo */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="relative">
                <Image
                  src="/logo.png"
                  alt="Neil Bakery Logo"
                  width={48}
                  height={48}
                  className="rounded-full ring-2 ring-[#e98d1a]/20 hover:ring-[#e98d1a]/40 transition-all duration-300"
                />
              </div>
              <h3 className="text-xl font-bold text-transparent bg-clip-text bg-linear-to-rrom-[#e98d1a] to-[#f5a623]">
                {COMPANY_INFO.name}
              </h3>
            </div>
            <p className="text-base text-gray-400 leading-relaxed mb-4">
              {COMPANY_INFO.description}
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#e98d1a]/10 rounded-full">
              <span className="text-sm text-[#e98d1a] font-semibold">Fresh Daily Since 1990</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-3">
              {QUICK_LINKS.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className="group flex items-center gap-2 text-base text-gray-400 hover:text-[#e98d1a] active:text-[#e98d1a] transition-all duration-300"
                  >
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 group-active:opacity-100 -ml-5 group-hover:ml-0 group-active:ml-0 transition-all duration-300" />
                    <span>{item.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Product Categories */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-white">Our Products</h3>
            <ul className="space-y-3">
              <li>
                <a href="#products" className="group flex items-center gap-2 text-base text-gray-400 hover:text-[#e98d1a] active:text-[#e98d1a] transition-all duration-300">
                  <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 group-active:opacity-100 -ml-5 group-hover:ml-0 group-active:ml-0 transition-all duration-300" />
                  <span>Breads</span>
                </a>
              </li>
              <li>
                <a href="#products" className="group flex items-center gap-2 text-base text-gray-400 hover:text-[#e98d1a] active:text-[#e98d1a] transition-all duration-300">
                  <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 group-active:opacity-100 -ml-5 group-hover:ml-0 group-active:ml-0 transition-all duration-300" />
                  <span>Pastries</span>
                </a>
              </li>
              <li>
                <a href="#products" className="group flex items-center gap-2 text-base text-gray-400 hover:text-[#e98d1a] active:text-[#e98d1a] transition-all duration-300">
                  <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 group-active:opacity-100 -ml-5 group-hover:ml-0 group-active:ml-0 transition-all duration-300" />
                  <span>Cakes</span>
                </a>
              </li>
              <li>
                <a href="#products" className="group flex items-center gap-2 text-base text-gray-400 hover:text-[#e98d1a] active:text-[#e98d1a] transition-all duration-300">
                  <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 group-active:opacity-100 -ml-5 group-hover:ml-0 group-active:ml-0 transition-all duration-300" />
                  <span>Sweets</span>
                </a>
              </li>
              <li>
                <a href="#products" className="group flex items-center gap-2 text-base text-gray-400 hover:text-[#e98d1a] active:text-[#e98d1a] transition-all duration-300">
                  <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 group-active:opacity-100 -ml-5 group-hover:ml-0 group-active:ml-0 transition-all duration-300" />
                  <span>Drinks</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-white">Get In Touch</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-base text-gray-400">
                <MapPin className="w-4 h-4 text-[#e98d1a] mt-0.5 shrink-0" />
                <span className="leading-relaxed">{COMPANY_INFO.address.split(',')[0]}</span>
              </li>
              <li className="flex items-center gap-3 text-base">
                <Phone className="w-4 h-4 text-[#e98d1a] shrink-0" />
                <a href={`tel:${COMPANY_INFO.phone}`} className="text-gray-400 hover:text-[#e98d1a] active:text-[#e98d1a] transition-colors">
                  {COMPANY_INFO.phone}
                </a>
              </li>
              <li className="flex items-center gap-3 text-base">
                <Mail className="w-4 h-4 text-[#e98d1a] shrink-0" />
                <a href={`mailto:${COMPANY_INFO.email}`} className="text-gray-400 hover:text-[#e98d1a] active:text-[#e98d1a] transition-colors break-all">
                  {COMPANY_INFO.email}
                </a>
              </li>
            </ul>

            {/* Social Links */}
            <div className="flex gap-3 mt-6">
              <a
                href="https://www.facebook.com/share/1CrJrfdCLF/"
                target="_blank"
                rel="noopener noreferrer"
                className="group p-3 bg-white/5 hover:bg-linear-to-r hover:from-[#e98d1a] hover:to-[#d17a0f] active:bg-linear-to-r active:from-[#e98d1a] active:to-[#d17a0f] rounded-xl border border-white/10 hover:border-transparent active:border-transparent transition-all duration-300 hover:scale-110 active:scale-110"
              >
                <Facebook className="w-5 h-5 text-gray-400 group-hover:text-white group-active:text-white transition-colors" />
              </a>
              <a
                href="https://www.instagram.com/neil.bakery?igsh=MTU5OTh1dGd4cnI2eg=="
                target="_blank"
                rel="noopener noreferrer"
                className="group p-3 bg-white/5 hover:bg-linear-to-r hover:from-[#e98d1a] hover:to-[#d17a0f] active:bg-linear-to-r active:from-[#e98d1a] active:to-[#d17a0f] rounded-xl border border-white/10 hover:border-transparent active:border-transparent transition-all duration-300 hover:scale-110 active:scale-110"
              >
                <Instagram className="w-5 h-5 text-gray-400 group-hover:text-white group-active:text-white transition-colors" />
              </a>
              <a
                href="https://www.tiktok.com/@neil.bakery?_r=1&_t=ZS-92fo6yS6fib"
                target="_blank"
                rel="noopener noreferrer"
                className="group p-3 bg-white/5 hover:bg-linear-to-r hover:from-[#e98d1a] hover:to-[#d17a0f] active:bg-linear-to-r active:from-[#e98d1a] active:to-[#d17a0f] rounded-xl border border-white/10 hover:border-transparent active:border-transparent transition-all duration-300 hover:scale-110 active:scale-110"
              >
                <FaTiktok className="w-5 h-5 text-gray-400 group-hover:text-white group-active:text-white transition-colors" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">
            Neil Bakery | Moratuwa, Egodauyana, Korelawella | St.Annes Lane Katukurunda, Moratuwa, Sri Lanka<br />
            © {currentYear} {COMPANY_INFO.name}. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-gray-500">
            <a href="#" className="hover:text-[#e98d1a] active:text-[#e98d1a] transition-colors">Privacy Policy</a>
            <span className="text-gray-700">•</span>
            <a href="#" className="hover:text-[#e98d1a] active:text-[#e98d1a] transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}