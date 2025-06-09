// components/Header.jsx
"use client";

import Link from "next/link";
import { useEffect, useState, useCallback } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { app } from "@/firebase/firebaseConfig";
import { useRouter } from "next/navigation";

export default function Header() {
  const auth = getAuth(app);
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // --- Firebase Authentication Logic ---
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      // Just set the user state.
      // REMOVED: router.push("/login") logic from here.
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, [auth]); // `router` is no longer a dependency here since it's not used for redirection.

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/login");
  };

  const getFirstName = (fullNameOrEmail) => {
    if (!fullNameOrEmail) return "";
    const first = fullNameOrEmail.split(" ")[0];
    return first.includes("@") ? first.split("@")[0] : first;
  };

  // --- Scroll Blending/Collapsing Logic (no changes needed here) ---
  const handleScroll = useCallback(() => {
    const offset = window.scrollY;
    setScrolled(offset > 70);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    // ... rest of your Header JSX code (no changes needed here) ...
    <header
      className={`
        fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out
        flex items-center p-4 md:px-8
        ${scrolled
          ? "bg-pastel-lavender/80 backdrop-blur-sm py-2 shadow-lg"
          : "bg-transparent py-4"
        }
        ${scrolled ? "text-navy-charcoal" : "text-white"}
      `}
    >
      {/* --- Left Section: Navigation Links (Desktop) --- */}
      <nav className="hidden md:flex items-center space-x-6 flex-1 justify-start">
        <Link
          href="/home"
          className={`
            font-serif font-medium hover:text-deep-pink transition-colors duration-200 text-lg
            ${scrolled ? "text-navy-charcoal" : "text-white"}
          `}
        >
          Home
        </Link>
        <Link
          href="/profile"
          className={`
            font-serif font-medium hover:text-deep-pink transition-colors duration-200 text-lg
            ${scrolled ? "text-navy-charcoal" : "text-white"}
          `}
        >
          Profile
        </Link>
        <Link
          href="/about"
          className={`
            font-serif font-medium hover:text-deep-pink transition-colors duration-200 text-lg
            ${scrolled ? "text-navy-charcoal" : "text-white"}
          `}
        >
          About Us
        </Link>
      </nav>

      {/* --- Center Section: Website Name --- */}
      <div
        className={`
          absolute left-1/2 -translate-x-1/2
          font-serif font-bold tracking-wide transition-all duration-300 ease-in-out
          ${scrolled ? "text-deep-pink text-3xl" : "text-white text-4xl"}
          hover:text-pastel-pink
          cursor-pointer whitespace-nowrap
        `}
        style={{
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      >
        <Link href="/home">Modish Chic</Link>
      </div>

      {/* --- Right Section: User Info & Logout (Desktop) --- */}
      <div className="hidden md:flex items-center space-x-4 flex-1 justify-end">
        {user && (
          <>
            <span
              className={`
            font-serif font-medium hover:text-deep-pink transition-colors duration-200 text-lg
            ${scrolled ? "text-navy-charcoal" : "text-white"}
          `}
            >
              Hey {getFirstName(user.displayName || user.email)}!
            </span>
            <Link
            href="/login"
              className={`
            font-serif font-medium hover:text-deep-pink transition-colors duration-200 text-lg
            ${scrolled ? "text-navy-charcoal" : "text-white"}
          `}
            >
              Logout
             </Link>
          </>
        )}
      </div>

      {/* --- Mobile Menu Button --- */}
      <div className="md:hidden flex items-center flex-1 justify-between">
        <nav className="flex items-center space-x-4">
          <Link
            href="/"
            className={`
              font-serif font-medium hover:text-deep-pink transition-colors duration-200
              ${scrolled ? "text-navy-charcoal" : "text-white"}
            `}
          >
            Home
          </Link>
        </nav>

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={`
            p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2
            ${scrolled ? "text-navy-charcoal focus:ring-deep-pink" : "text-white focus:ring-white"}
          `}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* --- Mobile Menu Overlay --- */}
      {isMenuOpen && (
        <div
          className={`
            md:hidden absolute top-full left-0 w-full bg-pastel-lavender/95 backdrop-blur-md shadow-lg py-4
            flex flex-col items-center space-y-4 transition-all duration-300 ease-in-out
          `}
        >
          <Link
            href="/profile"
            className="text-navy-charcoal hover:text-deep-pink text-lg font-serif font-medium"
            onClick={() => setIsMenuOpen(false)}
          >
            Profile
          </Link>
          <Link
            href="/about"
            className="text-navy-charcoal hover:text-deep-pink text-lg font-serif font-medium"
            onClick={() => setIsMenuOpen(false)}
          >
            About Us
          </Link>
          {user && (
            <>
              <span className="text-deep-lavender font-medium text-sm">
                Hey {getFirstName(user.displayName || user.email)}!
              </span>
              <button
                onClick={() => {
                  handleLogout();
                  setIsMenuOpen(false);
                }}
                className="bg-deep-pink text-white px-4 py-1 rounded-full text-sm font-semibold hover:bg-pastel-pink"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </header>
  );
}