// app/page.jsx
"use client";

import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";

export default function HomePage() {
  return (
    // Main container for the entire page content.
    // min-h-screen ensures it takes at least full screen height
    // font-sans is your default body font, text-navy-charcoal for default text color
    <div className="min-h-screen font-sans text-navy-charcoal bg-butter-yellow/5">
      {/* Header component, already handles fixed position and scroll-based effects */}
      <Header />

      {/* --- Hero Section (Full viewport height, with background image) --- */}
      {/* pt-24 to push content below the fixed header */}
      <section className="relative h-screen flex items-center justify-center text-center pt-24 pb-12">
        {/* Background Image Container */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/inspiring_image.jpg" // Make sure this path is correct
            alt="Elegant Modest Fashion"
            fill
            className="object-cover w-full h-full"
            priority // Prioritize loading for LCP
          />
        </div>

        {/* Optional overlay tint */}
        <div className="absolute inset-0 bg-black bg-opacity-40 z-10" />

        {/* Hero Content */}
        <div className="relative z-20 text-white max-w-4xl mx-auto px-4">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold drop-shadow-md mb-6 leading-tight">
            Your Personal AI-Powered Modest Fashion Assistant
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl drop-shadow-sm mb-10 leading-relaxed">
            Unleash your unique style with personalized outfit, accessory, and
            styling suggestions that truly celebrate your identity and values.
          </p>

          <Link href="/survey">
            <button className="bg-pastel-pink hover:bg-deep-pink transition-all duration-300
                               text-navy-charcoal hover:text-white font-serif font-semibold
                               text-lg sm:text-xl px-8 py-4 rounded-full shadow-lg
                               transform hover:scale-105 active:scale-95 animate-bounce-once">
              🎀 Discover Your Style Now!
            </button>
          </Link>
        </div>
      </section>

      {/* --- Section 2: The Modish Chic Difference --- */}
      <section className="py-16 px-4 sm:px-8 lg:px-16 max-w-6xl mx-auto bg-white rounded-2xl shadow-xl mt-12 border border-pastel-lavender/50">
        <h2 className="text-4xl font-serif font-bold text-deep-pink mb-8 text-center">
          Why Modish Chic? It's More Than Just Fashion 🌸
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="p-6 rounded-xl bg-ice-blue/20 shadow-md">
            <span className="text-5xl mb-4 block">✨</span>
            <h3 className="text-2xl font-serif font-semibold text-deep-lavender mb-2">Personalized Just For You</h3>
            <p className="text-lg">
              Our AI understands your unique taste, body type, and cultural needs to deliver perfectly tailored recommendations.
            </p>
          </div>
          <div className="p-6 rounded-xl bg-butter-yellow/20 shadow-md">
            <span className="text-5xl mb-4 block">💖</span>
            <h3 className="text-2xl font-serif font-semibold text-deep-lavender mb-2">Effortless Style Discovery</h3>
            <p className="text-lg">
              No more endless scrolling. Find cohesive outfits, perfect accessories, and styling tips in moments.
            </p>
          </div>
          <div className="p-6 rounded-xl bg-pastel-pink/20 shadow-md">
            <span className="text-5xl mb-4 block">🌱</span>
            <h3 className="text-2xl font-serif font-semibold text-deep-lavender mb-2">Ethical & Trend-Forward</h3>
            <p className="text-lg">
              Stay ahead with the latest modest trends while discovering brands committed to ethical and sustainable practices.
            </p>
          </div>
        </div>
      </section>

      {/* --- Section 3: How It Works (Simplified Flow) --- */}
      <section className="py-16 px-4 sm:px-8 lg:px-16 max-w-6xl mx-auto mt-12">
        <h2 className="text-4xl font-serif font-bold text-deep-pink mb-10 text-center">
          Your Journey to Effortless Elegance 🌟
        </h2>
        <div className="relative flex flex-col md:flex-row items-center justify-between text-center md:text-left gap-12 md:gap-8">
          {/* Connecting lines for desktop, just for visual flair */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full -translate-y-1/2">
            <div className="h-1 bg-deep-lavender/30 rounded-full w-full"></div>
            <div className="flex justify-between w-full relative -top-1">
              <span className="w-4 h-4 bg-deep-lavender rounded-full block"></span>
              <span className="w-4 h-4 bg-deep-lavender rounded-full block"></span>
              <span className="w-4 h-4 bg-deep-lavender rounded-full block"></span>
            </div>
          </div>

          <div className="flex flex-col items-center z-10 bg-white p-6 rounded-2xl shadow-lg border border-butter-yellow/50 w-full md:w-1/3">
            <span className="text-6xl mb-4">📝</span>
            <h3 className="text-2xl font-serif font-semibold text-navy-charcoal mb-2">1. Take the Style Quiz</h3>
            <p className="text-lg">
              Share your preferences, body type, and occasions. The more you tell us, the better!
            </p>
          </div>

          <div className="flex flex-col items-center z-10 bg-white p-6 rounded-2xl shadow-lg border border-pastel-pink/50 w-full md:w-1/3">
            <span className="text-6xl mb-4">🧠</span>
            <h3 className="text-2xl font-serif font-semibold text-navy-charcoal mb-2">2. AI Works Its Magic</h3>
            <p className="text-lg">
              Our intelligent algorithm processes your unique profile to generate perfect outfit ideas.
            </p>
          </div>

          <div className="flex flex-col items-center z-10 bg-white p-6 rounded-2xl shadow-lg border border-ice-blue/50 w-full md:w-1/3">
            <span className="text-6xl mb-4">👗</span>
            <h3 className="text-2xl font-serif font-semibold text-navy-charcoal mb-2">3. Discover Your Next Look</h3>
            <p className="text-lg">
              Explore personalized outfits, accessories, and styling tips tailored just for you!
            </p>
          </div>
        </div>
      </section>

      {/* --- Section 4: Join Our Community / Final CTA --- */}
      <section className="py-16 px-4 sm:px-8 lg:px-16 max-w-6xl mx-auto mt-12 text-center bg-deep-lavender/10 rounded-2xl shadow-xl border border-deep-lavender/50">
        <h2 className="text-4xl font-serif font-bold text-deep-pink mb-6">
          Ready to Embrace Your Modish Chic Self? 💖
        </h2>
        <p className="text-xl text-navy-charcoal mb-10 max-w-3xl mx-auto leading-relaxed">
          Join our growing community and redefine modest fashion with confidence, creativity, and cutting-edge AI.
        </p>
        <Link href="/survey">
          <button className="bg-deep-pink hover:bg-pastel-pink transition-all duration-300
                             text-white hover:text-navy-charcoal font-serif font-semibold
                             text-xl px-8 py-4 rounded-full shadow-lg
                             transform hover:scale-105 active:scale-95 animate-pulse-once">
            Unleash My Style! ✨
          </button>
        </Link>
      </section>

      {/* --- Footer (Consider making this a separate component later) --- */}
      <footer className="w-full bg-navy-charcoal text-white text-center p-6 mt-12 font-sans">
        © {new Date().getFullYear()} Modish Chic. All rights reserved.
      </footer>
    </div>
  );
}