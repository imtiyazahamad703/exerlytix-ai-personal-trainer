import React from "react";
import { HiOutlineLocationMarker, HiOutlineMail, HiOutlinePhone } from "react-icons/hi";
import { FaRegPaperPlane } from "react-icons/fa6";

const Contact = () => {
  return (
    <div className="w-full bg-white text-gray-900 pt-32 pb-20">
      
      {/* Hero Section */}
      <section className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-wide">
          Get in <span style={{ color: "var(--color-purple-700)" }}>Touch</span> With{" "}
          <span className="text-indigo-500">Us</span>
        </h1>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
          Have any questions, feedback, or partnership ideas?  
          We’d love to hear from you and help however we can.
        </p>
      </section>

      {/* Contact Section */}
      <section className="container mx-auto px-6 lg:px-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          
          {/* Left - Contact Info */}
          <div className="bg-white border border-gray-200 shadow-md rounded-2xl p-8 transition hover:shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Contact Information
            </h2>
            <p className="text-gray-600 mb-4">
              Feel free to reach us through any of the following channels:
            </p>
            <ul className="space-y-6 text-gray-700">
              <li className="flex items-center space-x-3">
                <HiOutlineLocationMarker style={{ color: "var(--color-purple-700)" }} className="text-2xl" />
                <span>
                  <span className="font-semibold text-gray-800">Address:</span>  
                  {" "}123 Fitness Street, Wellness City, India
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <HiOutlineMail style={{ color: "var(--color-purple-700)" }} className="text-2xl" />
                <span>
                  <span className="font-semibold text-gray-800">Email:</span>  
                  {" "}support@exerlytix.com
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <HiOutlinePhone style={{ color: "var(--color-purple-700)" }} className="text-2xl" />
                <span>
                  <span className="font-semibold text-gray-800">Phone:</span>  
                  {" "}+91 98765 43210
                </span>
              </li>
            </ul>

            {/* Decorative Line */}
            <div
              className="w-24 h-1 rounded-full mt-8"
              style={{ backgroundColor: "var(--color-purple-700)" }}
            ></div>
          </div>

          {/* Right - Contact Form */}
          <div className="bg-white border border-gray-200 shadow-md rounded-2xl p-8 transition hover:shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Send Us a Message
            </h2>
            <form className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 outline-none"
                  style={{ focusRingColor: "var(--color-purple-700)" }}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 outline-none"
                  style={{ focusRingColor: "var(--color-purple-700)" }}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  placeholder="Write your message..."
                  rows="4"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 outline-none"
                  style={{ focusRingColor: "var(--color-purple-700)" }}
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full flex justify-center items-center gap-2 text-gray-900 py-3 rounded-lg font-semibold transition"
                style={{
                  backgroundColor: "var(--color-purple-700)",
                  color: "white",
                }}
              >
                <FaRegPaperPlane className="text-lg" />
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="mt-20 text-center">
        <div
          className="text-gray-900 py-12 rounded-2xl mx-6 lg:mx-20 shadow-lg"
          style={{ backgroundColor: "var(--color-purple-700)" }}
        >
          <h2 className="text-3xl font-bold mb-3 text-white">We’d Love to Hear From You</h2>
          <p className="text-gray-100 max-w-xl mx-auto mb-6">
            Whether it’s feedback, ideas, or collaboration — let’s connect and make something amazing together.
          </p>
          <button className="px-8 py-3 bg-white text-gray-900 font-semibold rounded-lg hover:bg-gray-100 transition">
            Contact Now
          </button>
        </div>
      </section>

    </div>
  );
};

export default Contact;
