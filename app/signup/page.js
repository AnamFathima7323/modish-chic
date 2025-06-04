"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signUp, signInWithGoogle } from "../../firebase/auth";
import { getFriendlyErrorMessage } from "../../utils/friendlyErrors";
import { FcGoogle } from "react-icons/fc";
import { Eye, EyeOff } from "lucide-react";

export default function SignUpPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("");

  // Dynamic password strength check
  useEffect(() => {
    if (!password) {
      setPasswordStrength("");
      return;
    }
    const strongRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/;
    const mediumRegex = /^(?=.*[A-Za-z])(?=.*\d).{6,}$/;

    if (strongRegex.test(password)) {
      setPasswordStrength("Strong");
    } else if (mediumRegex.test(password)) {
      setPasswordStrength("Medium");
    } else {
      setPasswordStrength("Weak");
    }
  }, [password]);

  const handleSignup = async (e) => {
    e.preventDefault();
    if (password !== confirm) {
      return setMessage("Passwords do not match.");
    }
    const strongPasswordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/;
    if (!strongPasswordRegex.test(password)) {
      return setMessage("Password must be at least 8 characters and include a number & symbol.");
    }
    try {
      await signUp(email, password);
      router.push("/login");
    } catch (err) {
      setMessage(getFriendlyErrorMessage(err.message));
    }
  };

  const handleGoogleSignup = async () => {
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
        <h2 className="text-xl font-semibold text-center mb-4 text-gray-900">Create an Account</h2>

        <form onSubmit={handleSignup}>
          <input
            className="w-full p-2 mb-3 border border-gray-300 rounded-lg placeholder-gray-500 text-gray-900"
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <div className="relative">
            <input
              className="w-full p-2 mb-1 border border-gray-300 rounded-lg placeholder-gray-500 text-gray-900 pr-10"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="absolute right-2 top-2.5 text-gray-600"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {password && (
            <p
              className={`text-sm font-medium mb-3 ${
                passwordStrength === "Strong"
                  ? "text-green-600"
                  : passwordStrength === "Medium"
                  ? "text-yellow-600"
                  : "text-red-600"
              }`}
            >
              Password strength: {passwordStrength}
            </p>
          )}

          <input
            className="w-full p-2 mb-3 border border-gray-300 rounded-lg placeholder-gray-500 text-gray-900"
            type="password"
            placeholder="Confirm Password"
            onChange={(e) => setConfirm(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 transition text-white p-2 rounded-lg mb-3"
          >
            Sign Up
          </button>
        </form>

        <button
          onClick={handleGoogleSignup}
          className="w-full flex justify-center items-center border border-gray-300 py-2 rounded-lg hover:bg-gray-100 transition mb-4 text-gray-900"
        >
          <FcGoogle className="mr-2 text-xl" />
          Sign Up with Google
        </button>

        <p className="text-center text-sm mt-2 text-gray-900">
          Already have an account?{" "}
          <a href="/login" className="text-indigo-600 hover:underline">
            Login
          </a>
        </p>

        {message && (
          <p className="mt-4 text-sm text-red-600 text-center font-medium">{message}</p>
        )}
      </div>
    </div>
  );
}
