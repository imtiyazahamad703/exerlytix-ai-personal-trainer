import React, { useEffect, useState } from "react";
import axios from "axios";

const ExerciseLogTable = ({ userId }) => {
  const [logs, setLogs] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetchLogs(page);
  }, [page]);

  const fetchLogs = async (pageNumber) => {
    try {
      const response = await axios.get(
        `http://localhost:8081/api/logs/${userId}?page=${pageNumber}`
      );

      setLogs(response.data.content);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching logs:", error);
    }
  };

  const handleNext = () => {
    if (page < totalPages - 1) {
      setPage(page + 1);
    }
  };

  const handlePrev = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Exercise History</h2>
      <table className="min-w-full border border-gray-300 text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">Date</th>
            <th className="border p-2">Push-ups</th>
            <th className="border p-2">Pull-ups</th>
            <th className="border p-2">Squats</th>
            <th className="border p-2">Sit-ups</th>
            <th className="border p-2">Bicep Curl</th>
            <th className="border p-2">Shoulder Press</th>
            <th className="border p-2">Shoulder Raise</th>
          </tr>
        </thead>
        <tbody>
          {logs.length > 0 ? (
            logs.map((log, index) => (
              <tr key={index} className="text-center">
                <td className="border p-2">{log.date}</td>
                <td className="border p-2">{log.pushUp}</td>
                <td className="border p-2">{log.pullUp}</td>
                <td className="border p-2">{log.squat}</td>
                <td className="border p-2">{log.sitUp}</td>
                <td className="border p-2">{log.bicepCurl}</td>
                <td className="border p-2">{log.shoulderPress}</td>
                <td className="border p-2">{log.shoulderRaise}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="text-center p-3">
                No logs found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination Buttons */}
      <div className="flex justify-between mt-4">
        <button
          onClick={handlePrev}
          disabled={page === 0}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span className="text-gray-700">
          Page {page + 1} of {totalPages}
        </span>
        <button
          onClick={handleNext}
          disabled={page === totalPages - 1}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ExerciseLogTable;
