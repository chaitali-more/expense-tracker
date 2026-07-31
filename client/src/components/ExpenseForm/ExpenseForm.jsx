import { useState } from "react";
import toast from "react-hot-toast";
import { FaIndianRupeeSign } from "react-icons/fa6";
import api from "../../api";

import {
    HiArrowTrendingDown,
    HiCalendarDays,
    HiCheckCircle,
    HiExclamationTriangle,
    HiPencilSquare,
    HiTag,
} from "react-icons/hi2";
import SubmitButton from "../SubmitButton/SubmitButton";

const getTodayDate = () => {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const ExpenseForm = ({ setTransactions }) => {
  const [errors, setErrors] = useState({});
  const [successMsg, setSuccessMsg] = useState("");

  const handleSubmit = async (formData) => {
    const transactionName = formData.get("transactionName");
    const transactionDate = formData.get("transactionDate");
    const category = formData.get("category");
    const rawAmount = formData.get("amount");
    const amount = parseFloat(rawAmount);

    const newErrors = {};

    if (!transactionName || transactionName.trim() === "") {
      newErrors.transactionName = "Expense title is required.";
    }

    if (!category) {
      newErrors.category = "Please select an expense category.";
    }

    if (!transactionDate) {
      newErrors.transactionDate = "Please select a date.";
    }

    if (!rawAmount || isNaN(amount) || amount <= 0) {
      newErrors.amount = "Enter a valid amount greater than 0.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setSuccessMsg("");
      return;
    }

    setErrors({});

    const transaction = {
      title: transactionName,
      amount,
      category,
      type: "expense",
      date: transactionDate,
    };

    try {
      const res = await api.post("/transactions", transaction);
      if (setTransactions) {
        setTransactions((prev) => [res.data, ...prev]);
      }
      setSuccessMsg("Expense recorded successfully!");
      toast.success("Expense added successfully!");
      setTimeout(() => setSuccessMsg(""), 4000);
    } catch (error) {
      console.error(error);
      toast.error("Failed to add expense. Please try again.");
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-white rounded-2xl shadow-xl shadow-slate-200/60 border border-slate-200/80 my-2 sm:my-4 relative overflow-hidden">
      {/* Top Red Accent Line */}
      <div className="h-1.5 w-full bg-gradient-to-r from-red-600 via-red-500 to-rose-600 rounded-t-2xl" />

      <div className="p-4 sm:p-8 md:p-10 space-y-5 sm:space-y-6">
        {/* Form Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4 sm:pb-5">
          <div className="flex items-center gap-3 sm:gap-3.5">
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl bg-red-50 text-red-600 flex items-center justify-center font-bold shadow-xs shrink-0">
              <HiArrowTrendingDown className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-xl font-extrabold text-slate-900 tracking-tight">
                Record New Expense
              </h2>
              <p className="text-[11px] sm:text-xs text-slate-400 font-medium">
                Add groceries, bills, travel, shopping, or personal expenses
              </p>
            </div>
          </div>
          <span className="hidden sm:inline-block text-[11px] font-bold px-3 py-1 rounded-full bg-red-50 text-red-600 border border-red-200/60">
            - Expense Entry
          </span>
        </div>

        {/* Success Banner */}
        {successMsg && (
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold flex items-center gap-2 animate-fade-in">
            <HiCheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        <form action={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Expense Title */}
            <div className="md:col-span-2">
              <label
                className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5"
                htmlFor="transactionName"
              >
                Expense Title / Description
              </label>
              <div className="relative">
                <HiPencilSquare className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  id="transactionName"
                  type="text"
                  placeholder="e.g. Grocery Store, Electric Bill, Restaurant"
                  name="transactionName"
                  className={`w-full pl-10 pr-3.5 py-3 text-xs font-semibold rounded-xl bg-slate-50 border text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none transition ${
                    errors.transactionName
                      ? "border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-500/10"
                      : "border-slate-200/90 focus:border-red-600 focus:ring-4 focus:ring-red-500/10"
                  }`}
                />
              </div>
              {errors.transactionName && (
                <p className="text-red-500 text-[11px] mt-1.5 font-semibold flex items-center gap-1">
                  <HiExclamationTriangle className="w-3.5 h-3.5" />
                  {errors.transactionName}
                </p>
              )}
            </div>

            {/* Category */}
            <div>
              <label
                className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5"
                htmlFor="category"
              >
                Expense Category
              </label>
              <div className="relative">
                <HiTag className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <select
                  id="category"
                  name="category"
                  defaultValue=""
                  className={`w-full pl-10 pr-3.5 py-3 text-xs font-semibold rounded-xl bg-slate-50 border text-slate-800 focus:bg-white focus:outline-none transition appearance-none cursor-pointer ${
                    errors.category
                      ? "border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-500/10"
                      : "border-slate-200/90 focus:border-red-600 focus:ring-4 focus:ring-red-500/10"
                  }`}
                >
                  <option value="" disabled>
                    Select Category
                  </option>
                  <option value="food">Food & Dining</option>
                  <option value="travel">Travel & Transport</option>
                  <option value="shopping">Shopping & Lifestyle</option>
                  <option value="bills">Bills & Utilities</option>
                  <option value="entertainment">Entertainment</option>
                  <option value="health">Medical & Health</option>
                  <option value="other">Other Expense</option>
                </select>
              </div>
              {errors.category && (
                <p className="text-red-500 text-[11px] mt-1.5 font-semibold flex items-center gap-1">
                  <HiExclamationTriangle className="w-3.5 h-3.5" />
                  {errors.category}
                </p>
              )}
            </div>

            {/* Date */}
            <div>
              <label
                className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5"
                htmlFor="transactionDate"
              >
                Date Spent
              </label>
              <div className="relative">
                <HiCalendarDays className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  id="transactionDate"
                  type="date"
                  name="transactionDate"
                  defaultValue={getTodayDate()}
                  className={`w-full pl-10 pr-3.5 py-3 text-xs font-semibold rounded-xl bg-slate-50 border text-slate-800 focus:bg-white focus:outline-none transition ${
                    errors.transactionDate
                      ? "border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-500/10"
                      : "border-slate-200/90 focus:border-red-600 focus:ring-4 focus:ring-red-500/10"
                  }`}
                />
              </div>
              {errors.transactionDate && (
                <p className="text-red-500 text-[11px] mt-1.5 font-semibold flex items-center gap-1">
                  <HiExclamationTriangle className="w-3.5 h-3.5" />
                  {errors.transactionDate}
                </p>
              )}
            </div>

            {/* Amount */}
            <div className="md:col-span-2">
              <label
                className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5"
                htmlFor="amount"
              >
                Amount (₹)
              </label>
              <div className="relative">
                <FaIndianRupeeSign className="w-3.5 h-3.5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  id="amount"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  name="amount"
                  className={`w-full pl-10 pr-3.5 py-3 text-xs font-semibold rounded-xl bg-slate-50 border text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none transition ${
                    errors.amount
                      ? "border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-500/10"
                      : "border-slate-200/90 focus:border-red-600 focus:ring-4 focus:ring-red-500/10"
                  }`}
                />
              </div>
              {errors.amount && (
                <p className="text-red-500 text-[11px] mt-1.5 font-semibold flex items-center gap-1">
                  <HiExclamationTriangle className="w-3.5 h-3.5" />
                  {errors.amount}
                </p>
              )}
            </div>
          </div>

          <div className="pt-2">
            <SubmitButton
              label="Save Expense Entry"
              pendingText="Saving Expense Entry..."
              icon={<HiArrowTrendingDown className="w-4 h-4" />}
              variant="expense"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ExpenseForm;
