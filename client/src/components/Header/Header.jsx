import { Link, NavLink } from "react-router-dom";
import { HiOutlineBars3, HiChartBar, HiListBullet, HiSquares2X2 } from "react-icons/hi2";
import { FaWallet } from "react-icons/fa6";

const Header = ({ onToggleSidebar }) => {
  return (
    <header className="w-full bg-white border-b border-slate-200/80 sticky top-0 z-40 shadow-xs">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left: Logo & Branding */}
          <Link to="/" className="flex items-center gap-3 cursor-pointer shrink-0">
            <div className="w-9 h-9 rounded-xl bg-slate-900 flex items-center justify-center text-white font-bold text-lg shadow-xs shrink-0">
              <FaWallet className="w-4 h-4" />
            </div>
            <div>
              <h1 className="font-extrabold text-base leading-tight text-slate-900 tracking-tight">
                Finance Tracker
              </h1>
              <span className="hidden sm:block text-[11px] text-slate-400 font-medium">
                Personal Expense & Income Management
              </span>
            </div>
          </Link>

          {/* Middle: Desktop Quick Nav Links */}
          <nav className="hidden lg:flex items-center gap-1">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `px-3 py-1.5 text-xs font-semibold rounded-lg transition flex items-center gap-1.5 ${
                  isActive
                    ? "bg-slate-100 text-slate-900 font-bold"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                }`
              }
            >
              <HiSquares2X2 className="w-4 h-4" />
              <span>Dashboard</span>
            </NavLink>

            <NavLink
              to="/transactions"
              className={({ isActive }) =>
                `px-3 py-1.5 text-xs font-semibold rounded-lg transition flex items-center gap-1.5 ${
                  isActive
                    ? "bg-slate-100 text-slate-900 font-bold"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                }`
              }
            >
              <HiListBullet className="w-4 h-4" />
              <span>Transactions</span>
            </NavLink>

            <NavLink
              to="/statistics"
              className={({ isActive }) =>
                `px-3 py-1.5 text-xs font-semibold rounded-lg transition flex items-center gap-1.5 ${
                  isActive
                    ? "bg-slate-100 text-slate-900 font-bold"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                }`
              }
            >
              <HiChartBar className="w-4 h-4 text-slate-600" />
              <span>Financial Statistics & Analytics</span>
            </NavLink>
          </nav>

          {/* Right: User Avatar + Mobile Toggle Button */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2.5 sm:bg-slate-50 sm:px-3 sm:py-1.5 sm:rounded-full sm:border sm:border-slate-200/60">
              <div className="w-7 h-7 rounded-full bg-slate-800 text-white font-bold text-xs flex items-center justify-center shadow-xs">
                C
              </div>
              <span className="hidden sm:block text-xs font-bold text-slate-800 leading-tight">
                Chaitali
              </span>
            </div>

            {/* Mobile Navigation Toggle Button */}
            <button
              onClick={onToggleSidebar}
              className="lg:hidden p-2 rounded-xl text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 transition cursor-pointer flex items-center justify-center active:scale-95"
              aria-label="Toggle Navigation Menu"
            >
              <HiOutlineBars3 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;