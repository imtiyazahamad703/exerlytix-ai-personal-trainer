import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#F3ECFF] text-slate-800 py-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        {/* Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Link to="/" aria-label="ExerLytix home">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-600 to-purple-500 flex items-center justify-center shadow">
                 <svg
  className="w-5 h-5 text-white"
  viewBox="0 0 24 24"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    d="M4 10v4m16-4v4M7 8v8m10-8v8M3 12h18"
    stroke="white"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  />
</svg>

                </div>
              </Link>

              <h2 className="text-2xl font-extrabold text-slate-900">ExerLytix</h2>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed max-w-xs">
              Transform your fitness journey with AI-powered solutions.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-slate-600 hover:text-indigo-600 transition">Home</Link>
              </li>
              <li>
                <Link to="/about" className="text-slate-600 hover:text-indigo-600 transition">About</Link>
              </li>
              <li>
                <Link to="/contact" className="text-slate-600 hover:text-indigo-600 transition">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Support (all navigate to contact) */}
          <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Support</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/contact" className="text-slate-600 hover:text-indigo-600 transition">Help Center</Link>
              </li>
              <li>
                <Link to="/contact" className="text-slate-600 hover:text-indigo-600 transition">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/contact" className="text-slate-600 hover:text-indigo-600 transition">Terms of Service</Link>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Follow Us</h3>
            <p className="text-sm text-slate-600 mb-3">
              Stay connected — follow ExerLytix on social.
            </p>

            <div className="flex items-center gap-3 mt-2">
              <a
                href="https://www.facebook.com/ExerLytix"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 rounded-md bg-white/70 flex items-center justify-center text-indigo-600 hover:bg-white transition"
              >
                <FaFacebookF size={14} />
              </a>
              <a
                href="https://twitter.com/ExerLytix"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="w-9 h-9 rounded-md bg-white/70 flex items-center justify-center text-indigo-600 hover:bg-white transition"
              >
                <FaTwitter size={14} />
              </a>
              <a
                href="https://www.instagram.com/ExerLytix"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-md bg-white/70 flex items-center justify-center text-indigo-600 hover:bg-white transition"
              >
                <FaInstagram size={14} />
              </a>
              <a
                href="https://www.linkedin.com/company/ExerLytix"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-9 h-9 rounded-md bg-white/70 flex items-center justify-center text-indigo-600 hover:bg-white transition"
              >
                <FaLinkedinIn size={14} />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8">
          <p className="text-center text-sm text-slate-500">
            © 2025 ExerLytix. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
