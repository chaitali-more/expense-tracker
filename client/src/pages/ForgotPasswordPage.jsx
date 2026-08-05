import { useState } from "react";
import api from "../api";
import { useNavigate, Link } from "react-router-dom";
import { FaWallet } from "react-icons/fa6";
import { HiArrowRight, HiKey } from "react-icons/hi2";
import toast from "react-hot-toast";
import SEO from "../components/SEO/SEO";

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: Request Code, 2: Reset Password
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRequestCode = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email address.");
      return;
    }

    setLoading(true);
    try {
      await api.post("/auth/forgot-password", { email });
      toast.success("Reset code sent to your email!");
      setStep(2);
    } catch (error) {
      console.error(error);
      const errMsg =
        error.response?.data?.message ||
        error.response?.data ||
        "Failed to generate reset code. Please check the email.";
      toast.error(errMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!email || !code || !newPassword) {
      toast.error("Please fill in all fields.");
      return;
    }

    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return;
    }

    setLoading(true);
    try {
      await api.post("/auth/reset-password", {
        email,
        code,
        newPassword,
      });
      toast.success("Password reset successful! You can now sign in.");
      navigate("/login");
    } catch (error) {
      console.error(error);
      const errMsg =
        error.response?.data?.message ||
        error.response?.data ||
        "Failed to reset password. Please check your reset code.";
      toast.error(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-8 min-h-[70vh] flex items-center justify-center py-8">
      <SEO
        title="Forgot Password | Personal Finance Tracker"
        description="Request a password reset code to recover your account and update your password securely on Personal Finance Tracker."
      />
      <div className="w-full max-w-md bg-white border border-slate-200/80 rounded-2xl shadow-xs p-6 sm:p-8 space-y-6">
        {/* Logo/Icon and Heading */}
        <div className="flex flex-col items-center text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-slate-900 flex items-center justify-center text-white shadow-xs">
            {step === 1 ? (
              <FaWallet className="w-6 h-6" />
            ) : (
              <HiKey className="w-6 h-6 text-slate-100" />
            )}
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-2">
            {step === 1 ? "Forgot Password" : "Reset Password"}
          </h2>
          <p className="text-sm font-medium text-slate-500">
            {step === 1
              ? "Enter your email to receive a password reset code."
              : "Enter the reset code sent to your email and choose a new password."}
          </p>
        </div>

        {/* Step 1: Request Reset Code */}
        {step === 1 && (
          <form onSubmit={handleRequestCode} className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-800 text-sm focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 transition-all duration-150"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 px-4 rounded-xl text-sm transition-all duration-150 cursor-pointer shadow-xs active:scale-98 flex items-center justify-center gap-2 mt-2 disabled:opacity-75 disabled:pointer-events-none"
            >
              <span>{loading ? "Sending Code..." : "Send Reset Code"}</span>
              {!loading && <HiArrowRight className="w-4 h-4" />}
            </button>
          </form>
        )}

        {/* Step 2: Reset Password */}
        {step === 2 && (
          <form onSubmit={handleResetPassword} className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={email}
                disabled
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-100 text-slate-500 text-sm cursor-not-allowed"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">
                6-Digit Reset Code
              </label>
              <input
                type="text"
                name="code"
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/[^0-9]/g, ""))}
                placeholder="123456"
                required
                maxLength={6}
                autoComplete="one-time-code"
                inputMode="numeric"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-800 text-sm focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 transition-all duration-150 tracking-widest text-center font-bold"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">
                New Password
              </label>
              <input
                type="password"
                name="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="••••••••"
                required
                minLength={6}
                autoComplete="new-password"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-800 text-sm focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 transition-all duration-150"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 px-4 rounded-xl text-sm transition-all duration-150 cursor-pointer shadow-xs active:scale-98 flex items-center justify-center gap-2 mt-2 disabled:opacity-75 disabled:pointer-events-none"
            >
              <span>{loading ? "Resetting..." : "Reset Password"}</span>
              {!loading && <HiArrowRight className="w-4 h-4" />}
            </button>

            <button
              type="button"
              onClick={() => setStep(1)}
              className="w-full bg-slate-50 hover:bg-slate-100 text-slate-600 font-bold py-2.5 px-4 rounded-xl text-xs transition-all duration-150 cursor-pointer text-center"
            >
              Back to Step 1
            </button>
          </form>
        )}

        {/* Footer Link */}
        <div className="text-center pt-2 border-t border-slate-100">
          <p className="text-xs text-slate-500 font-medium">
            Remember your password?{" "}
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

export default ForgotPasswordPage;
