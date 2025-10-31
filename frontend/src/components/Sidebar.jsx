import React from "react";

const Sidebar = ({ activeTab, onSelectTab }) => {
  const tabs = [
    { id: "dashboard", label: "🏠 Dashboard" },
    { id: "activity", label: "🔥 Activity" },
    { id: "analytics", label: "📊 Analytics" },
    { id: "settings", label: "⚙️ Settings" },
  ];

  return (
    <div className="fixed top-0 left-0 h-screen w-64 bg-gradient-to-b from-purple-800 to-purple-600 text-white flex flex-col justify-between shadow-xl">
      {/* Logo */}
      <div className="px-6  border-b border-purple-500 flex items-center gap-3">
        <span className="text-3xl">💪</span>
        <h1 className="text-2xl font-bold">Exerlytix</h1>
      </div>

      {/* Navigation */}
      <div className="flex flex-col  space-y-2 px-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onSelectTab(tab.id)}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-lg font-medium transition ${
              activeTab === tab.id
                ? "bg-purple-700 shadow-md"
                : "hover:bg-purple-700/40"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-purple-500 text-sm text-purple-200 text-center">
        © 2025 Exerlytix
      </div>
    </div>
  );
};

export default Sidebar;
