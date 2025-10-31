import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import LineChart from "../Charts/LineChart";
import DoughnutChart from "../Charts/DoughnutChart";
import { useAuth } from "../context/AuthContext";
import workoutData from "../data/workoutData.json";
import ExerciseLogTable from "../components/ExerciseLogTable";
import GreetingHeader from "../components/GreetingHeader";
import Sidebar from "../components/Sidebar";
import UpdateProfile from "../components/UpdateProfile";
import axios from "axios";


const Dashboard = () => {
  const { profile } = useAuth();
  const [userLog, setUserLog] = useState({});
  const [output, setOutput] = useState("");
  const [activeTab, setActiveTab] = useState("dashboard");

  // --- Data preparation ---
  const sortedWorkouts = [...workoutData].sort(
    (a, b) => new Date(a.date.join("-")) - new Date(b.date.join("-"))
  );

  const last7 = sortedWorkouts.slice(Math.max(sortedWorkouts.length - 7, 0));
  const last7Labels = last7.map((w) => w.date.join("-"));

  // 🟠 Line Chart: Calories Burned (replacing Total Activity)
  const last7Calories = last7.map((w) => w.calories || 0);
  const caloriesLineData = {
    labels: last7Labels,
    datasets: [
      {
        label: "Calories Burned (kcal)",
        data: last7Calories,
        borderColor: "#ef4444",
        backgroundColor: "rgba(239,68,68,0.15)",
        tension: 0.35,
        pointBackgroundColor: "#ef4444",
        pointBorderColor: "#b91c1c",
        fill: true,
      },
    ],
  };

  // 🍩 Doughnut Chart: Exercise Distribution (includes Walk)
  const exerciseKeys = [
    "pushUp",
    "pullUp",
    "squat",
    "sitUp",
    "bicepCurl",
    "shoulderRaise",
    "shoulderPress",
    "walk", // ✅ Added walk
  ];

  const aggregated = exerciseKeys.map((key) =>
    workoutData.reduce((acc, w) => acc + (Number(w[key]) || 0), 0)
  );

  const exerciseDistributionFromJSON = {
    labels: [
      "Push-Up",
      "Pull-Up",
      "Squat",
      "Sit-Up",
      "Bicep Curl",
      "Shoulder Raise",
      "Shoulder Press",
      "Walk", // ✅ Added walk label
    ],
    datasets: [
      {
        label: "Total per Exercise",
        data: aggregated,
        backgroundColor: [
          "#7e22ce", // Push-Up
          "#22c55e", // Pull-Up
          "#f97316", // Squat
          "#ef4444", // Sit-Up
          "#a78bfa", // Bicep Curl
          "#06b6d4", // Shoulder Raise
          "#f59e0b", // Shoulder Press
          "#3b82f6", // ✅ Walk (new blue color)
        ],
        borderColor: "#ffffff",
        borderWidth: 2,
        hoverOffset: 10,
      },
    ],
  };

  const formatDuration = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    return hrs > 0 ? `${hrs}h ${mins}m` : `${mins}m`;
  };

  const fetchUserLog = async (userId) => {
    try {
      const response = await fetch(
        `http://localhost:8081/api/exercise/latest/${userId}`
      );
      const data = await response.json();
      setUserLog(data);
    } catch (error) {
      console.error("❌ Error fetching user log:", error);
    }
  };

  const runPythonScript = async (exerciseType) => {
    try {
      const response = await fetch("http://localhost:5000/run-python", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ exercise_type: exerciseType }),
      });
      const data = await response.json();
      setOutput(data.message || data.error);
    } catch (error) {
      setOutput("Error starting script");
    }
  };

    const exportJsonData = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:8081/api/export/json/${userId}`);

      console.log("✅ JSON Export Success:", response.data.message);
    } catch (error) {
      console.error("❌ Error exporting JSON:", error);
    }
  };


  const stopPythonScript = async () => {
    try {
      const response = await fetch("http://localhost:5000/stop-python", {
        method: "POST",
      });
      const data = await response.json();
      setOutput(data.message || data.error);
      if (data.message && !data.error) {
        fetchUserLog(profile.userId);
        exportJsonData(profile.userId);
      }
    } catch (error) {
      setOutput("Error stopping script");
    }
  };

  useEffect(() => {
    if (profile?.userId) {
      fetchUserLog(profile.userId);
      exportJsonData(profile.userId);
    }
  }, []);

  const exercises = [
    { name: "Push-Up", key: "push-up" },
    { name: "Pull-Up", key: "pull-up" },
    { name: "Squat", key: "squat" },
    { name: "Walk", key: "walk" },
    { name: "Sit-Up", key: "sit-up" },
    { name: "Bicep Curl", key: "bicep" },
    { name: "Shoulder Raise", key: "shoulder-raise" },
    { name: "Shoulder Press", key: "shoulder-press" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-purple-200 shadow-lg h-screen sticky top-0">
        <Sidebar activeTab={activeTab} onSelectTab={setActiveTab} />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <div className="fixed top-0 left-64 right-0 z-50">
          <Navbar />
        </div>

        <div className="flex-1 mt-24 px-8 pb-28 overflow-y-auto">
          {activeTab === "dashboard" && (
            <>
              {/* Greeting */}
              <div className="flex justify-center mb-8">
                <GreetingHeader />
              </div>

              {/* Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <div className="bg-white border border-purple-200 shadow-lg rounded-2xl p-6 hover:shadow-xl transition">
                  <h3 className="text-lg font-semibold text-purple-700 mb-2">
                    Workouts
                  </h3>
                  <p className="text-gray-600 text-xl">
                    Completed: {userLog ? userLog.totalExercisesCompleted : "—"}
                  </p>
                </div>
                <div className="bg-white border border-purple-200 shadow-lg rounded-2xl p-6 hover:shadow-xl transition">
                  <h3 className="text-lg font-semibold text-purple-700 mb-2">
                    Calories Burned
                  </h3>
                  <p className="text-gray-600 text-xl">
                    Today: {userLog ? userLog.calories : "—"} kcal
                  </p>
                </div>
                <div className="bg-white border border-purple-200 shadow-lg rounded-2xl p-6 hover:shadow-xl transition">
                  <h3 className="text-lg font-semibold text-purple-700 mb-2">
                    Active Time
                  </h3>
                  <p className="text-gray-600 text-xl">
                    Today: {userLog ? formatDuration(userLog.duration) : "—"}
                  </p>
                </div>
              </div>

              {/* Start Exercise */}
              <h2 className="text-3xl font-bold mb-6 text-purple-700">
                Start Exercise
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {exercises.map((ex) => (
                  <div
                    key={ex.key}
                    className="rounded-2xl bg-gradient-to-br from-purple-100 to-white border border-purple-200 shadow-md p-5 flex flex-col items-center justify-between hover:shadow-xl transition transform hover:scale-105"
                  >
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">
                      {ex.name}
                    </h3>
                    <button
                      onClick={() => runPythonScript(ex.key)}
                      className="px-5 py-2 rounded-full font-bold bg-purple-700 text-white hover:bg-purple-800 transition"
                    >
                      Start
                    </button>
                  </div>
                ))}
              </div>

              {/* Script Output */}
              <div className="mt-10 bg-white border border-purple-200 rounded-2xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-purple-700 mb-3">
                  Script Output
                </h3>
                <p className="text-gray-700 text-lg">
                  {output || "No exercise running..."}
                </p>
                <button
                  onClick={stopPythonScript}
                  className="mt-4 px-6 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition"
                >
                  Stop All Scripts
                </button>
              </div>

              {/* Performance Charts */}
              <div className="mt-10">
                <h2 className="text-3xl font-bold mb-6 text-purple-700">
                  Performance Charts
                </h2>
                <div className="flex flex-col md:flex-row gap-6">
                  {/* 🟠 Line Chart: Calories Burned */}
                  <div className="flex-1 bg-white border border-purple-200 shadow-lg rounded-2xl p-6 hover:shadow-xl transition">
                    <LineChart
                      data={caloriesLineData}
                      title="Calories Burned (Last 7 days)"
                    />
                  </div>

                  {/* 🍩 Doughnut Chart: Exercise Distribution */}
                  <div className="flex-1 bg-white border border-purple-200 shadow-lg rounded-2xl p-6 hover:shadow-xl transition">
                    <DoughnutChart
                      data={exerciseDistributionFromJSON}
                      title="Exercise Distribution (All time)"
                    />
                  </div>
                </div>
              </div>

              {/* Exercise Logs */}
              <div className="mt-10">
                <ExerciseLogTable userId={profile.userId} />
              </div>
            </>
          )}

          {/* Other Tabs */}
          {activeTab === "activity" && (
            <div className="text-center text-purple-700 font-semibold text-2xl mt-10">
              🚴 Activity Logs Coming Soon...
            </div>
          )}

          {activeTab === "updateProfile" && (
            <>
              <div className="flex justify-center mb-8">
                <GreetingHeader />
              </div>
              <div className="bg-white border border-purple-200 shadow-lg rounded-2xl p-8 max-w-2xl mx-auto">
                <UpdateProfile />
              </div>
            </>
          )}

          {activeTab === "analytics" && (
            <div className="text-center text-purple-700 font-semibold text-2xl mt-10">
              📊 Analytics Section Coming Soon...
            </div>
          )}

          {activeTab === "settings" && (
            <div className="text-center text-purple-700 font-semibold text-2xl mt-10">
              ⚙️ Profile Settings Page Coming Soon...
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
