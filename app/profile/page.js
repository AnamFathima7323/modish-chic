// app/profile/page.jsx
"use client";

import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { app } from '@/firebase/firebaseConfig'; // Ensure this path is correct
import { useRouter } from 'next/navigation';
import Header from '@/components/Header'; // Import your Header component
import Link from 'next/link';

export default function ProfilePage() {
  const auth = getAuth(app);
  const router = useRouter();
  const [loading, setLoading] = useState(true); // To show a loading state while checking auth
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        // User is logged in
        setUser(currentUser);
      } else {
        // No user found, redirect to login page
        router.push("/login");
      }
      setLoading(false); // Auth check is complete
    });
    return () => unsubscribe(); // Cleanup the listener
  }, [auth, router]); // Dependencies for useEffect

  // Helper function to get first name (you might want to put this in a utils file)
  const getFirstName = (fullNameOrEmail) => {
    if (!fullNameOrEmail) return "";
    const first = fullNameOrEmail.split(" ")[0];
    return first.includes("@") ? first.split("@")[0] : first;
  };

  if (loading) {
    // Show a loading indicator while authentication status is being determined
    return (
      <div className="min-h-screen flex items-center justify-center bg-butter-yellow/10 font-sans text-navy-charcoal text-xl">
        <p>Loading profile...</p>
      </div>
    );
  }

  if (!user) {
    // If not loading and no user, it means we're redirecting.
    // Return null or a simple message, as the push will handle navigation.
    return null;
  }

  // --- Profile Page Content ---
  return (
    <div className="min-h-screen bg-butter-yellow/10 font-sans text-navy-charcoal">
      <Header /> {/* Your collapsible header */}
      <main className="pt-24 pb-12 px-4 sm:px-8 lg:px-16 max-w-6xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-deep-pink mb-6 text-center">
          Hey {getFirstName(user.displayName || user.email)}! 👋 Your Profile
        </h1>
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-pastel-pink/50 text-lg leading-relaxed">
          <p className="mb-4">
            Welcome to your personalized Modish Chic profile. Here, you can
            review your past style quizzes, update your preferences, and keep
            track of your favorite AI-generated outfits!
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div>
              <h2 className="text-2xl font-serif font-semibold text-deep-lavender mb-3">
                Your Basic Info
              </h2>
              <p><strong>Email:</strong> {user.email}</p>
              {user.displayName && <p><strong>Name:</strong> {user.displayName}</p>}
              {/* Add more user details here as needed */}
            </div>
            <div>
              <h2 className="text-2xl font-serif font-semibold text-deep-lavender mb-3">
                Style Preferences (Coming Soon!)
              </h2>
              <p>
                This section will soon allow you to fine-tune your fashion
                preferences, update your body type, and even tell us about
                new cultural considerations for even more precise outfit
                suggestions.
              </p>
              <button className="mt-4 bg-pastel-pink hover:bg-deep-pink text-navy-charcoal font-semibold py-2 px-4 rounded-full transition-colors duration-200">
                Update Preferences
              </button>
            </div>
          </div>
          <div className="mt-8 text-center">
            <Link href="/survey">
              <button className="bg-deep-pink hover:bg-pastel-pink text-white font-serif font-semibold py-3 px-6 rounded-full shadow-md transition-colors duration-200">
                Retake Style Quiz!
              </button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
