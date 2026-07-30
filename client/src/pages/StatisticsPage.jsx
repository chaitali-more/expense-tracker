import React from "react";
import Statistics from "../components/Statistics/Statistics";
import SEO from "../components/SEO/SEO";

const StatisticsPage = ({ Transactions }) => {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200/70 shadow-xs">
      <SEO
        title="Financial Statistics | Personal Finance Tracker"
        description="Analyze your spending habits, view interactive expense category pie charts, income vs expense bar charts, and historical timeline spending trends."
      />
      <h2 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-3 mb-4">
        Financial Statistics & Analytics
      </h2>
      <Statistics Transactions={Transactions} />
    </div>
  );
};

export default StatisticsPage;
