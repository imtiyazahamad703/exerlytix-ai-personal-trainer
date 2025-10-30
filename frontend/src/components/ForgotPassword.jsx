import React, { useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { useNavigate, Link } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Invalid email format");
      return false;
    } else {
      setEmailError("");
      return true;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(""); // Clear previous messages

    if (!validateEmail(email)) return;

    setLoading(true);
    try {
      // This part only runs for successful (2xx) responses
      const response = await axiosInstance.post("/forgot-password", { email });

      setMessage("Email verified. Redirecting...");
      setTimeout(() => {
        navigate("/auth/change-password", { state: { email } });
      }, 1500);

    } catch (error) {
      // <-- This block now correctly handles the error from the backend
      console.error("Forgot password error:", error);

      // Check if the error is a 404 "Not Found" error from our API
      if (error.response && error.response.status === 404) {
        setMessage(error.response.data.message || "This email is not registered."); // Use backend message
      } else {
        // Handle other errors (like network issues)
        setMessage("An unexpected error occurred. Please try again.");
      }
      
      // Set a timeout to clear the error message
      setTimeout(() => setMessage(""), 3000);

    } finally {
      setLoading(false);
    }
  };

  return (
   <div className="flex min-h-screen items-center justify-center bg-white p-4">
  <div className="w-full max-w-md rounded-3xl bg-white p-8 py-12 shadow-2xl shadow-gray-300 border border-gray-100">
    <div className="mb-8 w-full text-center">
      <h1 className="mb-1.5 text-2xl font-bold text-gray-900">Forgot Password</h1>
      <p className="text-sm text-gray-500">
        Provide the email address associated with your account to recover your password
      </p>
    </div>

    <form className="space-y-5" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email" className="block text-gray-700">Email</label>
        <input
          type="email"
          value={email}
          name="email"
          id="email"
          className="w-full rounded-lg border border-gray-300 p-3 shadow-sm transition-transform duration-150 transform-gpu focus:-translate-y-0.5 focus:scale-[1.01] focus:ring-2 focus:ring-[var(--color-purple-700)] focus:outline-none"
          placeholder="xyz@gmail.com"
          onChange={(event) => setEmail(event.target.value)}
          onBlur={(event) => validateEmail(event.target.value)}
        />
        {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
      </div>

      <div>
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-[var(--color-purple-700)] p-3 font-semibold text-white transition-all duration-200 hover:opacity-95 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? "Verifying..." : "Reset Password"}
        </button>
      </div>
    </form>

    {message && (
      <p
        className={`mt-4 text-center text-sm ${
          message.includes("Redirecting") ? "text-green-600" : "text-red-600"
        }`}
      >
        {message}
      </p>
    )}

    <div className="mt-6 text-center">
      <Link to="/auth/login" className="text-[var(--color-purple-700)] hover:underline text-sm font-medium">
        Back to Login
      </Link>
    </div>
  </div>
</div>

  );
};

export default ForgotPassword;