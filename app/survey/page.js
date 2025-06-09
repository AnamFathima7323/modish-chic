"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header"; // Make sure this path is correct

// Define your survey steps with details for multi-select, emojis, and descriptions
const surveySteps = [
  {
    id: 1,
    question: "Welcome to Your Modish Chic Style Journey! 🌟",
    description: "Let's discover your unique fashion personality to create looks you'll absolutely adore. This won't take long, we promise it'll be fun!",
    type: "welcome", // Special type for welcome screen
  },
  {
    id: 2,
    question: "What's your modest style vibe? (Choose all that apply) 🎨",
    type: "multi-select",
    field: "styleVibe",
    options: [
      { label: "Elegant & Refined ✨", value: "elegant" },
      { label: "Trendy & Modern 💖", value: "trendy" },
      { label: "Traditional & Cultural 🕌", value: "traditional" },
      { label: "Sporty & Dynamic 👟", value: "sporty" },
      { label: "Minimalist & Chic 🤍", value: "minimalist" },
      { label: "Boho & Free-Spirited 🌻", value: "boho" },
    ],
  },
  {
    id: 3,
    question: "Which climate do you mostly dress for? (Select your usual climate/s) ☀️❄️",
    type: "multi-select",
    field: "climate",
    options: [
      { label: "Hot & Humid 🥵", value: "hot-humid" },
      { label: "Cold & Chilly 🥶", value: "cold" },
      { label: "Mild & Temperate 🌸", value: "mild" },
      { label: "Dry & Arid 🏜️", value: "dry-arid" },
    ],
  },
  {
    id: 4,
    question: "What do you usually wear? (Pick your go-to pieces!) 👗👖",
    type: "multi-select",
    field: "usualWear",
    options: [
      { label: "Abaya/Jilbab", value: "abaya-jilbab" },
      { label: "Hijab with Tunics/Long Blouses", value: "hijab-tunics" },
      { label: "Maxi Dresses/Skirts", value: "maxi-dresses" },
      { label: "Pants & Long Tops", value: "pants-long-tops" },
      { label: "Layered Looks", value: "layered-looks" },
      { label: "Modest Jumpsuits/Co-ords", value: "jumpsuits-co-ords" },
    ],
  },
  {
    id: 5,
    question: "Which colors describe your wardrobe best? (Choose all that speak to you) 🎨🌈",
    type: "multi-select",
    field: "colors",
    options: [
      { label: "Neutrals (Black, White, Beige, Grey) 🤍", value: "neutrals" },
      { label: "Pastels (Soft Pinks, Lavenders, Mints) 💖", value: "pastels" },
      { label: "Bold & Bright (Vibrant Hues) 🧡", value: "bold-bright" },
      { label: "Dark Tones (Navy, Burgundy, Forest Green) 💜", value: "dark-tones" },
      { label: "Earth Tones (Olive, Rust, Brown) 🤎", value: "earth-tones" },
    ],
  },
  {
    id: 6,
    question: "What kind of accessories do you love? (Select your must-haves!) 💍👜",
    type: "multi-select",
    field: "accessories",
    options: [
      { label: "Statement Earrings/Necklaces", value: "statement-jewelry" },
      { label: "Minimal Jewelry (Delicate pieces)", value: "minimal-jewelry" },
      { label: "Scarves (Headscarves, Neck Scarves)", value: "scarves" },
      { label: "Chic Bags (Handbags, Totes)", value: "bags" },
      { label: "Stylish Belts", value: "belts" },
      { label: "Comfortable & Trendy Footwear", value: "footwear" },
    ],
  },
  {
    id: 7,
    question: "Which occasions do you mostly dress for? (Where do you need the most style help?) 🗓️",
    type: "multi-select",
    field: "occasions",
    options: [
      { label: "Everyday Casual ☕", value: "everyday-casual" },
      { label: "Workwear & Professional Settings 🏢", value: "workwear" },
      { label: "Special Events (Parties, Weddings) 🎉", value: "special-events" },
      { label: "Religious Gatherings & Family Events 🕌", value: "religious-gatherings" },
      { label: "Travel & Vacations ✈️", value: "travel" },
      { label: "Outdoor Activities & Errands 🛒", value: "outdoor" },
    ],
  },
];

export default function SurveyPage() {
  const [currentStepIndex, setCurrentStepIndex] = useState(0); // 0-indexed for array
  const [answers, setAnswers] = useState({}); // Use an object to store answers by field name
  const router = useRouter();

  // Load answers from localStorage on mount (if user comes back to survey)
  useEffect(() => {
    const savedAnswers = localStorage.getItem("modishSurveyAnswers");
    if (savedAnswers) {
      setAnswers(JSON.parse(savedAnswers));
    }
  }, []);

  const handleOptionClick = (field, value, type) => {
    setAnswers((prevAnswers) => {
      if (type === "multi-select") {
        const currentSelection = prevAnswers[field] || [];
        const newSelection = currentSelection.includes(value)
          ? currentSelection.filter((item) => item !== value)
          : [...currentSelection, value];
        return { ...prevAnswers, [field]: newSelection };
      } else {
        // For single-select (not currently used in this version but good for future)
        return { ...prevAnswers, [field]: value };
      }
    });
  };

  const currentStep = surveySteps[currentStepIndex];

  const handleNext = () => {
    if (currentStepIndex < surveySteps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    } else {
      // Save to localStorage and go to recommendations page
      localStorage.setItem("modishSurveyAnswers", JSON.stringify(answers));
      router.push("/recommendations"); // <--- CHANGED FROM "/result" TO "/recommendations"
    }
    window.scrollTo({ top: 0, behavior: "smooth" }); // Smooth scroll to top on next step
  };

  const handleBack = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
    window.scrollTo({ top: 0, behavior: "smooth" }); // Smooth scroll to top on back step
  };

  // Determine if the Next button should be enabled (optional: based on current step's selection)
  const isNextEnabled = () => {
    if (currentStep.type === 'welcome') return true; // Always enable for welcome screen
    const currentAnswer = answers[currentStep.field];
    if (currentStep.type === 'multi-select') {
      return currentAnswer && currentAnswer.length > 0; // At least one option selected
    }
    // Add logic for other types if needed (e.g., single-select)
    return true; // Default to true if no specific validation needed
  };

  return (
    <div className="min-h-screen bg-butter-yellow/5 font-sans text-navy-charcoal">
      <Header /> {/* Your existing Header component */}

      <main className="pt-24 pb-12 px-4 sm:px-8 lg:px-16 max-w-4xl mx-auto">
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-pastel-pink/50">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="h-2 bg-gray-200 rounded-full">
              <div
                className="h-full bg-deep-pink rounded-full transition-all duration-500 ease-in-out"
                style={{ width: `${((currentStepIndex + 1) / surveySteps.length) * 100}%` }}
              ></div>
            </div>
            <p className="text-center text-sm text-gray-500 mt-2">
              Step {currentStepIndex + 1} of {surveySteps.length}
            </p>
          </div>

          {/* Welcome Step */}
          {currentStep.type === "welcome" && (
            <div className="text-center">
              <h2 className="text-4xl font-serif font-bold text-deep-pink mb-4 leading-tight">
                {currentStep.question}
              </h2>
              <p className="text-lg text-deep-lavender mb-8 max-w-2xl mx-auto">
                {currentStep.description}
              </p>
              <button
                onClick={handleNext}
                className="bg-deep-pink hover:bg-pastel-pink transition-all duration-300
                           text-white hover:text-navy-charcoal font-serif font-semibold
                           text-xl px-8 py-4 rounded-full shadow-lg transform hover:scale-105 active:scale-95"
              >
                Let's Start! 🚀
              </button>
            </div>
          )}

          {/* Question Steps */}
          {currentStep.type !== "welcome" && (
            <>
              <h2 className="text-3xl font-serif font-bold text-deep-pink mb-6 text-center">
                {currentStep.question}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {currentStep.options.map((option) => (
                  <button
                    key={option.value}
                    onClick={() =>
                      handleOptionClick(currentStep.field, option.value, currentStep.type)
                    }
                    className={`
                      p-4 rounded-xl cursor-pointer transition-all duration-200 border-2
                      ${(answers[currentStep.field] || []).includes(option.value)
                        ? "bg-pastel-pink border-deep-pink text-navy-charcoal shadow-md scale-105"
                        : "bg-ice-blue/20 border-ice-blue hover:border-deep-pink hover:shadow-sm text-navy-charcoal"
                      }
                    `}
                  >
                    <span className="font-semibold text-lg">{option.label}</span>
                  </button>
                ))}
              </div>

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8">
                {currentStepIndex > 0 && (
                  <button
                    onClick={handleBack}
                    className="px-6 py-3 bg-pastel-lavender hover:bg-deep-lavender text-navy-charcoal hover:text-white
                               font-serif font-semibold rounded-full shadow-md transition-all duration-300 transform hover:scale-105 active:scale-95"
                  >
                    ⬅️ Back
                  </button>
                )}
                <button
                  onClick={handleNext}
                  disabled={!isNextEnabled() && currentStepIndex > 0 && currentStep.type !== 'welcome'} // Disable if no selection and not welcome
                  className={`
                    px-6 py-3 font-serif font-semibold rounded-full shadow-md
                    transition-all duration-300 transform hover:scale-105 active:scale-95
                    ${currentStepIndex === surveySteps.length - 1
                      ? "bg-deep-pink hover:bg-pastel-pink text-white hover:text-navy-charcoal mx-auto" // Center "Finish" button
                      : "bg-deep-pink hover:bg-pastel-pink text-white hover:text-navy-charcoal ml-auto" // Push "Next" to right
                    }
                    ${!isNextEnabled() && currentStepIndex > 0 && currentStep.type !== 'welcome' ? 'opacity-50 cursor-not-allowed' : ''}
                  `}
                >
                  {currentStepIndex === surveySteps.length - 1 ? "Finish & Get My Styles! 🎉" : "Next Step! ➡️"}
                </button>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}