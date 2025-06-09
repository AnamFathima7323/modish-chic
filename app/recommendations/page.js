"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Image from "next/image";
import { outfits } from "@/data/recommendationData";

export default function RecommendationsPage() {
  const [surveyAnswers, setSurveyAnswers] = useState(null);
  const [recommendedOutfits, setRecommendedOutfits] = useState([]);
  const [loading, setLoading] = useState(true);

  const generateRecommendations = (answers, allOutfits) => {
    if (!answers || Object.keys(answers).length === 0) {
      return allOutfits.slice(0, 4);
    }

    let filtered = [...allOutfits];

    if (answers.styleVibe && answers.styleVibe.length > 0) {
      filtered = filtered.filter(outfit =>
        answers.styleVibe.some(vibe => outfit.style.includes(vibe))
      );
    }
    if (answers.climate && answers.climate.length > 0) {
      filtered = filtered.filter(outfit =>
        answers.climate.some(climate => outfit.climate.includes(climate))
      );
    }
    if (answers.usualWear && answers.usualWear.length > 0) {
      filtered = filtered.filter(outfit =>
        answers.usualWear.some(wear => outfit.garments.includes(wear))
      );
    }
    if (answers.colors && answers.colors.length > 0) {
      filtered = filtered.filter(outfit =>
        answers.colors.some(color => outfit.colors.includes(color))
      );
    }
    if (answers.occasions && answers.occasions.length > 0) {
      filtered = filtered.filter(outfit =>
        answers.occasions.some(occasion => outfit.occasions.includes(occasion))
      );
    }

    if (filtered.length === 0) {
      return allOutfits.slice(0, 4);
    }

    return filtered;
  };

  useEffect(() => {
    const savedAnswers = localStorage.getItem("modishSurveyAnswers");
    if (savedAnswers) {
      const answers = JSON.parse(savedAnswers);
      setSurveyAnswers(answers);
      const recommendations = generateRecommendations(answers, outfits);
      setRecommendedOutfits(recommendations);
    } else {
      setRecommendedOutfits(outfits.slice(0, 4));
    }
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-butter-yellow/5 flex items-center justify-center font-sans text-navy-charcoal">
        <Header />
        <p className="text-2xl font-serif text-deep-pink">Generating your personalized styles... ✨</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-butter-yellow/5 font-sans text-navy-charcoal flex flex-col">
      <Header />

      <main className="flex-grow pt-24 pb-12 px-4 sm:px-8 lg:px-16 max-w-6xl mx-auto w-full">
        <div className="bg-white p-6 rounded-2xl shadow-xl border border-pastel-pink/50 text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-deep-pink mb-3">
            Your Personalized Style Recommendations! 🎉
          </h1>
          <p className="text-lg text-deep-lavender mb-4 max-w-2xl mx-auto">
            Based on your unique preferences, here are some outfits we think you'll adore.
          </p>
        </div>

        {recommendedOutfits.length > 0 ? (
          // ***** CRUCIAL CHANGE: THIS DIV IS NOW A FLEX CONTAINER FOR THE CARDS *****
          <div className="flex flex-wrap justify-center gap-8 mx-auto w-full max-w-xs sm:max-w-md md:max-w-xl lg:max-w-3xl">
            {recommendedOutfits.map((outfit) => (
              <div
                key={outfit.id}
                // ***** ADDED MAX-WIDTHS TO THE INDIVIDUAL CARD DIVS *****
                className="bg-white rounded-2xl shadow-lg border border-butter-yellow/50 overflow-hidden
                           transform transition-transform duration-300 hover:scale-[1.02]
                           w-full sm:max-w-[calc(50%-1rem)] md:max-w-[calc(33.33%-1rem)] lg:max-w-[calc(33.33%-1rem)]" // Responsive widths for cards
              >
                <div className="relative w-full h-64 bg-gray-200">
                  <Image
                    src={outfit.imageUrl}
                    alt={outfit.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={false}
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-serif font-bold text-deep-pink mb-2">
                    {outfit.name}
                  </h3>
                  <p className="text-navy-charcoal text-base mb-4">
                    {outfit.description}
                  </p>
                  <div className="flex flex-wrap gap-2 text-sm text-gray-600 mb-4">
                    {outfit.style && outfit.style.map(tag => <span key={`style-${tag}`} className="bg-pastel-pink/20 px-3 py-1 rounded-full text-deep-lavender">#{tag}</span>)}
                    {outfit.colors && outfit.colors.map(tag => <span key={`color-${tag}`} className="bg-ice-blue/20 px-3 py-1 rounded-full text-deep-lavender">#{tag}</span>)}
                    {outfit.occasions && outfit.occasions.map(tag => <span key={`occasion-${tag}`} className="bg-butter-yellow/20 px-3 py-1 rounded-full text-deep-lavender">#{tag}</span>)}
                  </div>
                  <div className="flex justify-end space-x-3">
                    <button className="bg-deep-lavender hover:bg-pastel-lavender text-white hover:text-navy-charcoal
                                         font-semibold px-4 py-2 rounded-full transition-colors duration-200 text-sm">
                      ❤️ Save
                    </button>
                    <button className="bg-deep-pink hover:bg-pastel-pink text-white hover:text-navy-charcoal
                                         font-semibold px-4 py-2 rounded-full transition-colors duration-200 text-sm">
                      🛒 Shop Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white p-8 rounded-2xl shadow-xl border border-pastel-lavender/50 text-center">
            <h2 className="text-3xl font-serif font-bold text-deep-lavender mb-4">
              Oops! No specific recommendations found.
            </h2>
            <p className="text-lg text-navy-charcoal mb-6">
              It looks like your unique combination of preferences didn't match our current outfits perfectly.
              Here are some popular picks you might still love!
            </p>
            <button
              onClick={() => (window.location.href = "/survey")}
              className="bg-deep-pink hover:bg-pastel-pink text-white hover:text-navy-charcoal
                         font-serif font-semibold px-6 py-3 rounded-full shadow-md transition-all duration-300"
            >
              Retake Quiz
            </button>
          </div>
        )}
      </main>
    </div>
  );
}