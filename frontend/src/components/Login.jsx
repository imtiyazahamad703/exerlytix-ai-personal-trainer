import React, { useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { Link, useNavigate } from "react-router-dom";
import loginImg from "../assets/banners/banner1.png";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const navigate = useNavigate(); // ✅ Navigation hook
  const [errorMessage, setErrorMessage] = useState(""); // to show login error

  // ✅ Auth context hook
  const {profile,updateProfile} = useAuth();

  const [isValid, setIsValid] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

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
      setPasswordError("Password must be at least 8");
      setIsValid(true);
    } else {
      setPasswordError("");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const loginData = { email, password };
    try {
      const response = await axiosInstance.post("/login", loginData);
      console.log(response.data);

      if (response.data.success) {
        // ✅ Store user details globally
        updateProfile({
          userId: response.data.userId,
          name: response.data.name,
          email: response.data.email,
          profilePicture: response.data.profilePicture,
        });
        
        

        // Login successful
        setErrorMessage(""); // Clear any previous errors
        navigate("/dashboard"); // Redirect to dashboard
      } else {
        // Login failed (wrong email or password)
        setErrorMessage(response.data.message);
        setTimeout(() => setErrorMessage(""), 2000);
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage("wrong email or password");
      setTimeout(() => setErrorMessage(""), 2000);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-white p-4">
  <div className="w-full max-w-md bg-white rounded-2xl mt-15 p-8 shadow-2xl shadow-gray-300">
    <h1 className="mb-6 text-3xl font-extrabold text-center text-purple-700">
      Login Here
    </h1>

    {errorMessage && (
      <p className="text-red-600 text-center font-semibold mb-4">
        {errorMessage}
      </p>
    )}

    <form onSubmit={handleLogin} className="space-y-4">
      {/* Email Field */}
      <div>
        <label htmlFor="email" className="block text-left text-gray-700 mb-1">
          Email
        </label>
        <input
          type="text"
          id="email"
          name="email"
          value={email}
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm transition-transform duration-200 transform-gpu focus:-translate-y-0.5 focus:scale-[1.01] focus:ring-2 focus:ring-purple-300 focus:outline-none"
          onChange={(event) => {
            setEmail(event.target.value);
            validateEmail(event.target.value);
          }}
        />
        {isValid && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
      </div>

      {/* Password Field */}
      <div>
        <label htmlFor="password" className="block text-left text-gray-700 mb-1">
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm transition-transform duration-200 transform-gpu focus:-translate-y-0.5 focus:scale-[1.01] focus:ring-2 focus:ring-purple-300 focus:outline-none"
          onChange={(event) => {
            setPassword(event.target.value);
            validatePassword(event.target.value);
          }}
        />
        {isValid && (
          <p className="text-red-500 text-sm mt-1">{passwordError}</p>
        )}
      </div>

      {/* Remember + Forgot Password */}
      <div className="flex items-center justify-between mt-2">
        <label htmlFor="checkBox" className="flex items-center text-gray-700">
          <input
            type="checkbox"
            id="checkBox"
            name="checkBox"
            value={remember}
            className="h-4 w-4 mr-2 accent-purple-700 border-gray-300 rounded focus:ring-2 focus:ring-purple-300"
            onChange={(e) => setRemember(e.target.value)}
          />
          Remember
        </label>

        <Link
          to="/auth/forgot-password"
          className="text-purple-700 hover:underline hover:opacity-90 transition"
        >
          Forgot Password?
        </Link>
      </div>

      {/* Login Button */}
      <div>
        <button
          type="submit"
          className="w-full py-3 rounded-lg bg-purple-700 text-white font-extrabold shadow-md hover:shadow-lg hover:scale-[0.995] active:scale-[0.98] transition-all duration-150 focus:outline-none focus:ring-4 focus:ring-purple-200"
        >
          Login
        </button>
      </div>

      {/* Divider */}
      <div className="text-center relative my-2">
        <div className="absolute inset-0 flex items-center" aria-hidden>
          <div className="w-full border-t border-gray-200"></div>
        </div>
        <div className="relative flex justify-center">
          <span className="bg-white px-3 text-gray-500">Or</span>
        </div>
      </div>

      {/* Register Button */}
      <div>
        <Link to="/auth/register">
          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-white border border-purple-300 text-purple-700 font-extrabold shadow-sm hover:bg-purple-50 hover:scale-[0.995] active:scale-[0.98] transition-all duration-150"
          >
            Register
          </button>
        </Link>
      </div>
    </form>
  </div>
</div>


  );
};

export default Login;
