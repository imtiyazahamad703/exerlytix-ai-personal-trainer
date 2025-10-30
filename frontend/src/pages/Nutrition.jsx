import React from "react";
import { FaAppleAlt, FaUtensils, FaChartPie, FaLeaf } from "react-icons/fa";

const Nutrition = () => {
  return (
    <div className="bg-white text-gray-800">

      {/* Hero Section */}
      <section className="w-full bg-white text-gray-900 pt-32 pb-20 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-wide">
          Your Path to Smarter{" "}
          <span className="text-purple-700">Nutrition</span>
        </h1>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
          Track, plan, and optimize your meals with AI-powered nutrition
          — designed to complement your workouts and goals.
        </p>
      </section>

      {/* Subtle Divider */}
      <div className="h-1 w-32 mx-auto mb-16 rounded-full bg-gradient-to-r from-[#F3ECFF] to-purple-100"></div>

      {/* Core Features */}
      <section className="container mx-auto px-6 lg:px-16 py-10 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-12">
          Smarter Nutrition. Better You.
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {[
            {
              icon: <FaAppleAlt size={40} className="text-purple-700 mx-auto mb-4" />,
              title: "Smart Tracking",
              desc: "Easily log your meals and let AI calculate your macros and calories.",
            },
            {
              icon: <FaChartPie size={40} className="text-purple-600 mx-auto mb-4" />,
              title: "Insightful Analytics",
              desc: "Understand your nutrition balance and optimize for results.",
            },
            {
              icon: <FaUtensils size={40} className="text-purple-500 mx-auto mb-4" />,
              title: "Personalized Plans",
              desc: "Meal plans tailored by AI to match your fitness and wellness goals.",
            },
            {
              icon: <FaLeaf size={40} className="text-emerald-500 mx-auto mb-4" />,
              title: "Clean Eating",
              desc: "Build sustainable habits that promote health and long-term fitness.",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="p-8 bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg hover:border-purple-100 transition-transform duration-300 hover:-translate-y-2"
            >
              {item.icon}
              <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Meal Plan Section */}
      <section className="bg-white py-20 border-t border-gray-100">
        <div className="container mx-auto px-6 lg:px-16 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-12">
            Choose Your Ideal Plan
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                color: "purple",
                title: "Weight Management",
                desc: "Stay fit and energetic with balanced calorie intake and smarter choices.",
                points: ["AI-tracked calories", "Nutrient balance", "Portion control"],
              },
              {
                color: "purple-dark",
                title: "Muscle Gain",
                desc: "High-protein, AI-guided plans to help you build strength and endurance.",
                points: ["High protein meals", "Macro tracking", "Energy optimization"],
              },
              {
                color: "green",
                title: "Sustainable Health",
                desc: "Develop lasting habits with nutritious, easy-to-follow daily meals.",
                points: ["Balanced macros", "Whole foods", "Daily recommendations"],
              },
            ].map((plan, i) => (
              <div
                key={i}
                className="p-10 bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg hover:border-purple-100 transition-transform duration-300 hover:-translate-y-2"
              >
                <h3
                  className={`text-2xl font-bold mb-4 ${
                    plan.color === "purple"
                      ? "text-purple-700"
                      : plan.color === "purple-dark"
                      ? "text-purple-800"
                      : "text-emerald-600"
                  }`}
                >
                  {plan.title}
                </h3>
                <p className="text-gray-600 mb-6">{plan.desc}</p>
                <ul className="text-gray-700 text-sm space-y-2 mb-6">
                  {plan.points.map((p, j) => (
                    <li key={j}>✔ {p}</li>
                  ))}
                </ul>
                <button
                  className={`px-6 py-2 font-semibold text-white rounded-lg shadow-md transition ${
                    plan.color === "purple"
                      ? "bg-purple-700 hover:bg-purple-800"
                      : plan.color === "purple-dark"
                      ? "bg-purple-800 hover:bg-purple-900"
                      : "bg-emerald-600 hover:bg-emerald-700"
                  }`}
                >
                  Get Plan
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default Nutrition;
