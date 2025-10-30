import React from "react";
import { FaDumbbell, FaChartLine, FaHeartbeat, FaUsers } from "react-icons/fa";

const About = () => {
  return (
    <div className="bg-white text-gray-800">
      {/* Hero Section */}
      <section className="w-full text-center pt-32 pb-20 px-6">
        <h1 className="text-5xl font-extrabold mb-4 text-gray-900">
          About <span className="text-indigo-600">Exer</span>
          <span className="text-purple-600">Lytix</span>
        </h1>
        <p className="max-w-2xl mx-auto text-lg text-gray-600">
          AI-powered fitness insights that help you train smarter, track your
          performance, and achieve your goals faster.
        </p>
      </section>

      {/* Who We Are Section */}
      <section className="max-w-6xl mx-auto px-6 lg:px-16 pb-18">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Who We Are
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              <span className="font-semibold text-indigo-600">ExerLytix</span> is
              a cutting-edge fitness analytics platform designed to merge
              artificial intelligence with personal training insights. Our goal
              is to empower individuals to understand, monitor, and improve their
              fitness journey through data and intelligent guidance.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Whether you're a beginner or an athlete, we provide the right tools
              and motivation to help you reach your potential.
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 shadow-md p-8">
            <h3 className="text-2xl font-semibold text-indigo-700 mb-3">
              Our Vision
            </h3>
            <p className="text-gray-600 leading-relaxed">
              To redefine fitness with technology — making workouts intelligent,
              personalized, and engaging for everyone.
            </p>
          </div>
        </div>
      </section>

      {/* What We Offer Section */}
      <section className="max-w-6xl mx-auto px-6 lg:px-16 py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
          What We Offer
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-lg transition">
            <FaDumbbell className="text-indigo-600 text-4xl mx-auto mb-4" />
            <h3 className="font-semibold text-lg mb-2 text-gray-900">
              Smart Workouts
            </h3>
            <p className="text-gray-600 text-sm">
              Tailored workout plans designed using AI to match your fitness goals.
            </p>
          </div>

          <div className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-lg transition">
            <FaChartLine className="text-purple-600 text-4xl mx-auto mb-4" />
            <h3 className="font-semibold text-lg mb-2 text-gray-900">
              AI Insights
            </h3>
            <p className="text-gray-600 text-sm">
              Understand your progress through data-driven performance analytics.
            </p>
          </div>

          <div className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-lg transition">
            <FaHeartbeat className="text-pink-600 text-4xl mx-auto mb-4" />
            <h3 className="font-semibold text-lg mb-2 text-gray-900">
              Health Tracking
            </h3>
            <p className="text-gray-600 text-sm">
              Monitor your heart rate, calories, and body metrics all in one place.
            </p>
          </div>

          <div className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-lg transition">
            <FaUsers className="text-green-600 text-4xl mx-auto mb-4" />
            <h3 className="font-semibold text-lg mb-2 text-gray-900">
              Community Support
            </h3>
            <p className="text-gray-600 text-sm">
              Connect, compete, and grow with a like-minded fitness community.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="max-w-5xl mx-auto px-6 lg:px-16 py-16 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
          Our Mission
        </h2>
        <p className="text-gray-600 max-w-3xl mx-auto text-lg mb-10">
          Our mission is to simplify fitness using smart technology. We want to
          make health tracking intuitive, workouts enjoyable, and improvement measurable.
        </p>
        <div className="w-32 h-1 bg-gradient-to-r from-indigo-600 to-purple-600 mx-auto rounded-full"></div>
      </section>

      {/* CTA Section */}
      <section className="text-center py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Start Your Fitness Journey with Us
        </h2>
        <p className="text-gray-600 mb-8 max-w-xl mx-auto">
          Join <span className="text-indigo-600 font-semibold">ExerLytix</span> and
          experience the next level of fitness powered by AI insights and community energy.
        </p>
        <button className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg shadow-md hover:opacity-90 transition">
          Get Started
        </button>
      </section>
    </div>
  );
};

export default About;
