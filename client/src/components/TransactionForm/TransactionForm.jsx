import { useState } from "react";
import { useFormStatus } from "react-dom";
import { FaIndianRupeeSign } from "react-icons/fa6";
import {
  HiPlus,
  HiPencilSquare,
  HiArrowsRightLeft,
  HiTag,
  HiCalendarDays,
  HiExclamationTriangle,
} from "react-icons/hi2";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 hover:opacity-95 active:scale-[0.99] text-white font-bold py-3 px-6 rounded-xl shadow-lg shadow-emerald-500/25 transition-all duration-150 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed text-xs uppercase tracking-wider flex items-center justify-center gap-2"
    >
      {pending ? (
        <>
          <svg
            className="animate-spin h-4 w-4 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <span>Processing Entry...</span>
        </>
      ) : (
        <>
          <HiPlus className="w-4 h-4" />
          <span>Add Transaction</span>
        </>
      )}
    </button>
  );
}

const TransactionForm = ({ setTransactions }) => {
  const [errors, setErrors] = useState({});

  const handleSubmit = (formData) => {
    const transactionName = formData.get("transactionName");
    const transactionType = formData.get("transactionType");
    const transactionDate = formData.get("transactionDate");
    const category = formData.get("category");
    const rawAmount = formData.get("amount");
    const amount = parseInt(rawAmount);

    const newErrors = {};

    if (!transactionName || transactionName.trim() === "") {
      newErrors.transactionName = "Transaction name is required.";
    }

    if (!transactionType) {
      newErrors.transactionType = "Transaction type is required.";
    }

    if (!transactionDate) {
      newErrors.transactionDate = "Transaction date is required.";
    }

    if (!category) {
      newErrors.category = "Please select a category.";
    }

    if (!rawAmount || isNaN(amount) || amount <= 0) {
      newErrors.amount = "Please enter a valid amount greater than 0.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    setTransactions((prev) => [
      ...prev,
      {
        id: Date.now(),
        transactionName,
        transactionType,
        transactionDate,
        amount,
        category,
      },
    ]);
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-white rounded-2xl shadow-xl shadow-slate-200/60 border border-slate-200/80 my-4 relative overflow-hidden">
      {/* Top Accent Gradient Line */}
      <div className="h-1.5 w-full bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600" />

      <div className="p-6 sm:p-10">
        {/* Form Header */}
        <div className="flex items-center gap-3.5 border-b border-slate-100 pb-5 mb-6">
          <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold shadow-xs">
            <HiPlus className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
              Add New Transaction
            </h2>
            <p className="text-xs text-slate-400 font-medium">
              Fill in the details below to record a new entry
            </p>
          </div>
        </div>

        <form action={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Transaction Name */}
            <div className="md:col-span-2">
              <label
                className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5"
                htmlFor="transactionName"
              >
                Transaction Name
              </label>
              <div className="relative">
                <HiPencilSquare className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  id="transactionName"
                  type="text"
                  placeholder="e.g. Grocery shopping, Monthly Salary"
                  name="transactionName"
                  className={`w-full pl-10 pr-3.5 py-3 text-xs font-semibold rounded-xl bg-slate-50 border text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none transition ${
                    errors.transactionName
                      ? "border-rose-300 focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10"
                      : "border-slate-200/90 focus:border-violet-600 focus:ring-4 focus:ring-violet-500/10"
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

            {/* Transaction Type */}
            <div>
              <label
                className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5"
                htmlFor="transactionType"
              >
                Transaction Type
              </label>
              <div className="relative">
                <HiArrowsRightLeft className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <select
                  id="transactionType"
                  name="transactionType"
                  defaultValue="expense"
                  className={`w-full pl-10 pr-3.5 py-3 text-xs font-semibold rounded-xl bg-slate-50 border text-slate-800 focus:bg-white focus:outline-none transition appearance-none cursor-pointer ${
                    errors.transactionType
                      ? "border-rose-300 focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10"
                      : "border-slate-200/90 focus:border-violet-600 focus:ring-4 focus:ring-violet-500/10"
                  }`}
                >
                  <option value="expense">Expense (- Outflow)</option>
                  <option value="income">Income (+ Inflow)</option>
                </select>
              </div>
              {errors.transactionType && (
                <p className="text-rose-500 text-[11px] mt-1.5 font-semibold flex items-center gap-1">
                  <HiExclamationTriangle className="w-3.5 h-3.5" />
                  {errors.transactionType}
                </p>
              )}
            </div>

            {/* Category */}
            <div>
              <label
                className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5"
                htmlFor="category"
              >
                Category
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
                      : "border-slate-200/90 focus:border-violet-600 focus:ring-4 focus:ring-violet-500/10"
                  }`}
                >
                  <option value="" disabled>
                    Select Category
                  </option>
                  <option value="food">Food & Dining</option>
                  <option value="travel">Travel & Transport</option>
                  <option value="shopping">Shopping & Lifestyle</option>
                </select>
              </div>
              {errors.category && (
                <p className="text-rose-500 text-[11px] mt-1.5 font-semibold flex items-center gap-1">
                  <HiExclamationTriangle className="w-3.5 h-3.5" />
                  {errors.category}
                </p>
              )}
            </div>

            {/* Transaction Date */}
            <div>
              <label
                className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5"
                htmlFor="transactionDate"
              >
                Date
              </label>
              <div className="relative">
                <HiCalendarDays className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  id="transactionDate"
                  type="date"
                  name="transactionDate"
                  className={`w-full pl-10 pr-3.5 py-3 text-xs font-semibold rounded-xl bg-slate-50 border text-slate-800 focus:bg-white focus:outline-none transition ${
                    errors.transactionDate
                      ? "border-rose-300 focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10"
                      : "border-slate-200/90 focus:border-violet-600 focus:ring-4 focus:ring-violet-500/10"
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
            <div>
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
                  placeholder="0.00"
                  name="amount"
                  className={`w-full pl-10 pr-3.5 py-3 text-xs font-semibold rounded-xl bg-slate-50 border text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none transition ${
                    errors.amount
                      ? "border-rose-300 focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10"
                      : "border-slate-200/90 focus:border-violet-600 focus:ring-4 focus:ring-violet-500/10"
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

          <div className="pt-3">
            <SubmitButton />
          </div>
        </form>
      </div>
    </div>
  );
};

export default TransactionForm;
