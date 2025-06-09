// app/result/page.jsx
"use client";
import { useEffect, useState } from 'react';
import Header from '@/components/Header';

export default function ResultPage() {
  const [surveyAnswers, setSurveyAnswers] = useState(null);

  useEffect(() => {
    const answers = localStorage.getItem("modishSurveyAnswers");
    if (answers) {
      setSurveyAnswers(JSON.parse(answers));
    }
  }, []);

  return (
    <div className="min-h-screen bg-butter-yellow/5 font-sans text-navy-charcoal">
      <Header />
      <main className="pt-24 pb-12 px-4 sm:px-8 lg:px-16 max-w-4xl mx-auto">
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-pastel-pink/50 text-center">
          <h1 className="text-4xl font-serif font-bold text-deep-pink mb-6">
            Your Style Summary! 🎉
          </h1>
          <p className="text-lg text-navy-charcoal mb-8">
            Here are the answers you provided. Soon, this page will show your personalized recommendations!
          </p>
          {surveyAnswers ? (
            <pre className="bg-gray-100 p-4 rounded-lg text-left overflow-x-auto text-sm">
              {JSON.stringify(surveyAnswers, null, 2)}
            </pre>
          ) : (
            <p className="text-gray-500">No survey answers found.</p>
          )}
          <div className="mt-8">
            <button
              onClick={() => window.location.href = '/home'} // Or router.push('/home')
              className="bg-deep-pink hover:bg-pastel-pink text-white hover:text-navy-charcoal
                         font-serif font-semibold px-6 py-3 rounded-full shadow-md transition-all duration-300"
            >
              Back to Home
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}