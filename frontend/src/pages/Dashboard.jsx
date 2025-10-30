import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import LineChart from "../Charts/LineChart";
import DoughnutChart from "../Charts/DoughnutChart";
import WorkoutHistoryTable from "../components/WorkoutHistoryTable";
import { useAuth } from "../context/AuthContext";
import workoutData from "../data/workoutData.json";


const Dashboard = () => {
  const { profile } = useAuth();
  const [userLog, setUserLog] = useState({});
  const [output, setOutput] = useState("");

  // --- derive charts from workoutData.json ---
const sortedWorkouts = [...workoutData].sort(
  (a, b) => new Date(a.date) - new Date(b.date)
);

// take the last 7 entries (most recent 7 dates)
const last7 = sortedWorkouts.slice(Math.max(sortedWorkouts.length - 7, 0));

// labels for last 7 (format: YYYY-MM-DD)
const last7Labels = last7.map((w) => w.date);

// total activity per day (sum of numeric exercise fields)
const last7Totals = last7.map((w) => {
  // sum all numeric keys except date
  return Object.keys(w).reduce((sum, k) => {
    if (k === "date") return sum;
    const n = Number(w[k]) || 0;
    return sum + n;
  }, 0);
});

// Line chart data (Total activity per day)
const activityLineData = {
  labels: last7Labels,
  datasets: [
    {
      label: "Total Activity (reps / steps)",
      data: last7Totals,
      borderColor: "#7e22ce", // purple-700
      backgroundColor: "rgba(126,34,206,0.12)",
      tension: 0.35,
      pointBackgroundColor: "#9333ea",
      pointBorderColor: "#7e22ce",
    },
  ],
};

// Aggregate totals per exercise across the whole dataset
const exerciseKeys = [
  "pushUp",
  "pullUp",
  "squat",
  "sitUp",
  "bicepCurl",
  "shoulderRaise",
  "shoulderPress",
];

const aggregated = exerciseKeys.map((key) =>
  workoutData.reduce((acc, w) => acc + (Number(w[key]) || 0), 0)
);

// Doughnut chart with distinct colors for each exercise
const exerciseDistributionFromJSON = {
  labels: [
    "Push-Up",
    "Pull-Up",
    "Squat",
    "Sit-Up",
    "Bicep Curl",
    "Shoulder Raise",
    "Shoulder Press",
  ],
  datasets: [
    {
      label: "Total per Exercise",
      data: aggregated,
      backgroundColor: [
        "#7e22ce", // purple
        "#22c55e", // green
        "#f97316", // orange
        "#ef4444", // red
        "#a78bfa", // indigo-lilac
        "#06b6d4", // teal
        "#f59e0b", // amber
      ],
      borderColor: "#ffffff",
      borderWidth: 2,
      hoverOffset: 10,
    },
  ],
};

  const formatDuration = (minutes) => {
    const hrs = Math.floor(minutes / 60);
    const mins = Math.floor(minutes % 60);
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

  const stopPythonScript = async () => {
    try {
      const response = await fetch("http://localhost:5000/stop-python", {
        method: "POST",
      });
      const data = await response.json();
      setOutput(data.message || data.error);
      if (data.message && !data.error) {
        fetchUserLog(profile.userId);
      }
    } catch (error) {
      setOutput("Error stopping script");
    }
  };

  useEffect(() => {
    if (profile?.userId) {
      fetchUserLog(profile.userId);
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
    <div className="flex flex-col min-h-screen bg-white">
      {/* Navbar */}
      <div className="fixed top-0 left-0 w-full z-50">
        <Navbar />
      </div>

      <div className="flex flex-1 mt-24 px-6 lg:px-16">
        <div className="flex-1 flex flex-col pb-10">
          {/* Top Stats Section */}
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

          {/* Start Exercise Section */}
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

          {/* Charts Section */}
          {/* Charts Section */}
<div className="mt-10">
  <h2 className="text-3xl font-bold mb-6 text-purple-700">
    Performance Charts
  </h2>

  <div className="flex flex-col md:flex-row gap-6">
    {/* Line: Total Activity (from workoutData.json) */}
    <div className="flex-1 bg-white border border-purple-200 shadow-lg rounded-2xl p-6 hover:shadow-xl transition">
      <LineChart data={activityLineData} title="Total Activity (Last 7 days)" />
    </div>

    {/* Doughnut: Aggregated exercise distribution (from workoutData.json) */}
    <div className="flex-1 bg-white border border-purple-200 shadow-lg rounded-2xl p-6 hover:shadow-xl transition">
      <DoughnutChart
        data={exerciseDistributionFromJSON}
        title="Exercise Distribution (All time)"
      />
    </div>
  </div>
</div>

          {/* Workout History */}
          <div className="mt-10">
            <WorkoutHistoryTable />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
