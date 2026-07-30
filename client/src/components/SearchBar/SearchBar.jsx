import { HiMagnifyingGlass, HiXMark } from "react-icons/hi2";

const SearchBar = ({ searchValue, setSearchValue }) => {
  return (
    <div className="relative w-full max-w-md group">
      {/* Magnifying Glass Icon */}
      <HiMagnifyingGlass className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 group-focus-within:text-emerald-600 transition-colors pointer-events-none" />

      {/* Input Field */}
      <input
        type="text"
        value={searchValue}
        placeholder="Search transactions by title..."
        name="search"
        onChange={(e) => setSearchValue && setSearchValue(e.target.value)}
        className="w-full pl-10 pr-9 py-2.5 text-xs font-semibold rounded-xl bg-slate-50/90 border border-slate-200/90 text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 shadow-xs transition-all duration-200"
      />

      {/* Clear Search Button (Visible when searching) */}
      {searchValue ? (
        <button
          type="button"
          onClick={() => setSearchValue && setSearchValue("")}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 p-1 rounded-full hover:bg-slate-200/60 transition cursor-pointer"
          title="Clear search"
          aria-label="Clear search text"
        >
          <HiXMark className="w-3.5 h-3.5" />
        </button>
      ) : (
        <span className="hidden sm:inline-block absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-slate-400 bg-slate-200/60 px-1.5 py-0.5 rounded-md uppercase tracking-wider pointer-events-none">
          Search
        </span>
      )}
    </div>
  );
};

export default SearchBar;