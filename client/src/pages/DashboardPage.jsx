import React from "react";
import { Link } from "react-router-dom";
import { FaWallet, FaIndianRupeeSign } from "react-icons/fa6";
import {
  HiArrowTrendingUp,
  HiArrowTrendingDown,
  HiListBullet,
  HiPlus,
  HiSparkles,
  HiCalendarDays,
} from "react-icons/hi2";
import SEO from "../components/SEO/SEO";

const DashboardPage = ({ Transactions = [], balance, totalIncome, totalExpense }) => {
  const sortedTransactions = [...Transactions].sort((a, b) => {
    const timeA = new Date(a.date || 0).getTime();
    const timeB = new Date(b.date || 0).getTime();
    if (timeA !== timeB) return timeB - timeA;
    return 0;
  });

  const incomeList = sortedTransactions.filter((tx) => tx.type === "income");
  const expenseList = sortedTransactions.filter((tx) => tx.type === "expense");

  const recentIncomes = incomeList.slice(0, 3);
  const recentExpenses = expenseList.slice(0, 3);

  return (
    <div className="space-y-6">
      <SEO
        title="Dashboard Overview | Personal Finance Tracker"
        description="View live total balance, monitor earnings and spending breakdowns, inspect recent transaction entries, and access quick actions on Finance Tracker."
      />
      {/* Hero Greeting Section */}
      <div className="space-y-3">
        <span className="text-xs font-bold text-slate-400">Mon, July 28</span>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Hello, Chaitali
            </h2>
            <p className="text-base sm:text-lg font-medium text-slate-500 mt-1">
              How can I help you manage your finances today?
            </p>
          </div>

          {/* Action Pills Bar */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <Link
              to="/add-income"
              className="px-4 py-2 text-xs font-bold rounded-full bg-slate-900 hover:bg-slate-800 text-white shadow-xs transition cursor-pointer flex items-center gap-1.5"
            >
              <HiSparkles className="w-3.5 h-3.5 text-slate-300" /> Smart Finance AI
            </Link>

            <Link
              to="/add-income"
              className="px-4 py-2 text-xs font-bold rounded-full bg-white hover:bg-slate-100 text-slate-700 border border-slate-200/80 shadow-xs transition cursor-pointer flex items-center gap-1.5"
            >
              <HiPlus className="w-3.5 h-3.5 text-emerald-500" /> Add Income
            </Link>

            <Link
              to="/add-expense"
              className="px-4 py-2 text-xs font-bold rounded-full bg-white hover:bg-slate-100 text-slate-700 border border-slate-200/80 shadow-xs transition cursor-pointer flex items-center gap-1.5"
            >
              <HiPlus className="w-3.5 h-3.5 text-red-500" /> Add Expense
            </Link>
          </div>
        </div>
      </div>

      {/* 3 Stat Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* 1. Total Balance Card */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/70 shadow-xs hover:shadow-md transition-all duration-200 group">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                Total Balance
              </span>
              <span
                className={`text-2xl font-extrabold mt-1 block tracking-tight ${
                  balance >= 0 ? "text-slate-900" : "text-red-600"
                }`}
              >
                ₹{balance.toFixed(2)}
              </span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center text-lg font-bold group-hover:bg-slate-800 group-hover:text-white transition-colors duration-200">
              <FaWallet className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
            <span>Net Worth</span>
            <span className="font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-full text-[10px]">
              Live
            </span>
          </div>
        </div>

        {/* 2. Total Income Card */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/70 shadow-xs hover:shadow-md transition-all duration-200 group">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                Total Income
              </span>
              <span className="text-2xl font-extrabold text-emerald-600 mt-1 block tracking-tight">
                +₹{totalIncome.toFixed(2)}
              </span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-lg font-bold group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-200">
              <HiArrowTrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
            <span>Income</span>
            <span className="font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full text-[10px]">
              Active
            </span>
          </div>
        </div>

        {/* 3. Total Expenses Card */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/70 shadow-xs hover:shadow-md transition-all duration-200 group">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                Total Expenses
              </span>
              <span className="text-2xl font-extrabold text-red-600 mt-1 block tracking-tight">
                -₹{totalExpense.toFixed(2)}
              </span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center text-lg font-bold group-hover:bg-red-600 group-hover:text-white transition-colors duration-200">
              <HiArrowTrendingDown className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
            <span>Expenses</span>
            <span className="font-semibold text-red-600 bg-red-50 px-2 py-0.5 rounded-full text-[10px]">
              Tracked
            </span>
          </div>
        </div>
      </div>

      {/* 2 Feature Cards: Recent 3 Incomes & Recent 3 Expenses */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Income Card (Recent 3 Incomes) */}
        <div className="bg-white p-5 sm:p-7 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all space-y-5 flex flex-col justify-between">
          
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-lg font-bold shadow-xs shrink-0">
                  <HiArrowTrendingUp className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-extrabold text-slate-900">Recent Income</h3>
                  <p className="text-[11px] sm:text-xs text-slate-400 font-medium">Last 3 income entries</p>
                </div>
              </div>
              <span className="text-[11px] sm:text-xs font-bold px-2.5 sm:px-3 py-1 rounded-full bg-slate-100 text-slate-600 border border-slate-200/60 shrink-0">
                {incomeList.length} Total
              </span>
            </div>

            {/* List of Recent 3 Incomes */}
            {recentIncomes.length === 0 ? (
              <div className="py-8 text-center text-slate-400 text-xs bg-slate-50/60 rounded-xl border border-dashed border-slate-200">
                No income entries recorded yet.
              </div>
            ) : (
              <div className="space-y-2.5">
                {recentIncomes.map((tx) => (
                  <div
                    key={tx._id || tx.id}
                    className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50/30 border border-slate-100 hover:bg-slate-50/80 transition"
                  >
                    <div className="space-y-0.5">
                      <span className="font-bold text-slate-800 text-xs block">
                        {tx.title}
                      </span>
                      <div className="flex items-center gap-2 text-[10px] text-slate-400">
                        <span className="flex items-center gap-1">
                          <HiCalendarDays className="w-3 h-3" />
                          {tx.date ? new Date(tx.date).toLocaleDateString("en-GB") : ""}
                        </span>
                        <span>•</span>
                        <span className="capitalize font-semibold text-slate-500">
                          {tx.category || "Salary"}
                        </span>
                      </div>
                    </div>

                    <span className="text-sm font-extrabold text-emerald-600 flex items-center gap-0.5">
                      <span>+</span>
                      <FaIndianRupeeSign className="w-3 h-3" />
                      <span>{Number(tx.amount).toFixed(2)}</span>
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <Link
            to="/add-income"
            className="w-full bg-white hover:bg-slate-50 text-slate-700 border border-slate-200/80 font-bold py-3 px-4 rounded-xl text-xs shadow-xs transition cursor-pointer flex items-center justify-center gap-2 text-center mt-2"
          >
            <HiPlus className="w-4 h-4" />
            <span>Add New Income</span>
          </Link>
        </div>

        {/* Expense Card (Recent 3 Expenses) */}
        <div className="bg-white p-5 sm:p-7 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all space-y-5 flex flex-col justify-between">
          
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl bg-red-50 text-red-600 flex items-center justify-center text-lg font-bold shadow-xs shrink-0">
                  <HiArrowTrendingDown className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-extrabold text-slate-900">Recent Expense</h3>
                  <p className="text-[11px] sm:text-xs text-slate-400 font-medium">Last 3 expense entries</p>
                </div>
              </div>
              <span className="text-[11px] sm:text-xs font-bold px-2.5 sm:px-3 py-1 rounded-full bg-slate-100 text-slate-600 border border-slate-200/60 shrink-0">
                {expenseList.length} Total
              </span>
            </div>

            {/* List of Recent 3 Expenses */}
            {recentExpenses.length === 0 ? (
              <div className="py-8 text-center text-slate-400 text-xs bg-slate-50/60 rounded-xl border border-dashed border-slate-200">
                No expense entries recorded yet.
              </div>
            ) : (
              <div className="space-y-2.5">
                {recentExpenses.map((tx) => (
                  <div
                    key={tx._id || tx.id}
                    className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50/30 border border-slate-100 hover:bg-slate-50/80 transition"
                  >
                    <div className="space-y-0.5">
                      <span className="font-bold text-slate-800 text-xs block">
                        {tx.title}
                      </span>
                      <div className="flex items-center gap-2 text-[10px] text-slate-400">
                        <span className="flex items-center gap-1">
                          <HiCalendarDays className="w-3 h-3" />
                          {tx.date ? new Date(tx.date).toLocaleDateString("en-GB") : ""}
                        </span>
                        <span>•</span>
                        <span className="capitalize font-semibold text-slate-500">
                          {tx.category || "General"}
                        </span>
                      </div>
                    </div>

                    <span className="text-sm font-extrabold text-red-600 flex items-center gap-0.5">
                      <span>-</span>
                      <FaIndianRupeeSign className="w-3 h-3" />
                      <span>{Number(tx.amount).toFixed(2)}</span>
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <Link
            to="/add-expense"
            className="w-full bg-white hover:bg-slate-50 text-slate-700 border border-slate-200/80 font-bold py-3 px-4 rounded-xl text-xs shadow-xs transition cursor-pointer flex items-center justify-center gap-2 text-center mt-2"
          >
            <HiPlus className="w-4 h-4" />
            <span>Add New Expense</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
