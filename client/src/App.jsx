import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import AddExpensePage from "./pages/AddExpensePage";
import AddIncomePage from "./pages/AddIncomePage";
import DashboardPage from "./pages/DashboardPage";
import StatisticsPage from "./pages/StatisticsPage";
import TransactionListPage from "./pages/TransactionListPage";

// Helper function to evaluate date range filtering
const isDateInFilter = (dateStr, dFilter) => {
  if (!dFilter || dFilter === "all") return true;
  if (!dateStr) return false;

  const txDate = new Date(dateStr);
  const now = new Date();

  // Strip time for clean day comparison
  const txDay = new Date(
    txDate.getFullYear(),
    txDate.getMonth(),
    txDate.getDate(),
  );
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  if (dFilter === "today") {
    return txDay.getTime() === today.getTime();
  }

  if (dFilter === "week") {
    const dayOfWeek = today.getDay(); // 0 is Sunday, 1 is Monday...
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - dayOfWeek); // Start of current week
    return txDay >= startOfWeek && txDay <= today;
  }

  if (dFilter === "month") {
    return (
      txDate.getFullYear() === now.getFullYear() &&
      txDate.getMonth() === now.getMonth()
    );
  }

  if (dFilter === "last_month") {
    const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    return (
      txDate.getFullYear() === lastMonth.getFullYear() &&
      txDate.getMonth() === lastMonth.getMonth()
    );
  }

  if (dFilter === "year") {
    return txDate.getFullYear() === now.getFullYear();
  }

  return true;
};

const App = () => {
  const [Transactions, setTransactions] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [filter, setFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const [sortBy, setSortBy] = useState("date_desc");
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const data = localStorage.getItem("Transactions");
    if (data) {
      setTransactions(JSON.parse(data));
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (!isLoaded) return;
    localStorage.setItem("Transactions", JSON.stringify(Transactions));
  }, [Transactions]);

  const handleDelete = (id) => {
    setTransactions((prev) => prev.filter((tx) => tx.id !== id));
  };

  // Combine Search, Type Filter, Date Range Filter, and Date/Amount Sorting
  let filteredArray = Transactions;

  // 1. Search Filter
  if (searchValue.trim()) {
    filteredArray = filteredArray.filter((tx) =>
      tx.transactionName.toLowerCase().includes(searchValue.toLowerCase()),
    );
  }

  // 2. Type Filter (Income / Expense)
  if (filter === "income") {
    filteredArray = filteredArray.filter(
      (tx) => tx.transactionType === "income",
    );
  } else if (filter === "expense") {
    filteredArray = filteredArray.filter(
      (tx) => tx.transactionType === "expense",
    );
  }

  // 3. Date Range Filter (Today, This Week, This Month, Last Month, This Year)
  if (dateFilter !== "all") {
    filteredArray = filteredArray.filter((tx) =>
      isDateInFilter(tx.transactionDate, dateFilter),
    );
  }

  // 4. Date Sorting (Default: Date Newest First)
  filteredArray = [...filteredArray].sort((a, b) => {
    if (sortBy === "date_asc") {
      const timeA = new Date(a.transactionDate || 0).getTime();
      const timeB = new Date(b.transactionDate || 0).getTime();
      if (timeA !== timeB) return timeA - timeB;
      return (a.id || 0) - (b.id || 0);
    }
    // Default: date_desc
    const timeA = new Date(a.transactionDate || 0).getTime();
    const timeB = new Date(b.transactionDate || 0).getTime();
    if (timeA !== timeB) return timeB - timeA;
    return (b.id || 0) - (a.id || 0);
  });

  const totalIncome = Transactions.filter(
    (tx) => tx.transactionType === "income",
  ).reduce((sum, tx) => sum + Number(tx.amount || 0), 0);

  const totalExpense = Transactions.filter(
    (tx) => tx.transactionType === "expense",
  ).reduce((sum, tx) => sum + Number(tx.amount || 0), 0);

  const balance = totalIncome - totalExpense;

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col font-sans">
      {/* Header Bar */}
      <Header onToggleSidebar={() => setIsMobileOpen((prev) => !prev)} />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
        }}
      />
      {/* Main Dashboard Layout */}
      <div className="flex-1 flex w-full">
        {/* Sidebar Navigation */}
        <Sidebar
          isMobileOpen={isMobileOpen}
          setIsMobileOpen={setIsMobileOpen}
        />

        {/* Main Content & Footer Panel */}
        <div className="flex-1 flex flex-col min-w-0 min-h-[calc(100vh-4rem)]">
          <main className="flex-1 p-4 sm:p-6 lg:p-8">
            <div className="max-w-6xl mx-auto space-y-6">
              <Routes>
                <Route
                  path="/"
                  element={
                    <DashboardPage
                      Transactions={Transactions}
                      handleDelete={handleDelete}
                      balance={balance}
                      totalIncome={totalIncome}
                      totalExpense={totalExpense}
                    />
                  }
                />
                <Route
                  path="/add-income"
                  element={<AddIncomePage setTransactions={setTransactions} />}
                />
                <Route
                  path="/add-expense"
                  element={<AddExpensePage setTransactions={setTransactions} />}
                />
                <Route
                  path="/transactions"
                  element={
                    <TransactionListPage
                      Transactions={filteredArray}
                      handleDelete={handleDelete}
                      setSearchValue={setSearchValue}
                      searchValue={searchValue}
                      setFilter={setFilter}
                      filter={filter}
                      dateFilter={dateFilter}
                      setDateFilter={setDateFilter}
                      sortBy={sortBy}
                      setSortBy={setSortBy}
                    />
                  }
                />
                <Route
                  path="/statistics"
                  element={<StatisticsPage Transactions={Transactions} />}
                />
              </Routes>
            </div>
          </main>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default App;
