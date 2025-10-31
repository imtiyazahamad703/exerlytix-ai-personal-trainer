import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const UpdateProfile = () => {
  const { profile, updateProfile } = useAuth();

  const [name, setName] = useState(profile?.name || "");
  const [email] = useState(profile?.email || "");
  const [password, setPassword] = useState("");
  const [profilePic, setProfilePic] = useState(null);
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => {
    setProfilePic(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("userId", profile?.userId);
    formData.append("name", name);
    if (password) formData.append("password", password);
    if (profilePic) formData.append("profileImage", profilePic);

    try {
      const response = await axios.put(
        "http://localhost:8081/api/update-profile",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const data = response.data;

      if (data.message === "Profile updated successfully") {
        setMessage("✅ Profile updated successfully!");
        setTimeout(() => {
          setMessage("");
        }, 1000);
        const updatedUser = {
          ...profile,
          name: data.name,
          profilePicture: data.profileImage,
        };
        localStorage.setItem("user", JSON.stringify(updatedUser));
        updateProfile({
          name: data.name,
          profilePicture: data.profileImage,
        });
      } else {
        setMessage("❌ Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      setMessage("❌ Something went wrong");
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-purple-700 mb-4">
        Update Your Profile
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Full Name */}
        <div>
          <label className="block text-gray-700 mb-1">Full Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* Email (disabled) */}
        <div>
          <label className="block text-gray-700 mb-1">Email</label>
          <input
            type="email"
            value={email}
            disabled
            className="w-full p-3 border rounded-lg bg-gray-100 text-gray-500"
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-gray-700 mb-1">New Password</label>
          <input
            type="password"
            placeholder="Enter new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* Profile Picture */}
        <div>
          <label className="block text-gray-700 mb-1">Profile Picture</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-purple-700 text-white py-3 rounded-lg font-semibold hover:bg-purple-800 transition"
        >
          Update Profile
        </button>
      </form>

      {/* Message */}
      {message && (
        <p className="mt-4 text-center text-gray-700 font-medium">{message}</p>
      )}
    </div>
  );
};

export default UpdateProfile;
