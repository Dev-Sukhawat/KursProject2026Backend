import React from "react";

export default function StatsCard({ title, value, subtitle, icon: Icon }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border p-5 hover:shadow-md transition">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm text-gray-500">{title}</h3>
        {Icon && <Icon size={18} className="text-gray-400" />}
      </div>

      <div className="text-2xl font-semibold">{value}</div>

      {subtitle && <p className="text-xs text-gray-400 mt-1">{subtitle}</p>}
    </div>
  );
}
