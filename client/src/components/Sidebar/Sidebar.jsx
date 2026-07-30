import { NavLink, Link } from "react-router-dom";
import {
  HiSquares2X2,
  HiArrowTrendingUp,
  HiArrowTrendingDown,
  HiListBullet,
  HiChartBar,
  HiXMark,
  HiSparkles,
} from "react-icons/hi2";
import { FaWallet } from "react-icons/fa6";

const Sidebar = ({ isMobileOpen, setIsMobileOpen }) => {
  const navItems = [
    {
      path: "/",
      label: "Dashboard",
      icon: <HiSquares2X2 className="w-4.5 h-4.5" />,
    },
    {
      path: "/add-income",
      label: "Add Income",
      icon: <HiArrowTrendingUp className="w-4.5 h-4.5 text-emerald-500" />,
    },
    {
      path: "/add-expense",
      label: "Add Expense",
      icon: <HiArrowTrendingDown className="w-4.5 h-4.5 text-red-500" />,
    },
    {
      path: "/transactions",
      label: "Transaction List",
      icon: <HiListBullet className="w-4.5 h-4.5" />,
    },
    {
      path: "/statistics",
      label: "Financial Statistics & Analytics",
      icon: <HiChartBar className="w-4.5 h-4.5" />,
    },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          onClick={() => setIsMobileOpen(false)}
          className="fixed inset-0 bg-slate-900/40 z-40 lg:hidden backdrop-blur-xs transition-opacity"
        />
      )}

      {/* Sidebar Drawer */}
      <aside
        className={`fixed lg:sticky top-0 lg:top-16 right-0 lg:right-auto lg:left-0 h-full lg:h-[calc(100vh-4rem)] w-72 lg:w-64 bg-white text-slate-700 border-l lg:border-l-0 lg:border-r border-slate-200/80 z-50 lg:z-30 flex flex-col justify-between transition-transform duration-250 ease-in-out shrink-0 shadow-xl lg:shadow-none ${
          isMobileOpen ? "translate-x-0" : "translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="p-4 space-y-6 overflow-y-auto">
          {/* Mobile Header with Close Button */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 lg:hidden">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-xs">
                <FaWallet className="w-4 h-4" />
              </div>
              <span className="font-bold text-slate-900 text-sm">Finance Tracker Menu</span>
            </div>
            <button
              onClick={() => setIsMobileOpen(false)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition cursor-pointer"
              aria-label="Close navigation menu"
            >
              <HiXMark className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <div>
            <span className="px-3 text-xs font-bold tracking-wider text-slate-400 uppercase">
              Main Menu
            </span>
            <nav className="mt-2.5 space-y-1">
              {navItems.map((item) => {
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    end={item.path === "/"}
                    onClick={() => setIsMobileOpen(false)}
                    className={({ isActive }) =>
                      `w-full flex items-center gap-3 px-3.5 py-2.5 text-sm font-semibold rounded-xl transition-all duration-150 cursor-pointer ${
                        isActive
                          ? "bg-emerald-600 text-white shadow-md shadow-emerald-500/20 font-bold"
                          : "text-slate-600 hover:bg-slate-100/80 hover:text-slate-900"
                      }`
                    }
                  >
                    <span>{item.icon}</span>
                    <span>{item.label}</span>
                  </NavLink>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Bottom Prodify-style Gradient Card */}
        <div className="p-4 border-t border-slate-100">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700 p-4 text-white shadow-md shadow-emerald-500/20">
            <div className="flex items-center gap-1.5 text-xs font-bold text-teal-100 uppercase tracking-wider mb-1">
              <HiSparkles className="w-4 h-4" />
              <span>Smart Finance AI</span>
            </div>
            <p className="text-xs sm:text-sm font-medium text-teal-50 leading-snug mb-3">
              Get automated expense insights and monthly budget predictions.
            </p>
            <Link
              to="/add-expense"
              onClick={() => setIsMobileOpen(false)}
              className="block w-full bg-white hover:bg-emerald-50 text-emerald-700 font-bold py-2 px-3 rounded-xl text-xs sm:text-sm shadow-xs transition cursor-pointer text-center"
            >
              + Quick Entry
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
