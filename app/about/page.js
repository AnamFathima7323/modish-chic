// app/about/page.jsx (or pages/about.jsx if using Pages Router)
"use client"; // This component needs to be a client component because the Header is client-side

import Image from "next/image"; // For potential future images
import Link from "next/link";
import Header from "@/components/Header"; // Import your Header component

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-butter-yellow/10 font-sans text-navy-charcoal">
      {/* The collapsible Header will automatically work here */}
      <Header />

      {/* --- Page Content Container --- */}
      {/* Added pt-24 to push content below the fixed header */}
      <main className="pt-24 pb-12 px-4 sm:px-8 lg:px-16 max-w-6xl mx-auto">

        {/* --- Hero Section: The Spark Behind Modish Chic --- */}
        <section className="text-center mb-16 mt-8">
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-deep-pink mb-6 leading-tight">
            Meet Your Style Architects: The Modish Chic Story 🎀
          </h1>
          <p className="text-xl md:text-2xl text-deep-lavender max-w-3xl mx-auto mb-8">
            Ever wondered if technology and timeless elegance could truly blend? We did! At Modish Chic, we're not just about clothes; we're about *empowering your unique modest journey* with a touch of magic.
          </p>
          {/* You could add a small, inspiring image here */}
          {/*<div className="relative w-full h-64 md:h-96 rounded-xl overflow-hidden shadow-xl mx-auto max-w-4xl">
            <Image
              src="/images/inspiring_image.jpg"
              alt="Inspiring fashion journey"
              fill
              className="object-cover"
              priority
            />
          </div> */}
        </section>

        {/* --- Our Origin Story: A Dash of Inspiration --- */}
        <section className="mb-16 bg-white p-8 rounded-2xl shadow-xl border border-pastel-pink/50">
          <h2 className="text-4xl font-serif font-bold text-deep-pink mb-6 text-center">
            Where It All Began: Our Vision 💡
          </h2>
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2">
              <p className="text-lg mb-4 leading-relaxed">
                Modish Chic bloomed from a simple, yet powerful idea: **modest fashion deserves personal, thoughtful guidance.** We saw a gap – finding outfits that truly resonate with individual style, body type, and cultural preferences, especially within modest parameters, could be a real challenge.
              </p>
              <p className="text-lg leading-relaxed">
                So, we dreamt of a world where style isn't just about trends, but about **celebrating who you are.** We imagined an intelligent assistant that understands *you* – your mood, your values, your aesthetic – and then effortlessly brings beautiful, confidence-boosting modest looks right to your fingertips. That's the heartbeat of Modish Chic.
              </p>
            </div>
            <div className="md:w-1/2 relative min-h-[250px] md:min-h-[350px] rounded-lg overflow-hidden shadow-lg border border-ice-blue">
                {/* Placeholder for an image depicting inspiration or a design sketch */}
                <Image
                  src="/images/inspiring_image.jpg"
                  alt="Design inspiration"
                  fill
                  className="object-cover"
                  priority
                />
            </div>
          </div>
        </section>

        {/* --- The Modish Chic Magic: How Our AI Works for YOU --- */}
        <section className="mb-16 bg-pastel-lavender/30 p-8 rounded-2xl shadow-lg border border-deep-lavender/50">
          <h2 className="text-4xl font-serif font-bold text-deep-pink mb-8 text-center">
            Your Personal Stylist, Powered by AI ✨
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col items-start bg-white p-6 rounded-xl shadow-md border border-butter-yellow/50">
              <h3 className="text-2xl font-serif font-semibold text-navy-charcoal mb-3">
                1. Beyond the Basics 👗
              </h3>
              <p className="text-lg leading-relaxed">
                Forget generic suggestions! Our AI dives deep into your unique preferences – from your favorite fabrics to your preferred silhouettes and even cultural nuances. It learns with every interaction, getting smarter and more "you" over time.
              </p>
            </div>
            <div className="flex flex-col items-start bg-white p-6 rounded-xl shadow-md border border-ice-blue/50">
              <h3 className="text-2xl font-serif font-semibold text-navy-charcoal mb-3">
                2. Mix, Match, & Master 🤝
              </h3>
              <p className="text-lg leading-relaxed">
                Unlock the full potential of your wardrobe! We don't just suggest new pieces; our AI helps you combine existing items with new finds, creating fresh, stylish looks you'll adore without constant shopping sprees.
              </p>
            </div>
            <div className="flex flex-col items-start bg-white p-6 rounded-xl shadow-md border border-pastel-pink/50">
              <h3 className="text-2xl font-serif font-semibold text-navy-charcoal mb-3">
                3. Curated & Conscious Choices 🌱
              </h3>
              <p className="text-lg leading-relaxed">
                We believe in beauty with integrity. Our platform helps you discover brands that align with ethical sourcing and sustainable practices, ensuring your style choices make a positive impact.
              </p>
            </div>
            <div className="flex flex-col items-start bg-white p-6 rounded-xl shadow-md border border-deep-lavender/50">
              <h3 className="text-2xl font-serif font-semibold text-navy-charcoal mb-3">
                4. Always Evolving for You 🚀
              </h3>
              <p className="text-lg leading-relaxed">
                Fashion is fluid, and so are we! Our AI is constantly updated with the latest modest trends, style insights, and user feedback, ensuring you always have access to cutting-edge, personalized recommendations.
              </p>
            </div>
          </div>
        </section>

        {/* --- Join the Modish Chic Movement --- */}
        <section className="text-center py-12 px-6 bg-deep-pink/10 rounded-2xl shadow-xl border border-deep-pink/50">
          <h2 className="text-4xl font-serif font-bold text-navy-charcoal mb-6">
            Ready to Redefine Your Style? 💖
          </h2>
          <p className="text-xl text-deep-lavender mb-8 max-w-2xl mx-auto">
            Step into a world where fashion meets intelligence, and modesty meets modern elegance. Your perfect outfit is just a click away!
          </p>
          <Link href="/survey">
            <button className="bg-deep-pink hover:bg-pastel-pink transition-all duration-300 text-white font-serif font-semibold text-xl px-8 py-4 rounded-full shadow-lg transform hover:scale-105 active:scale-95 animate-pulse-once">
              Start My Style Journey! ✨
            </button>
          </Link>
        </section>

      </main>
    </div>
  );
}