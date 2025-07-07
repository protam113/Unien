'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, Phone, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/utils/helpers/utils';
import Image from 'next/image';

const navItems = [
  { name: 'Trang Chủ', href: '/' },
  { name: 'Về Chúng tôi', href: '/company' },
  { name: 'Dịch Vụ & Công Nghiệp', href: '/services' },
  { name: 'Bài Viết', href: '/blogs' },
  { name: 'Sản Phẩm', href: '/products' },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const handleMenuClick = () => {
    router.push('/contact');
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-black/60 backdrop-blur-md min-h-[100px]'
          : 'bg-black min-h-[100px]'
      )}
    >
      <div className="container mx-auto px-4 h-full">
        <div className="flex items-center justify-between h-full min-h-[100px]">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="flex items-center">
              <Image src="/logo.svg" alt="Logo" width={50} height={50} />
              <span className="ml-2 text-white font-bold text-xl md:text-2xl lg:text-3xl">
                UNIEN
              </span>
            </div>
          </Link>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white p-2"
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'px-3 py-2 text-sm md:text-base lg:text-lg font-medium text-white hover:text-orange-400 transition-colors relative group',
                  pathname === item.href && 'text-orange-400'
                )}
              >
                {item.name}
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-orange-400 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-out"></span>
                {pathname === item.href && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-orange-400"></span>
                )}
              </Link>
            ))}
          </nav>

          {/* Contact and CTA (Desktop) */}
          <div className="hidden md:flex items-center space-x-4">
            <a
              href="tel:+201001245741"
              className="text-white flex items-center hover:text-orange-400"
            >
              <Phone size={16} className="mr-2" />
              <span>+84 123456789</span>
            </a>
            <Button
              onClick={handleMenuClick}
              className="bg-white text-lg text-black hover:bg-orange-400 hover:text-white"
            >
              Liên hệ
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={cn(
          'fixed inset-0 bg-black z-40 transform transition-transform duration-300 ease-in-out pt-16',
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        {/* Close button for mobile menu - fixed position */}
        <button
          onClick={() => setIsMenuOpen(false)}
          className="absolute top-4 right-4 text-white p-2 z-50"
          aria-label="Close menu"
        >
          <X size={24} />
        </button>

        <div className="container bg-white mx-auto px-4 py-6">
          <nav className="flex flex-col space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'px-3 py-3 text-lg font-medium text-black border-b border-gray-800 hover:text-orange-400',
                  pathname === item.href && 'text-orange-400'
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="mt-8 space-y-4">
            <a
              href="tel:+201001245741"
              className=" flex items-center hover:text-orange-400 py-2"
            >
              <Phone size={16} className="mr-2" />
              <span>+84 123456789</span>
            </a>
            <Button
              onClick={handleMenuClick}
              className="w-full bg-white text-black hover:bg-orange-400 hover:text-white"
            >
              Liên Hệ
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
