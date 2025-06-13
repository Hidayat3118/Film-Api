'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HiMenu, HiX } from 'react-icons/hi';
import { FiSearch } from 'react-icons/fi';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname(); 

  // Helper untuk menentukan apakah link sedang aktif
  const isActive = (path) => pathname === path;

  const linkClass = (path) =>
    `transition-colors ${isActive(path) ? 'text-red-600 font-semibold' : 'text-gray-700 hover:text-red-600'}`;

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 right-0 z-50 font-medium duration-300">
      <div className="container mx-auto">
        <div className="flex justify-between h-20 items-center px-4 md:px-0">
          {/* Logo */}
          <div className="text-2xl font-bold text-red-500 tracking-wide">
            <Link href="/">MovieApp</Link>
          </div>

          {/* Menu Desktop */}
          <div className="hidden md:flex space-x-8 items-center">
            <Link href="/" className={linkClass('/')}>Popular</Link>
            <Link href="/upcoming" className={linkClass('/upcoming')}>Upcoming</Link>
            <Link href="/topRated" className={linkClass('/topRated')}>Top Rated</Link>

            {/* Search Bar */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search movies..."
                className="pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:ring-2 focus:ring-red-400 focus:outline-none transition w-64"
              />
              <FiSearch className="absolute left-3 top-2.5 text-gray-500" size={18} />
            </div>
          </div>

          {/* Menu Button Mobile */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700 focus:outline-none">
              {isOpen ? <HiX size={26} /> : <HiMenu size={26} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-4 pt-2 pb-4 space-y-4  border-t border-gray-200 grid ">
          <Link href="/" className={linkClass('/')}>Popular</Link>
          <Link href="/upcoming" className={linkClass('/upcoming')}>Upcoming</Link>
          <Link href="/top-rated" className={linkClass('/top-rated')}>Top Rated</Link>

          {/* Search Bar Mobile */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search movies..."
              className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:ring-2 focus:ring-red-400 focus:outline-none transition"
            />
            <FiSearch className="absolute left-3 top-2.5 text-gray-500" size={18} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
