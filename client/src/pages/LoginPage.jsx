import { useState } from "react";
import api from "../api";
import { useNavigate, Link } from "react-router-dom";
import { FaWallet } from "react-icons/fa6";
import { HiArrowRight } from "react-icons/hi2";
import toast from "react-hot-toast";
import SEO from "../components/SEO/SEO";

const LoginPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);

    const user = {
      email,
      password,
    };

    try {
      const res = await api.post("/auth/login", user);
      // Save User
      localStorage.setItem("user", JSON.stringify(res.data.user));
      // Save JWT
      localStorage.setItem("token", res.data.token);
      toast.success("Welcome back! Login successful.");
      navigate("/");
    } catch (error) {
      console.log(error);
      const errMsg = error.response?.data?.message || error.response?.data || "Invalid email or password.";
      toast.error(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-8 min-h-[70vh] flex items-center justify-center py-8">
      <SEO
        title="Sign In | Personal Finance Tracker"
        description="Log in to your Personal Finance Tracker account to monitor expenses, manage incomes, and review transaction lists."
      />
      <div className="w-full max-w-md bg-white border border-slate-200/80 rounded-2xl shadow-xs p-6 sm:p-8 space-y-6">
        {/* Logo/Icon and Heading */}
        <div className="flex flex-col items-center text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-slate-900 flex items-center justify-center text-white shadow-xs">
            <FaWallet className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-2">
            Welcome Back
          </h2>
          <p className="text-sm font-medium text-slate-500">
            Log in to manage your budget and track expenses.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSignIn} className="space-y-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-800 text-sm focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 transition-all duration-150"
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">
                Password
              </label>
              <Link
                to="/forgot-password"
                className="text-[11px] font-bold text-slate-400 hover:text-slate-950 transition"
              >
                Forgot password?
              </Link>
            </div>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-800 text-sm focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 transition-all duration-150"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 px-4 rounded-xl text-sm transition-all duration-150 cursor-pointer shadow-xs active:scale-98 flex items-center justify-center gap-2 mt-2 disabled:opacity-75 disabled:pointer-events-none"
          >
            <span>{loading ? "Signing In..." : "Sign In"}</span>
            {!loading && <HiArrowRight className="w-4 h-4" />}
          </button>
        </form>

        {/* Footer Link */}
        <div className="text-center pt-2 border-t border-slate-100">
          <p className="text-xs text-slate-500 font-medium">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-slate-950 font-bold hover:underline transition"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
