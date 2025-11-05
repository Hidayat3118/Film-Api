"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { HiMenu, HiX } from "react-icons/hi";
import { FiSearch } from "react-icons/fi";
import Auth from "./auth";
import { ProfilMenu } from "./profilMenu";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const isActive = (path) => pathname === path;
  const linkClass = (path) =>
    `transition-colors ${
      isActive(path)
        ? "text-red-600 font-semibold"
        : "text-gray-700 hover:text-red-600"
    }`;

  // 🔍 Ambil saran dari TMDB secara realtime
  useEffect(() => {
    if (query.trim() === "") {
      setSuggestions([]);
      return;
    }

    const fetchSuggestions = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&query=${query}`
        );
        const data = await res.json();
        setSuggestions(data.results.slice(0, 6)); // ambil 6 hasil teratas
      } catch (err) {
        console.error("Gagal mengambil data:", err);
      }
    };

    const delayDebounce = setTimeout(fetchSuggestions, 400);
    return () => clearTimeout(delayDebounce);
  }, [query]);

  // 🔎 Saat form disubmit (Enter)
  const serchSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/serch?query=${encodeURIComponent(query)}`);
      setIsOpen(false);
      setSuggestions([]);
    }
  };

  // 🔎 Saat user klik salah satu saran
  const handleSelectSuggestion = (title) => {
    setQuery(title);
    setSuggestions([]);
    router.push(`/serch?query=${encodeURIComponent(title)}`);
  };

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 right-0 z-50 font-medium duration-300">
      <div className="container mx-auto">
        <div className="flex justify-between h-20 items-center px-4 md:px-0">
          {/* Logo */}
          <div className="text-lg md:text-xl lg:text-2xl font-bold text-red-500 tracking-wide">
            <Link href="/">CineVault</Link>
          </div>

          {/* Menu Desktop */}
          <div className="hidden md:flex space-x-8 items-center relative">
            <Link href="/" className={linkClass("/")}>
              Home
            </Link>
            <Link href="/popular" className={linkClass("/popular")}>
              Popular
            </Link>
            <Link href="/upcoming" className={linkClass("/upcoming")}>
              Upcoming
            </Link>
            <Link href="/topRated" className={linkClass("/topRated")}>
              Top Rated
            </Link>

            {/* 🔎 Search Bar Desktop */}
            <div className="relative flex items-center">
              <form onSubmit={serchSubmit}>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search movies..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setTimeout(() => setIsFocused(false), 200)}
                    className="pl-10 pr-4 py-2 relative rounded-full border border-gray-400 focus:ring-2 focus:ring-red-400 focus:outline-none transition w-64 text-gray-600"
                  />
                  <FiSearch
                    className="absolute left-3 top-3.5 text-gray-600"
                    size={18}
                  />
                </div>
              </form>

              {/* 🔽 Dropdown hasil pencarian */}
              {isFocused && suggestions.length > 0 && (
                <ul className="absolute top-12 bg-white border border-gray-200 rounded-lg shadow-lg w-64 max-h-60  z-50">
                  {suggestions.map((movie) => (
                    <li
                      key={movie.id}
                      onMouseDown={(e) => {
                        e.preventDefault(); // cegah blur
                        handleSelectSuggestion(movie.title);
                      }}
                      className="px-4 py-2 flex items-center gap-2 cursor-pointer hover:bg-gray-100"
                    >
                      <FiSearch className="text-gray-400" size={16} />
                      <span className="text-gray-700 truncate">
                        {movie.title}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Login */}
            <Auth />
          </div>

          {/* Menu Mobile */}
          <div className="md:hidden flex gap-3">
            <Auth />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 focus:outline-none"
            >
              {isOpen ? <HiX size={26} /> : <HiMenu size={26} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out ${
          isOpen
            ? "max-h-screen opacity-100 pointer-events-auto"
            : "max-h-0 opacity-0 pointer-events-none"
        }`}
      >
        <div className="relative px-4 pt-2 pb-4 space-y-4 border-t border-gray-200 text-center overflow-visible">
          <div className="grid gap-4">
            <Link href="/" className={linkClass("/")}>
              Home
            </Link>
            <Link href="/popular" className={linkClass("/popular")}>
              Popular
            </Link>
            <Link href="/upcoming" className={linkClass("/upcoming")}>
              Upcoming
            </Link>
            <Link href="/topRated" className={linkClass("/topRated")}>
              Top Rated
            </Link>
          </div>

          {/* 🔎 Search Bar Mobile */}
          <div className="relative flex justify-center">
            <form onSubmit={serchSubmit} className="w-full flex justify-center">
              <div className="relative w-full max-w-xs">
                <input
                  type="text"
                  placeholder="Search movies..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setTimeout(() => setIsFocused(false), 200)}
                  className="pl-10 pr-4 py-2 w-full rounded-full border border-gray-400 focus:ring-2 focus:ring-red-400 focus:outline-none transition text-gray-600"
                />
                <FiSearch
                  className="absolute left-3 top-3.5 text-gray-600"
                  size={18}
                />
              </div>
            </form>

            {/* 🔽 Dropdown hasil pencarian (mobile fix) */}
            {isFocused && suggestions.length > 0 && (
              <ul className="absolute top-12 left-1/2 -translate-x-1/2 bg-white border border-gray-200 rounded-lg shadow-lg w-64 max-h-60 overflow-y-auto z-[9999]">
                {suggestions.map((movie) => (
                  <li
                    key={movie.id}
                    onMouseDown={(e) => {
                      e.preventDefault(); // cegah blur
                      handleSelectSuggestion(movie.title);
                    }}
                    className="px-4 py-2 flex items-center gap-2 cursor-pointer hover:bg-gray-100"
                  >
                    <FiSearch className="text-gray-400" size={16} />
                    <span className="text-gray-700 truncate">
                      {movie.title}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
