"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn, signInWithGoogle } from "../../firebase/auth";
import { getFriendlyErrorMessage } from "../../utils/friendlyErrors";
import { FcGoogle } from "react-icons/fc";
import { HiEye, HiEyeOff } from "react-icons/hi";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => setShowPassword(!showPassword);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signIn(email, password);
      router.push("/home");
    } catch (err) {
      setMessage(getFriendlyErrorMessage(err.message));
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
      router.push("/home");
    } catch (err) {
      setMessage(getFriendlyErrorMessage(err.message));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-md">
        <h2 className="text-2xl font-semibold text-gray-900 text-center mb-6">Sign In to Your Account</h2>

        <form onSubmit={handleLogin}>
          <input
            className="w-full p-2 mb-4 border rounded-lg placeholder-gray-500 text-gray-900 focus:outline-indigo-500"
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <div className="relative mb-6">
            <input
              className="w-full p-2 border rounded-lg placeholder-gray-500 text-gray-900 focus:outline-indigo-500"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={toggleShowPassword}
              className="absolute right-3 top-2.5 text-gray-600 hover:text-gray-900"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <HiEyeOff size={20} /> : <HiEye size={20} />}
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white p-2 rounded-lg mb-4 hover:bg-indigo-700 transition"
          >
            Login
          </button>
        </form>

        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full flex justify-center items-center border py-2 rounded-lg hover:bg-gray-100 transition text-gray-900 font-medium"
        >
          <FcGoogle className="mr-2 text-xl" />
          Sign in with Google
        </button>

        <p className="text-center text-sm mt-5 text-gray-900">
          Don't have an account?{" "}
          <a href="/signup" className="text-indigo-600 hover:underline">
            Sign Up
          </a>
        </p>

        {message && (
          <p className="mt-4 text-sm text-red-600 text-center" role="alert">
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
