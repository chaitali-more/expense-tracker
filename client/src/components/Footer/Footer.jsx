import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-white border-t border-slate-200/80 py-4 px-4 sm:px-8 mt-auto text-xs text-slate-500">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
        <p className="font-medium text-slate-500">
          © {currentYear} <span className="font-bold text-slate-700">Finance Tracker</span>. All rights reserved.
        </p>

        <p className="font-medium text-slate-500">
          <span>Developed by </span>
          <a
            href="http://chaitalimore.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-emerald-600 hover:text-emerald-700 hover:underline transition cursor-pointer"
          >
            Chaitali More
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;