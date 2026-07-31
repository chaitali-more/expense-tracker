import { useState } from "react";
import toast from "react-hot-toast";
import api from "../../api";
import { FaIndianRupeeSign } from "react-icons/fa6";
import {
    HiArrowTrendingUp,
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

const IncomeForm = ({ setTransactions }) => {
  const [errors, setErrors] = useState({});
  const [successMsg, setSuccessMsg] = useState("");

  const handleSubmit = async  (formData) => {
    const transactionName = formData.get("transactionName");
    const transactionDate = formData.get("transactionDate");
    const category = formData.get("category");
    const rawAmount = formData.get("amount");
    const amount = parseFloat(rawAmount);

    const newErrors = {};

    if (!transactionName || transactionName.trim() === "") {
      newErrors.transactionName = "Income title is required.";
    }

    if (!category) {
      newErrors.category = "Please select an income category.";
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
      type: "income",
      date: transactionDate,
    };

    try {
      const res = await api.post("/transactions", transaction);
      if (setTransactions) {
        setTransactions((prev) => [res.data, ...prev]);
      }
      toast.success("Income added successfully!");
      setSuccessMsg("Income recorded successfully!");
      setTimeout(() => setSuccessMsg(""), 4000);
    } catch (error) {
      console.error(error);
      toast.error("Failed to add income. Please try again.");
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-white rounded-2xl shadow-xl shadow-slate-200/60 border border-slate-200/80 my-2 sm:my-4 relative overflow-hidden">
      {/* Top Emerald Accent Line */}
      <div className="h-1.5 w-full bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 rounded-t-2xl" />

      <div className="p-4 sm:p-8 md:p-10 space-y-5 sm:space-y-6">
        {/* Form Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4 sm:pb-5">
          <div className="flex items-center gap-3 sm:gap-3.5">
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold shadow-xs shrink-0">
              <HiArrowTrendingUp className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-xl font-extrabold text-slate-900 tracking-tight">
                Record New Income
              </h2>
              <p className="text-[11px] sm:text-xs text-slate-400 font-medium">
                Add salary, bonus, freelance earnings, or investments
              </p>
            </div>
          </div>
          <span className="hidden sm:inline-block text-[11px] font-bold px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200/60">
            + Income Entry
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
            {/* Income Title */}
            <div className="md:col-span-2">
              <label
                className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5"
                htmlFor="transactionName"
              >
                Income Title / Source
              </label>
              <div className="relative">
                <HiPencilSquare className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  id="transactionName"
                  type="text"
                  placeholder="e.g. Monthly Salary, Freelance Project"
                  name="transactionName"
                  className={`w-full pl-10 pr-3.5 py-3 text-xs font-semibold rounded-xl bg-slate-50 border text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none transition ${
                    errors.transactionName
                      ? "border-rose-300 focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10"
                      : "border-slate-200/90 focus:border-emerald-600 focus:ring-4 focus:ring-emerald-500/10"
                  }`}
                />
              </div>
              {errors.transactionName && (
                <p className="text-rose-500 text-[11px] mt-1.5 font-semibold flex items-center gap-1">
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
                Income Category
              </label>
              <div className="relative">
                <HiTag className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <select
                  id="category"
                  name="category"
                  defaultValue=""
                  className={`w-full pl-10 pr-3.5 py-3 text-xs font-semibold rounded-xl bg-slate-50 border text-slate-800 focus:bg-white focus:outline-none transition appearance-none cursor-pointer ${
                    errors.category
                      ? "border-rose-300 focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10"
                      : "border-slate-200/90 focus:border-emerald-600 focus:ring-4 focus:ring-emerald-500/10"
                  }`}
                >
                  <option value="" disabled>
                    Select Category
                  </option>
                  <option value="salary">Salary & Wages</option>
                  <option value="freelance">Freelance & Business</option>
                  <option value="investments">Investments & Dividends</option>
                  <option value="gift">Gifts & Grants</option>
                  <option value="other">Other Income</option>
                </select>
              </div>
              {errors.category && (
                <p className="text-rose-500 text-[11px] mt-1.5 font-semibold flex items-center gap-1">
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
                Date Received
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
                      ? "border-rose-300 focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10"
                      : "border-slate-200/90 focus:border-emerald-600 focus:ring-4 focus:ring-emerald-500/10"
                  }`}
                />
              </div>
              {errors.transactionDate && (
                <p className="text-rose-500 text-[11px] mt-1.5 font-semibold flex items-center gap-1">
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
                      ? "border-rose-300 focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10"
                      : "border-slate-200/90 focus:border-emerald-600 focus:ring-4 focus:ring-emerald-500/10"
                  }`}
                />
              </div>
              {errors.amount && (
                <p className="text-rose-500 text-[11px] mt-1.5 font-semibold flex items-center gap-1">
                  <HiExclamationTriangle className="w-3.5 h-3.5" />
                  {errors.amount}
                </p>
              )}
            </div>
          </div>

          <div className="pt-2">
            <SubmitButton
              label="Save Income Entry"
              pendingText="Saving Income Entry..."
              icon={<HiArrowTrendingUp className="w-4 h-4" />}
              variant="income"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default IncomeForm;
