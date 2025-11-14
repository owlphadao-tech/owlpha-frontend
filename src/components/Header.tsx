"use client";

// We now import Image from 'next/image' and useEffect/useState from React
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion'; // 👈 THIS IS THE FIX

// Your nav links (I've added Home)
const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Ecosystem', href: '/ecosystem' },
  { name: 'Community', href: '/community' },
  { name: 'Blog', href: '/blog' },
  { name: 'Roadmap', href: '/roadmap' },
];

export default function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // --- NEW: State to track scrolling ---
  const [scrolled, setScrolled] = useState(false);

  // --- NEW: Effect to listen for scroll events ---
  useEffect(() => {
    const handleScroll = () => {
      // Set 'scrolled' to true if user scrolls more than 50px
      setScrolled(window.scrollY > 50);
    };

    // Add the event listener when the component mounts
    window.addEventListener('scroll', handleScroll);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); // Empty array means this effect runs once on mount

  return (
    <header
      // --- NEW: Dynamic classes for the animation ---
      // We use 'sticky' to keep it at the top
      // 'transition-all' makes the changes smooth
      // When 'scrolled' is true, we change padding (py) and add a background
      className={`
        sticky top-0 z-50 w-full transition-all duration-300 ease-in-out
        ${scrolled
          ? 'py-3 bg-dark/80 backdrop-blur-sm shadow-lg'
          : 'py-6 bg-transparent'
        }
      `}
    >
      <nav className="container mx-auto flex justify-between items-center px-2 sm:px-4 py-2 sm:py-0">
        
        {/* --- NEW: Responsive Image Logo --- */}
        <Link href="/" className="flex items-center">
          <div className="relative w-32 sm:w-40 md:w-44 lg:w-48 aspect-[4/1] max-w-[200px]">
            <Image
              src="/logo.png" // Loads from 'public/logo.png'
              alt="OwlphaDAO Logo"
              fill
              className="object-contain"
              sizes="(max-width: 640px) 128px, (max-width: 768px) 160px, (max-width: 1024px) 176px, 192px"
              priority
            />
          </div>
        </Link>

        {/* --- Desktop Navigation --- */}
        <div className="hidden md:flex gap-8 items-center">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`
                  text-lg font-medium transition-colors
                  ${isActive
                    ? 'text-primary'
                    : 'text-light/70 hover:text-light'
                  }
                `}
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        {/* --- Mobile Menu Button --- */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* --- Mobile Menu Drawer --- */}
      {/* This will slide in from the top */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={isOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: -50 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        className={`
          md:hidden absolute top-full left-0 w-full bg-dark/95 backdrop-blur-sm shadow-lg
          ${isOpen ? 'block' : 'hidden'}
        `}
      >
        <div className="flex flex-col items-center px-4 pt-4 pb-8 gap-6">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)} // Close menu on click
                className={`
                  text-2xl font-medium transition-colors
                  ${isActive
                    ? 'text-primary'
                    : 'text-light/70 hover:text-light'
                  }
                `}
              >
                {link.name}
              </Link>
            );
          })}
        </div>
      </motion.div>
    </header>
  );
}