import React from "react";
import fitnessImage from "../assets/banners/image.png";

const HeroSection = () => {
  return (
    <section className="w-screen min-h-screen bg-white flex items-center justify-center">
      <div className="container mx-auto px-8 lg:px-24 py-20">
        <div className="flex flex-col-reverse lg:flex-row items-center lg:items-start gap-20 ">
          {/* Left Section - Text */}
          <div className="w-full lg:w-1/2 max-w-2xl py-20">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight text-slate-900">
              Exercise is the key to a{" "}
              <span className="text-indigo-600">Healthy</span> Lifestyle
            </h1>

            <p className="mt-6 text-slate-600 text-sm sm:text-base leading-relaxed max-w-xl">
              Regular exercise is a crucial component of a healthy lifestyle.
              It has numerous benefits for physical and mental health, including
              reducing the risk of chronic diseases, improving cardiovascular
              function, enhancing mood, reducing stress, and promoting better
              sleep.
            </p>

            <div className="mt-8 flex items-center gap-6">
              <button className="px-6 sm:px-8 py-3 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 text-white font-semibold shadow-lg hover:from-indigo-700 hover:to-purple-700 transition">
                Get Started
              </button>

              <button className="inline-flex items-center gap-3 px-4 py-2 rounded-lg bg-white border border-slate-200 shadow-sm hover:shadow-md transition">
                <span className="w-9 h-9 rounded-full bg-indigo-50 flex items-center justify-center">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-indigo-600"
                  >
                    <path d="M5 3v18l15-9L5 3z" fill="#6366F1" />
                  </svg>
                </span>
                <span className="text-slate-800 font-medium">Watch Video</span>
              </button>
            </div>
          </div>

          {/* Right Section - Card with Image and decorations */}
          <div className="w-full lg:w-1/2 flex justify-center lg:justify-end relative">
            {/* Decorative concentric circles */}
            <div className="relative w-[500px] h-[500px] flex items-center justify-center">
              <div className="absolute w-[500px] h-[500px] rounded-full bg-indigo-100/70 -right-10 top-0"></div>
              <div className="absolute w-[420px] h-[420px] rounded-full bg-indigo-200/60 -right-6 top-6"></div>
              <div className="absolute w-[340px] h-[340px] rounded-full bg-indigo-500/30 -right-2 top-12"></div>

              {/* Person Image (larger) */}
              <div className="relative w-[460px] h-[460px] rounded-full flex items-end justify-center pointer-events-none">
                <img
                  src={fitnessImage}
                  alt="Fitness"
                  className="absolute right-0 bottom-0 w-[460px] h-[460px] object-contain transform translate-x-6"
                />
              </div>

              {/* Floating Heart Rate card */}
              <div className="absolute left-6 top-28 bg-white rounded-xl px-4 py-3 shadow-xl w-28 text-center">
                <div className="text-xs text-indigo-600 font-semibold">
                  Heart Rate
                </div>
                <div className="mt-2 inline-flex items-center justify-center w-9 h-9 bg-indigo-50 rounded-lg mx-auto">
                 <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
  <path d="M12.1 21.35l-1.1-1.02C5.14 15.4 2 12.5 2 8.99 2 6.5 4.24 4.9 6.5 4.9c1.54 0 3.04.88 3.6 2.24.56-1.36 2.06-2.24 3.6-2.24 2.26 0 4.5 1.6 4.5 4.09 0 3.52-3.14 6.41-8.99 11.34l-1.1 1.02z" fill="none" stroke="#6366F1" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
</svg>

                </div>
                <div className="mt-2 text-indigo-600 font-bold">100 BPM</div>
              </div>

              {/* Floating Location card */}
              <div className="absolute right-20 bottom-6 bg-white rounded-xl px-4 py-4 shadow-2xl w-40 text-center">
                <div className="w-12 h-12 rounded-full bg-indigo-600 mx-auto flex items-center justify-center mb-2">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M12 2C8.1 2 5 5.1 5 9c0 5.2 7 13 7 13s7-7.8 7-13c0-3.9-3.1-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z"
                      fill="#fff"
                    />
                  </svg>
                </div>
                <div className="text-sm font-semibold text-slate-800">
                  Find our gym
                </div>
                <div className="text-xs text-slate-500 mt-1">
                  centers near you
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
