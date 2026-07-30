import React from "react";
import { HiFunnel, HiCalendarDays, HiChevronDown, HiArrowsUpDown } from "react-icons/hi2";

const FilterBar = ({
  filter,
  setFilter,
  dateFilter = "all",
  setDateFilter,
  sortBy = "date_desc",
  setSortBy,
}) => {
  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 w-full sm:w-auto">
      {/* 1. Transaction Type Filter */}
      <div className="relative flex-1 sm:flex-initial inline-flex items-center group w-full sm:w-auto">
        <HiFunnel className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none transition-colors" />

        <select
          value={filter}
          onChange={(e) => setFilter && setFilter(e.target.value)}
          className="w-full pl-10 pr-9 py-2.5 text-xs font-bold rounded-xl bg-slate-50/90 border border-slate-200/90 text-slate-800 focus:bg-white focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 shadow-xs hover:border-slate-300 transition-all duration-200 appearance-none cursor-pointer"
        >
          <option value="all">All Types</option>
          <option value="income">Income Only (+)</option>
          <option value="expense">Expense Only (-)</option>
        </select>

        <HiChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none transition-transform group-hover:scale-110" />
      </div>

      {/* 2. Date Range Filter */}
      {setDateFilter && (
        <div className="relative flex-1 sm:flex-initial inline-flex items-center group w-full sm:w-auto">
          <HiCalendarDays className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none transition-colors" />

          <select
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="w-full pl-10 pr-9 py-2.5 text-xs font-bold rounded-xl bg-slate-50/90 border border-slate-200/90 text-slate-800 focus:bg-white focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 shadow-xs hover:border-slate-300 transition-all duration-200 appearance-none cursor-pointer"
          >
            <option value="all">All Time</option>
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="last_month">Last Month</option>
            <option value="year">This Year</option>
          </select>

          <HiChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none transition-transform group-hover:scale-110" />
        </div>
      )}

      {/* 3. Date & Amount Sort Order */}
      {setSortBy && (
        <div className="relative flex-1 sm:flex-initial inline-flex items-center group w-full sm:w-auto">
          <HiArrowsUpDown className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none transition-colors" />

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full pl-10 pr-9 py-2.5 text-xs font-bold rounded-xl bg-slate-50/90 border border-slate-200/90 text-slate-800 focus:bg-white focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 shadow-xs hover:border-slate-300 transition-all duration-200 appearance-none cursor-pointer"
          >
            <option value="date_desc">Date: Newest First</option>
            <option value="date_asc">Date: Oldest First</option>
          </select>

          <HiChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none transition-transform group-hover:scale-110" />
        </div>
      )}
    </div>
  );
};

export default FilterBar;