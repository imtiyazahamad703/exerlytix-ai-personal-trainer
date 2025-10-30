import React, { useEffect, useState } from "react";
import workoutData from "../data/workoutData.json";

const WorkoutHistoryTable = () => {
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    setWorkouts(workoutData);
  }, []);

  return (
    <div className="p-6 bg-white rounded-2xl shadow-lg border border-purple-200">
      <h2 className="text-3xl font-bold mb-6 text-purple-700 text-center">
        Workout History
      </h2>

      <div className="overflow-x-auto rounded-xl shadow-inner">
        <table className="min-w-full table-auto border-collapse">
          {/* Table Header */}
          <thead className="bg-purple-700 text-white text-sm uppercase tracking-wider">
            <tr>
              <th className="px-4 py-3 text-left">Date</th>
              <th className="px-4 py-3 text-left">Push-Up</th>
              <th className="px-4 py-3 text-left">Pull-Up</th>
              <th className="px-4 py-3 text-left">Squat</th>
              <th className="px-4 py-3 text-left">Walk</th>
              <th className="px-4 py-3 text-left">Sit-Up</th>
              <th className="px-4 py-3 text-left">Bicep Curl</th>
              <th className="px-4 py-3 text-left">Shoulder Raise</th>
              <th className="px-4 py-3 text-left">Shoulder Press</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="text-gray-800">
            {workouts.map((workout, index) => (
              <tr
                key={index}
                className={`transition duration-200 ${
                  index % 2 === 0 ? "bg-purple-50" : "bg-white"
                } hover:bg-purple-100 hover:shadow-md`}
              >
                <td className="px-4 py-3 font-medium text-gray-900">
                  {workout.date}
                </td>
                <td className="px-4 py-3">{workout.pushUp}</td>
                <td className="px-4 py-3">{workout.pullUp}</td>
                <td className="px-4 py-3">{workout.squat}</td>
                <td className="px-4 py-3">{workout.walk}</td>
                <td className="px-4 py-3">{workout.sitUp}</td>
                <td className="px-4 py-3">{workout.bicepCurl}</td>
                <td className="px-4 py-3">{workout.shoulderRaise}</td>
                <td className="px-4 py-3">{workout.shoulderPress}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Small aesthetic footer accent */}
      <div className="h-1 mt-4 bg-gradient-to-r from-purple-700 via-purple-500 to-purple-700 rounded-full"></div>
    </div>
  );
};

export default WorkoutHistoryTable;
