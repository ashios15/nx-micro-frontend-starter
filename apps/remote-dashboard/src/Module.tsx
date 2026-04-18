import React from "react";

const MOCK_DATA = [
  { label: "Total Users", value: "12,847", change: "+12%", up: true },
  { label: "Revenue", value: "$48,290", change: "+8%", up: true },
  { label: "Active Sessions", value: "1,423", change: "-3%", up: false },
  { label: "Conversion Rate", value: "3.24%", change: "+0.5%", up: true },
];

/**
 * Dashboard Remote Module — Analytics and data visualization.
 * Loaded dynamically by the shell via Module Federation.
 */
export function DashboardModule() {
  return (
    <div className="max-w-4xl mx-auto py-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h2>

      {/* Stats Grid */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        {MOCK_DATA.map((stat) => (
          <div key={stat.label} className="bg-white rounded-lg border p-5">
            <p className="text-sm text-gray-500 mb-1">{stat.label}</p>
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            <span
              className={`text-sm ${stat.up ? "text-green-600" : "text-red-600"}`}
            >
              {stat.change}
            </span>
          </div>
        ))}
      </div>

      {/* Placeholder Chart */}
      <div className="bg-white rounded-lg border p-6">
        <h3 className="text-lg font-semibold mb-4">Revenue Trend</h3>
        <div className="h-48 bg-gradient-to-r from-blue-50 to-blue-100 rounded-md flex items-center justify-center text-gray-400">
          📊 Chart component goes here (D3.js / Recharts)
        </div>
      </div>

      <p className="mt-4 text-xs text-center text-gray-400">
        Remote Module: <code>remote-dashboard</code> · Port 4202
      </p>
    </div>
  );
}

export default DashboardModule;
