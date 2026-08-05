import { useState } from "react";
import api from "../api";
import { useNavigate, Link } from "react-router-dom";
import { FaWallet } from "react-icons/fa6";
import { HiArrowRight } from "react-icons/hi2";
import toast from "react-hot-toast";
import SEO from "../components/SEO/SEO";

const SignupPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const SignupSubmit = async (formData) => {
    setLoading(true);
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");
    const user = {
      name,
      email,
      password,
    };
    try {
      await api.post("/auth/signup", user);
      toast.success("Account created successfully! Please log in.");
      navigate("/login");
    } catch (error) {
      console.log(error);
      const errMsg = error.response?.data?.message || error.response?.data || "Failed to create account.";
      toast.error(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-8 min-h-[70vh] flex items-center justify-center py-8">
      <SEO
        title="Sign Up | Personal Finance Tracker"
        description="Create your Personal Finance Tracker account to start tracking expenses, logging incomes, and managing your personal budget."
      />
      <div className="w-full max-w-md bg-white border border-slate-200/80 rounded-2xl shadow-xs p-6 sm:p-8 space-y-6">
        {/* Logo/Icon and Heading */}
        <div className="flex flex-col items-center text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-slate-900 flex items-center justify-center text-white shadow-xs">
            <FaWallet className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-2">
            Create an Account
          </h2>
          <p className="text-sm font-medium text-slate-500">
            Start tracking expenses and managing your budget.
          </p>
        </div>

        {/* Form */}
        <form action={SignupSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Chaitali More"
              required
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-800 text-sm focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 transition-all duration-150"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              placeholder="name@example.com"
              required
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-800 text-sm focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 transition-all duration-150"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              required
              minLength={6}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-800 text-sm focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 transition-all duration-150"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 px-4 rounded-xl text-sm transition-all duration-150 cursor-pointer shadow-xs active:scale-98 flex items-center justify-center gap-2 mt-2 disabled:opacity-75 disabled:pointer-events-none"
          >
            <span>{loading ? "Creating Account..." : "Create Account"}</span>
            {!loading && <HiArrowRight className="w-4 h-4" />}
          </button>
        </form>

        {/* Footer Link */}
        <div className="text-center pt-2 border-t border-slate-100">
          <p className="text-xs text-slate-500 font-medium">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-slate-950 font-bold hover:underline transition"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
