import React, { useMemo } from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
} from "recharts";
import { FaIndianRupeeSign } from "react-icons/fa6";
import {
  HiChartPie,
  HiChartBar,
  HiArrowTrendingDown,
  HiSparkles,
} from "react-icons/hi2";

// Vibrant curated color palette for category pie chart
const CATEGORY_COLORS = {
  food: "#f59e0b",
  travel: "#3b82f6",
  shopping: "#8b5cf6",
  bills: "#ef4444",
  entertainment: "#ec4899",
  health: "#14b8a6",
  salary: "#10b981",
  freelance: "#06b6d4",
  investments: "#6366f1",
  gift: "#a855f7",
  other: "#64748b",
};

const DEFAULT_EXPENSE_PIE = [
  { name: "Food & Dining", value: 3500, categoryKey: "food" },
  { name: "Bills & Utilities", value: 2400, categoryKey: "bills" },
  { name: "Shopping", value: 1800, categoryKey: "shopping" },
  { name: "Travel & Transport", value: 1200, categoryKey: "travel" },
  { name: "Entertainment", value: 800, categoryKey: "entertainment" },
];

const DEFAULT_INCOME_VS_EXPENSE = [
  { month: "Jan", Income: 45000, Expense: 28000 },
  { month: "Feb", Income: 52000, Expense: 31000 },
  { month: "Mar", Income: 48000, Expense: 26000 },
  { month: "Apr", Income: 60000, Expense: 34000 },
  { month: "May", Income: 55000, Expense: 29000 },
  { month: "Jun", Income: 65000, Expense: 32000 },
];

const DEFAULT_SPENDING_TREND = [
  { date: "Jul 01", Spending: 1200 },
  { date: "Jul 05", Spending: 3500 },
  { date: "Jul 10", Spending: 2100 },
  { date: "Jul 15", Spending: 4800 },
  { date: "Jul 20", Spending: 1900 },
  { date: "Jul 25", Spending: 5400 },
  { date: "Jul 28", Spending: 2800 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900 text-white p-3 rounded-xl shadow-xl text-xs space-y-1 border border-slate-700">
        <p className="font-bold border-b border-slate-700 pb-1 text-slate-300">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="flex items-center justify-between gap-4 font-semibold" style={{ color: entry.color || entry.fill }}>
            <span>{entry.name}:</span>
            <span>₹{Number(entry.value).toLocaleString()}</span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const Statistics = ({ Transactions = [] }) => {
  // 1. Compute Expense by Category (Pie Chart Data)
  const categoryPieData = useMemo(() => {
    const expenses = Transactions.filter((tx) => tx.transactionType === "expense");

    if (expenses.length === 0) return DEFAULT_EXPENSE_PIE;

    const categoryMap = {};
    expenses.forEach((tx) => {
      const cat = (tx.category || "other").toLowerCase();
      const amt = Number(tx.amount) || 0;
      categoryMap[cat] = (categoryMap[cat] || 0) + amt;
    });

    return Object.keys(categoryMap).map((catKey) => {
      const formattedName = catKey.charAt(0).toUpperCase() + catKey.slice(1);
      return {
        name: formattedName,
        value: categoryMap[catKey],
        categoryKey: catKey,
      };
    });
  }, [Transactions]);

  // 2. Compute Income vs Expense (Bar Chart Data)
  const incomeVsExpenseData = useMemo(() => {
    if (Transactions.length === 0) return DEFAULT_INCOME_VS_EXPENSE;

    const dateGroup = {};
    Transactions.forEach((tx) => {
      const dateKey = tx.transactionDate || "Recent";
      if (!dateGroup[dateKey]) {
        dateGroup[dateKey] = { date: dateKey, Income: 0, Expense: 0 };
      }
      const amt = Number(tx.amount) || 0;
      if (tx.transactionType === "income") {
        dateGroup[dateKey].Income += amt;
      } else {
        dateGroup[dateKey].Expense += amt;
      }
    });

    return Object.values(dateGroup).sort((a, b) => new Date(a.date) - new Date(b.date));
  }, [Transactions]);

  // 3. Compute Spending Trend (Line Chart Data)
  const spendingTrendData = useMemo(() => {
    const expenses = Transactions.filter((tx) => tx.transactionType === "expense");

    if (expenses.length === 0) return DEFAULT_SPENDING_TREND;

    const dateMap = {};
    expenses.forEach((tx) => {
      const d = tx.transactionDate || "Today";
      dateMap[d] = (dateMap[d] || 0) + Number(tx.amount || 0);
    });

    return Object.keys(dateMap)
      .map((d) => ({ date: d, Spending: dateMap[d] }))
      .sort((a, b) => new Date(a.date) - new Date(b.date));
  }, [Transactions]);

  // Summary Metrics
  const totalIncomeVal = Transactions.filter((t) => t.transactionType === "income").reduce((s, t) => s + Number(t.amount || 0), 0);
  const totalExpenseVal = Transactions.filter((t) => t.transactionType === "expense").reduce((s, t) => s + Number(t.amount || 0), 0);

  return (
    <div className="space-y-8">
      {/* Top Metric Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-emerald-50/60 p-4 rounded-2xl border border-emerald-100 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              Total Income Analyzed
            </span>
            <span className="text-xl font-extrabold text-emerald-600 mt-0.5 block">
              +₹{totalIncomeVal.toFixed(2)}
            </span>
          </div>
          <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-sm shadow-xs">
            <FaIndianRupeeSign className="w-4 h-4" />
          </div>
        </div>

        <div className="bg-red-50/60 p-4 rounded-2xl border border-red-100 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              Total Expense Analyzed
            </span>
            <span className="text-xl font-extrabold text-red-600 mt-0.5 block">
              -₹{totalExpenseVal.toFixed(2)}
            </span>
          </div>
          <div className="w-9 h-9 rounded-xl bg-red-600 text-white flex items-center justify-center font-bold text-sm shadow-xs">
            <HiArrowTrendingDown className="w-4 h-4" />
          </div>
        </div>

        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              Total Data Entries
            </span>
            <span className="text-xl font-extrabold text-slate-800 mt-0.5 block">
              {Transactions.length} Entries
            </span>
          </div>
          <div className="w-9 h-9 rounded-xl bg-slate-800 text-white flex items-center justify-center font-bold text-sm shadow-xs">
            <HiSparkles className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Grid Layout for Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 1. Expense by Category (Pie Chart) */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
                <HiChartPie className="w-4.5 h-4.5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">Expense by Category</h3>
                <p className="text-[11px] text-slate-400 font-medium">Category breakdown distribution</p>
              </div>
            </div>
            <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
              Pie Chart
            </span>
          </div>

          <div className="h-72 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryPieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={95}
                  paddingAngle={4}
                  dataKey="value"
                  label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                  labelLine={false}
                >
                  {categoryPieData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={
                        CATEGORY_COLORS[entry.categoryKey] ||
                        Object.values(CATEGORY_COLORS)[index % Object.keys(CATEGORY_COLORS).length]
                      }
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: "11px", pt: "10px" }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 2. Income vs Expense (Bar Chart) */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                <HiChartBar className="w-4.5 h-4.5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">Income vs Expense</h3>
                <p className="text-[11px] text-slate-400 font-medium">Comparison of inflows & outflows</p>
              </div>
            </div>
            <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
              Bar Chart
            </span>
          </div>

          <div className="h-72 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={incomeVsExpenseData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="date" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "#64748b" }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "#64748b" }} />
                <Tooltip content={<CustomTooltip />} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: "11px" }} />
                <Bar dataKey="Income" fill="#10b981" radius={[6, 6, 0, 0]} barSize={24} />
                <Bar dataKey="Expense" fill="#ef4444" radius={[6, 6, 0, 0]} barSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 3. Spending Trend (Line Chart - Full Width) */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-red-50 text-red-600 flex items-center justify-center font-bold">
                <HiArrowTrendingDown className="w-4.5 h-4.5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">Spending Trend</h3>
                <p className="text-[11px] text-slate-400 font-medium">Timeline of daily & weekly expenses</p>
              </div>
            </div>
            <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-red-50 text-red-700 border border-red-200">
              Line Chart
            </span>
          </div>

          <div className="h-72 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={spendingTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="date" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "#64748b" }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "#64748b" }} />
                <Tooltip content={<CustomTooltip />} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: "11px" }} />
                <Line
                  type="monotone"
                  dataKey="Spending"
                  stroke="#ef4444"
                  strokeWidth={3}
                  dot={{ r: 4, fill: "#ef4444", strokeWidth: 2, stroke: "#ffffff" }}
                  activeDot={{ r: 7 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;