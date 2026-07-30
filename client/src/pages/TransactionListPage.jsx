import React from "react";
import FilterBar from "../components/FilterBar/FilterBar";
import SearchBar from "../components/SearchBar/SearchBar";
import TransactionList from "../components/TransactionList/TransactionList";
import SEO from "../components/SEO/SEO";

const TransactionListPage = ({
  Transactions,
  handleDelete,
  setSearchValue,
  searchValue,
  filter,
  setFilter,
  dateFilter,
  setDateFilter,
  sortBy,
  setSortBy,
}) => {
  return (
    <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200/70 shadow-xs space-y-4">
      <SEO
        title="Transaction History | Personal Finance Tracker"
        description="Search, filter by category or date range, sort date-wise, and manage your complete transaction history with instant status updates and one-click deletion actions."
      />
      <h2 className="text-base sm:text-lg font-bold text-slate-800 border-b border-slate-100 pb-3">
        Transaction History
      </h2>
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 sm:gap-4">
        <SearchBar setSearchValue={setSearchValue} searchValue={searchValue} />
        <FilterBar
          filter={filter}
          setFilter={setFilter}
          dateFilter={dateFilter}
          setDateFilter={setDateFilter}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />
      </div>
      <TransactionList Transactions={Transactions} handleDelete={handleDelete} />
    </div>
  );
};

export default TransactionListPage;
