import React from "react";
import fitnessImage from "../assets/banners/image.png";
import { Link } from "react-router-dom";

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
                <Link to="/auth/register">Get Started</Link>
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
                  className="absolute right-0 bottom-0 w-[660px] h-[560px] object-contain transform translate-x-6"
                />
              </div>
            </div>
          </div>
        </div>  
      </div>
    </section>
  );
};

export default HeroSection;
