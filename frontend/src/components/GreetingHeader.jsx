import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

const GreetingHeader = () => {
  const { profile } = useAuth();
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good Morning");
    else if (hour < 17) setGreeting("Good Afternoon");
    else setGreeting("Good Evening");
  }, []);

  // ✅ If profile picture available
  const renderProfileImage = () => {
    if (profile?.profilePicture && profile.profilePicture !== "null") {
      return (
        <img
          src={`data:image/jpeg;base64,${profile.profilePicture}`}
          alt="Profile"
          className="w-16 h-16 rounded-full object-cover border-2 border-purple-500 shadow-md"
        />
      );
    } else {
      const initial = profile?.name
        ? profile.name.charAt(0).toUpperCase()
        : "?";
      return (
        <div className="w-16 h-16 rounded-full bg-purple-600 flex items-center justify-center text-white text-2xl font-bold border-2 border-purple-300 shadow-md">
          {initial}
        </div>
      );
    }
  };

  return (
    <div className="flex items-center justify-between w-full bg-gradient-to-r from-purple-100 to-white border border-purple-200 rounded-2xl shadow-lg p-5 hover:shadow-xl transition-all">
      
      {/* 👈 Left Side: Greeting & Name */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800">
          {greeting},{" "}
          <span className="text-purple-700">
            {profile?.name ? profile.name.split(" ")[0] : "User"} 👋
          </span>
        </h2>
        <p className="text-gray-600 mt-1 text-sm">
          Welcome back! Ready for your next workout?
        </p>
      </div>

      {/* 👉 Right Side: Profile + Email */}
      <div className="flex items-center gap-4">
        {renderProfileImage()}
        <div className="flex flex-col text-right">
          <span className="text-lg font-semibold text-gray-800">
            {profile?.name}
          </span>
          <span className="text-sm text-gray-500">{profile?.email}</span>
        </div>
      </div>
    </div>
  );
};

export default GreetingHeader;
