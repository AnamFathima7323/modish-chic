"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { app } from "@/firebase/firebaseConfig";
import { useRouter } from "next/navigation";

export default function Header() {
  const auth = getAuth(app);
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        router.push("/login");
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/login");
  };

  const getFirstName = (fullNameOrEmail) => {
    if (!fullNameOrEmail) return "";
    const first = fullNameOrEmail.split(" ")[0];
    return first.includes("@") ? first.split("@")[0] : first;
  };

  return (
    <header className="flex justify-between items-center p-4 bg-white shadow-md">
      <div className="text-2xl font-bold text-pink-600">Modish Chic</div>
      <div className="flex items-center space-x-4">
        <span className="text-pink-800 font-semibold text-lg hidden sm:inline">
          Hey {user ? getFirstName(user.displayName || user.email) : "there"}!
        </span>
        <button
          onClick={handleLogout}
          className="bg-pink-600 text-white px-4 py-1 rounded-lg hover:bg-pink-700"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
