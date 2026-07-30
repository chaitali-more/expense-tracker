import React from "react";
import { useFormStatus } from "react-dom";

const SubmitButton = ({ label, pendingText, icon, variant = "income" }) => {
  const { pending } = useFormStatus();

  const variantClasses =
    variant === "expense"
      ? "bg-gradient-to-r from-red-600 via-red-500 to-rose-600 shadow-red-500/25"
      : "bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 shadow-emerald-500/25";

  return (
    <button
      type="submit"
      disabled={pending}
      className={`w-full hover:opacity-95 active:scale-[0.99] text-white font-bold py-3.5 px-6 rounded-xl shadow-lg transition-all duration-150 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed text-xs uppercase tracking-wider flex items-center justify-center gap-2 ${variantClasses}`}
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
          <span>{pendingText || "Processing..."}</span>
        </>
      ) : (
        <>
          {icon}
          <span>{label}</span>
        </>
      )}
    </button>
  );
};

export default SubmitButton;
