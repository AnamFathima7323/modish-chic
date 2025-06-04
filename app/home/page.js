"use client";

import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";

export default function HomePage() {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero-image.jpeg"
          alt="Elegant Modest Fashion"
          fill
          className="object-cover w-full h-full"
          priority
        />
      </div>

      {/* Optional overlay tint (darker helps text pop) */}
      <div className="absolute inset-0 bg-black bg-opacity-30 z-10" />
    /* <div
        className="absolute inset-0 z-10"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }}
    /> */
      {/* Content */}
      <div className="absolute inset-0 z-20 flex flex-col">
        {/* Header */}
        <Header />

        {/* Hero Text + Button */}
        <div className="flex flex-col items-center justify-center text-center text-white mt-20 px-4 flex-grow">
          <h1 className="text-4xl sm:text-5xl font-bold drop-shadow-md mb-4">
            Your Personal AI-Powered Modest Fashion Assistant
          </h1>
          <p className="text-lg sm:text-xl drop-shadow-sm mb-8 max-w-2xl">
            Get personalized outfit, accessory, and styling suggestions that celebrate your unique style and culture.
          </p>

          <Link href="/survey">
            <button className="bg-pink-500 hover:bg-pink-600 transition-all duration-300 text-white font-semibold text-lg sm:text-xl px-6 py-3 rounded-full shadow-lg animate-bounce hover:animate-none">
              🎀 Take the Style Quiz!
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
