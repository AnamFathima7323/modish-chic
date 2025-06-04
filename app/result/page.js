// app/result/page.js
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ResultPage() {
  const [answers, setAnswers] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const savedAnswers = JSON.parse(localStorage.getItem("modishSurveyAnswers"));
    if (savedAnswers) {
      setAnswers(savedAnswers);
    } else {
      router.push("/survey"); // fallback if no data
    }
  }, []);

  const generateCompliment = () => {
    if (!answers) return "";

    const compliments = [
      "You're a walking pastel poetry!",
      "Your elegance could teach the moon grace.",
      "Modesty never looked this chic before!",
      "You're redefining soft glam the Modish Chic way!",
      "Grace, style, and soul — you've got it all!",
    ];

    // Simple random compliment for now — can be AI-generated later
    return compliments[Math.floor(Math.random() * compliments.length)];
  };

  return (
    <div className="min-h-screen bg-pink-50 flex flex-col items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-2xl p-8 text-center max-w-md">
        <h2 className="text-3xl font-bold text-pink-600 mb-4">You're Modishly Unique! ✨</h2>
        <p className="text-lg text-gray-700 mb-6">{generateCompliment()}</p>
        <button
          className="bg-pink-600 text-white px-6 py-2 rounded-lg hover:bg-pink-700"
          onClick={() => router.push("/home")}
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}
