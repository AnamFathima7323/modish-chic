"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const steps = [
  {
    question: "What's your modest style vibe?",
    options: ["Elegant", "Trendy", "Traditional", "Sporty", "Minimalist", "Boho"]
  },
  {
    question: "Which climate do you mostly dress for?",
    options: ["Hot & Dry", "Cold", "Humid", "Mild"]
  },
  {
    question: "What do you usually wear?",
    options: ["Abaya", "Hijab with tunics", "Maxi dresses", "Pants & long tops", "Layered looks"]
  },
  {
    question: "Which colors describe your wardrobe best?",
    options: ["Neutrals", "Pastels", "Bold & Bright", "Dark Tones"]
  },
  {
    question: "What kind of accessories do you love?",
    options: ["Statement earrings", "Minimal jewelry", "Scarves", "Bags", "Belts"]
  },
  {
    question: "Which occasions do you mostly dress for?",
    options: ["Everyday casual", "Workwear", "Special events", "Religious gatherings"]
  }
];

export default function SurveyPage() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const router = useRouter();

  const handleOptionClick = (option) => {
    const newAnswers = [...answers];
    newAnswers[step] = option;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      // Save to localStorage and go to result
      localStorage.setItem("modishSurveyAnswers", JSON.stringify(answers));
      router.push("/result");
    }
  };

  const currentStep = steps[step];

  return (
    <div className="min-h-screen bg-pink-50 flex items-center justify-center p-4">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-xl">
        <h2 className="text-2xl font-semibold text-pink-700 mb-4 text-center">
          Step {step + 1} of {steps.length}
        </h2>
        <p className="text-lg text-gray-700 mb-4 text-center">{currentStep.question}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {currentStep.options.map((option) => (
            <button
              key={option}
              onClick={() => handleOptionClick(option)}
              className={`p-3 rounded-lg border text-sm sm:text-base transition-colors duration-200
                ${answers[step] === option
                  ? "bg-pink-500 text-white border-pink-500"
                  : "bg-white text-gray-800 border-gray-300 hover:bg-pink-100"}`}
            >
              {option}
            </button>
          ))}
        </div>
        <div className="flex justify-end mt-6">
          <button
            onClick={handleNext}
            className="bg-pink-600 text-white px-6 py-2 rounded-lg hover:bg-pink-700"
          >
            {step === steps.length - 1 ? "Finish" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
}
