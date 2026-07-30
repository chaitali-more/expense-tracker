import React from "react";
import { FaIndianRupeeSign } from "react-icons/fa6";
import {
  HiArrowTrendingUp,
  HiArrowTrendingDown,
  HiTrash,
  HiShoppingBag,
  HiBuildingStorefront,
  HiTicket,
  HiBanknotes,
  HiSparkles,
  HiDocumentText,
  HiCalendarDays,
} from "react-icons/hi2";

// Helper to map category names to icons and soft badge colors
const getCategoryBadge = (category, type) => {
  const cat = (category || "").toLowerCase();

  if (type === "income" || cat.includes("salary") || cat.includes("freelance")) {
    return {
      icon: <HiBanknotes className="w-4 h-4 text-emerald-600" />,
      bg: "bg-emerald-50 text-emerald-700 border-emerald-200/80",
      label: category || "Income",
    };
  }

  if (cat.includes("food") || cat.includes("grocer") || cat.includes("dining")) {
    return {
      icon: <HiBuildingStorefront className="w-4 h-4 text-amber-600" />,
      bg: "bg-amber-50 text-amber-700 border-amber-200/80",
      label: "Food & Dining",
    };
  }

  if (cat.includes("travel") || cat.includes("flight") || cat.includes("transport")) {
    return {
      icon: <HiTicket className="w-4 h-4 text-blue-600" />,
      bg: "bg-blue-50 text-blue-700 border-blue-200/80",
      label: "Travel & Transport",
    };
  }

  if (cat.includes("shop") || cat.includes("lifestyle")) {
    return {
      icon: <HiShoppingBag className="w-4 h-4 text-violet-600" />,
      bg: "bg-violet-50 text-violet-700 border-violet-200/80",
      label: "Shopping & Lifestyle",
    };
  }

  if (cat.includes("bill") || cat.includes("utility")) {
    return {
      icon: <HiDocumentText className="w-4 h-4 text-rose-600" />,
      bg: "bg-rose-50 text-rose-700 border-rose-200/80",
      label: "Bills & Utilities",
    };
  }

  return {
    icon: type === "income" ? (
      <HiArrowTrendingUp className="w-4 h-4 text-emerald-600" />
    ) : (
      <HiArrowTrendingDown className="w-4 h-4 text-red-600" />
    ),
    bg: "bg-slate-100 text-slate-700 border-slate-200",
    label: category || "General",
  };
};

const TransactionCard = ({ Transactions = [], onDelete }) => {
  if (!Transactions || Transactions.length === 0) {
    return (
      <div className="py-14 px-4 text-center bg-slate-50/60 rounded-2xl border-2 border-dashed border-slate-200/80 space-y-3">
        <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto text-xl">
          <HiSparkles />
        </div>
        <div>
          <h3 className="text-sm font-bold text-slate-800">No Transactions Found</h3>
          <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
            You haven't recorded any entries yet. Click "+ Add Income" or "+ Add Expense" to start tracking!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {Transactions.map((transaction) => {
        const isIncome = transaction.transactionType === "income";
        const badgeInfo = getCategoryBadge(transaction.category, transaction.transactionType);
        const amountNum = Number(transaction.amount) || 0;

        return (
          <div
            key={transaction.id}
            className="group bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md hover:border-slate-300 transition-all duration-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            {/* Left: Icon & Transaction Details */}
            <div className="flex items-center gap-3.5">
              {/* Type Avatar Badge */}
              <div
                className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 shadow-xs transition-transform group-hover:scale-105 ${
                  isIncome
                    ? "bg-emerald-50 text-emerald-600 border border-emerald-200/60"
                    : "bg-red-50 text-red-600 border border-red-200/60"
                }`}
              >
                {isIncome ? (
                  <HiArrowTrendingUp className="w-5 h-5" />
                ) : (
                  <HiArrowTrendingDown className="w-5 h-5" />
                )}
              </div>

              {/* Title & Metadata */}
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h4 className="font-semibold text-base sm:text-lg text-slate-900 tracking-tight">
                    {transaction.transactionName}
                  </h4>
                  <span
                    className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border capitalize flex items-center gap-1 ${badgeInfo.bg}`}
                  >
                    {badgeInfo.label}
                  </span>
                </div>

                <div className="flex items-center gap-3 text-xs text-slate-500 font-medium">
                  <span className="flex items-center gap-1">
                    <HiCalendarDays className="w-3.5 h-3.5" />
                    {transaction.transactionDate}
                  </span>
                  <span>•</span>
                  <span className="capitalize font-semibold text-slate-600">
                    {transaction.transactionType}
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Amount & Actions */}
            <div className="flex items-center justify-between sm:justify-end gap-4 border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-100">
              <div className="text-left sm:text-right">
                <span
                  className={`text-base sm:text-lg font-bold tracking-tight flex items-center gap-0.5 ${
                    isIncome ? "text-emerald-600" : "text-red-600"
                  }`}
                >
                  <span>{isIncome ? "+" : "-"}</span>
                  <FaIndianRupeeSign className="w-3.5 h-3.5" />
                  <span>{amountNum.toFixed(2)}</span>
                </span>
              </div>

              {onDelete && (
                <button
                  onClick={() => onDelete(transaction.id)}
                  className="p-2 rounded-xl text-slate-300 hover:text-red-600 hover:bg-red-50 transition cursor-pointer"
                  title="Delete entry"
                  aria-label="Delete transaction"
                >
                  <HiTrash className="w-4.5 h-4.5" />
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TransactionCard;