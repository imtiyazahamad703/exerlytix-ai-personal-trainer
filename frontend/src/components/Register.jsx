import React, { useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [isValid, setIsValid] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  // ✅ Add success & error message states
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate(); // to navigate after login


  const validateEmail = (email) => {
    setIsValid(false);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Invalid email format");
      setIsValid(true);
    } else {
      setEmailError("");
    }
  };

  const validatePassword = (password) => {
    setIsValid(false);
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      setPasswordError("Password must be at least 8 characters and contain a number & special char");
      setIsValid(true);
    } else {
      setPasswordError("");
    }
  };

  const validateConfirmPassword = (confirmPassword) => {
    setIsValid(false);
    if (confirmPassword !== password) {
      setConfirmPasswordError("Passwords do not match");
      setIsValid(true);
    } else {
      setConfirmPasswordError("");
    }
  };

  const handleRegistration = async (event) => {
    event.preventDefault();
    const RegisterData = { name, email, password };

    try {
      const response = await axiosInstance.post("/register", RegisterData);
      console.log(response.data);

      // Show success message
      setSuccessMessage("🎉 Registration successful!");
      setErrorMessage("");

      // Reset form fields
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");

      // Clear validation errors
      setEmailError("");
      setPasswordError("");
      setConfirmPasswordError("");

      // login page after 3 sec
      setTimeout(() => {
        setSuccessMessage("");
        navigate("/auth/login"); // ✅ redirect to login
      }, 1500);

    } catch (error) {
      console.error(error.response || error.message);

      if (error.response && error.response.data) {
        setErrorMessage(`❌ ${error.response.data}`);
      } else {
        setErrorMessage("❌ Registration failed. Please try again.");
      }

      setSuccessMessage("");

      // Auto hide error after 3 sec
      setTimeout(() => setErrorMessage(""), 3000);
    }
  };

  return (
   <>
  <div className="flex min-h-screen items-center justify-center bg-white p-4">
    <div className="w-full max-w-md bg-white rounded-2xl mt-15 p-8 shadow-2xl shadow-gray-300">
      <h1 className="mb-4 text-center text-2xl font-extrabold text-purple-700">
        Register Here
      </h1>

      {/* ✅ Success & Error messages (unchanged) */}
      {successMessage && (
        <p className="mb-2 text-green-600 font-semibold text-center">{successMessage}</p>
      )}
      {errorMessage && (
        <p className="mb-2 text-red-600 font-semibold text-center">{errorMessage}</p>
      )}

      <form className="space-y-4" onSubmit={handleRegistration}>
        <div>
          <label htmlFor="name" className="block text-gray-500 mb-1">Name</label>
          <input
            type="text"
            value={name}
            id="name"
            name="name"
            className="w-full rounded-lg border border-gray-300 p-3 shadow-sm transition-transform duration-200 transform-gpu focus:-translate-y-0.5 focus:scale-[1.01] focus:ring-2 focus:ring-purple-300 focus:outline-none"
            placeholder="Enter your name"
            onChange={(event) => setName(event.target.value)}
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-gray-500 mb-1">Email</label>
          <input
            type="email"
            value={email}
            id="email"
            name="email"
            className="w-full rounded-lg border border-gray-300 p-3 shadow-sm transition-transform duration-200 transform-gpu focus:-translate-y-0.5 focus:scale-[1.01] focus:ring-2 focus:ring-purple-300 focus:outline-none"
            placeholder="example@gmail.com"
            onChange={(event) => {
              setEmail(event.target.value);
              validateEmail(event.target.value);
            }}
          />
          {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
        </div>

        <div>
          <label htmlFor="password" className="block text-gray-500 mb-1">Password</label>
          <input
            type="password"
            value={password}
            id="password"
            name="password"
            className="w-full rounded-lg border border-gray-300 p-3 shadow-sm transition-transform duration-200 transform-gpu focus:-translate-y-0.5 focus:scale-[1.01] focus:ring-2 focus:ring-purple-300 focus:outline-none"
            placeholder="Example@#123"
            onChange={(event) => {
              setPassword(event.target.value);
              validatePassword(event.target.value);
            }}
          />
          {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
        </div>

        <div>
          <label htmlFor="confirmPassword" className="block text-gray-500 mb-1">Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            id="confirmPassword"
            name="confirmPassword"
            className="w-full rounded-lg border border-gray-300 p-3 shadow-sm transition-transform duration-200 transform-gpu focus:-translate-y-0.5 focus:scale-[1.01] focus:ring-2 focus:ring-purple-300 focus:outline-none"
            placeholder="Re-enter password"
            onChange={(event) => {
              setConfirmPassword(event.target.value);
              validateConfirmPassword(event.target.value);
            }}
          />
          {confirmPasswordError && <p className="text-red-500 text-sm mt-1">{confirmPasswordError}</p>}
        </div>

        <div>
          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-purple-700 text-white font-extrabold shadow-md transition duration-150 hover:shadow-lg hover:scale-[0.995] active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-purple-200"
          >
            Register
          </button>
        </div>

        <div className="text-center">
          <label className="text-gray-600 font-light">
            Do you already have an account?{" "}
            <Link
              to="/auth/login"
              className="pl-1 font-medium text-purple-700 hover:underline"
            >
              Login
            </Link>
          </label>
        </div>
      </form>
    </div>
  </div>
</>

  );
};

export default Register;
