import React, { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { profile, clearProfile } = useAuth();
  const navigate = useNavigate();

  const isLoggedIn = Boolean(profile && profile.userId);

  const handleLogout = () => {
    clearProfile();
    navigate("/");
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-white text-slate-800 shadow-sm z-50">
      <div className="container mx-auto flex items-center justify-between p-5">
        
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-slate-800 flex items-baseline">
          <span className="font-extrabold text-indigo-600 text-3xl">Exer</span>
          <span className="text-purple-700">Lytix</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-10 text-lg">
          <Link to="/" className="text-slate-700 hover:text-indigo-600 transition">Home</Link>
          <Link to="/about" className="text-slate-700 hover:text-indigo-600 transition">About</Link>

          {/* Workouts shown only when logged in */}
          {isLoggedIn && (
            <Link to="/dashboard" className="text-slate-700 hover:text-indigo-600 transition">Workouts</Link>
          )}

          <Link to="/nutrition" className="text-slate-700 hover:text-indigo-600 transition">Nutrition</Link>
          <Link to="/contact" className="text-slate-700 hover:text-indigo-600 transition">Contact</Link>
        </div>

        {/* Login / Dashboard + Logout */}
        <div className="space-x-3">
          {!isLoggedIn ? (
            <Link to="/auth/login">
              <button className="px-8 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition">
                Login
              </button>
            </Link>
          ) : (
            <div style={{ display: "inline-flex", gap: 8, alignItems: "center" }}>
              <Link to="/dashboard">
                <button className="px-8 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition">
                  Dashboard
                </button>
              </Link>
              <button
                onClick={handleLogout}
                className="px-8 py-2 bg-white text-slate-800 rounded-lg border border-gray-200 hover:bg-gray-50 transition"
              >
                Logout
              </button>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-slate-800"
        >
          {isOpen ? <FiX size={28} /> : <FiMenu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white">
          <ul className="flex flex-col items-center space-y-4 py-5">
            <li><Link to="/" className="text-slate-700 hover:text-indigo-600 transition" onClick={() => setIsOpen(false)}>Home</Link></li>
            <li><Link to="/about" className="text-slate-700 hover:text-indigo-600 transition" onClick={() => setIsOpen(false)}>About</Link></li>

            {isLoggedIn && (
              <li>
                <Link to="/dashboard" className="text-slate-700 hover:text-indigo-600 transition" onClick={() => setIsOpen(false)}>Workouts</Link>
              </li>
            )}

            <li><Link to="/nutrition" className="text-slate-700 hover:text-indigo-600 transition" onClick={() => setIsOpen(false)}>Nutrition</Link></li>
            <li><Link to="/contact" className="text-slate-700 hover:text-indigo-600 transition" onClick={() => setIsOpen(false)}>Contact</Link></li>

            <li>
              {!isLoggedIn ? (
                <Link to="/auth/login" onClick={() => setIsOpen(false)}>
                  <button className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition font-semibold">
                    Get Started
                  </button>
                </Link>
              ) : (
                <>
                  <Link to="/dashboard" onClick={() => setIsOpen(false)}>
                    <button className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition font-semibold">
                      Dashboard
                    </button>
                  </Link>
                  <button
                    onClick={() => { setIsOpen(false); handleLogout(); }}
                    className="px-6 py-2 bg-white text-slate-800 rounded-lg border border-gray-200 hover:bg-gray-50 transition font-semibold"
                  >
                    Logout
                  </button>
                </>
              )}
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
