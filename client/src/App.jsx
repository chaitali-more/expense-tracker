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
import api from "./api";

// Helper to get local date object without timezone shifts for date-only inputs
const getLocalDateObject = (dateStr) => {
  if (!dateStr) return new Date();
  
  const dateString = String(dateStr);
  if (dateString.length === 10 || dateString.endsWith("T00:00:00.000Z")) {
    const year = parseInt(dateString.substring(0, 4), 10);
    const month = parseInt(dateString.substring(5, 7), 10) - 1;
    const day = parseInt(dateString.substring(8, 10), 10);
    return new Date(year, month, day);
  }
  
  const d = new Date(dateString);
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
};

// Helper function to evaluate date range filtering
const isDateInFilter = (dateStr, dFilter) => {
  if (!dFilter || dFilter === "all") return true;
  if (!dateStr) return false;

  const txDay = getLocalDateObject(dateStr);
  const now = new Date();
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
      txDay.getFullYear() === today.getFullYear() &&
      txDay.getMonth() === today.getMonth()
    );
  }

  if (dFilter === "last_month") {
    const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
    return (
      txDay.getFullYear() === lastMonth.getFullYear() &&
      txDay.getMonth() === lastMonth.getMonth()
    );
  }

  if (dFilter === "year") {
    return txDay.getFullYear() === today.getFullYear();
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

  useEffect(() => {
    // Clear legacy local storage data if any exists to avoid confusion
    localStorage.removeItem("Transactions");
    fetchTransactions();
  }, []);

  

  const handleDelete = async (id) => {
  try {
    await api.delete(`/transactions/${id}`);

    // Fetch latest data from MongoDB
    fetchTransactions();
  } catch (error) {
    console.log(error);
  }
};

  // Combine Search, Type Filter, Date Range Filter, and Date/Amount Sorting
  let filteredArray = Transactions;

  // 1. Search Filter
  if (searchValue.trim()) {
    filteredArray = filteredArray.filter((tx) =>
      tx.title.toLowerCase().includes(searchValue.toLowerCase()),
    );
  }

  // 2. Type Filter (Income / Expense)
  if (filter === "income") {
    filteredArray = filteredArray.filter(
      (tx) => tx.type === "income",
    );
  } else if (filter === "expense") {
    filteredArray = filteredArray.filter(
      (tx) => tx.type === "expense",
    );
  }

  // 3. Date Range Filter (Today, This Week, This Month, Last Month, This Year)
  if (dateFilter !== "all") {
    filteredArray = filteredArray.filter((tx) =>
      isDateInFilter(tx.date || tx.transactionDate, dateFilter),
    );
  }

  // 4. Date Sorting (Default: Date Newest First)
  filteredArray = [...filteredArray].sort((a, b) => {
    const dateA = a.date || a.transactionDate || 0;
    const dateB = b.date || b.transactionDate || 0;
    const idA = a._id || a.id || 0;
    const idB = b._id || b.id || 0;

    if (sortBy === "date_asc") {
      const timeA = new Date(dateA).getTime();
      const timeB = new Date(dateB).getTime();
      if (timeA !== timeB) return timeA - timeB;
      return String(idA).localeCompare(String(idB));
    }
    // Default: date_desc
    const timeA = new Date(dateA).getTime();
    const timeB = new Date(dateB).getTime();
    if (timeA !== timeB) return timeB - timeA;
    return String(idB).localeCompare(String(idA));
  });

  const totalIncome = Transactions.filter(
    (tx) => tx.type === "income",
  ).reduce((sum, tx) => sum + Number(tx.amount || 0), 0);

  const totalExpense = Transactions.filter(
    (tx) => tx.type === "expense",
  ).reduce((sum, tx) => sum + Number(tx.amount || 0), 0);

  const balance = totalIncome - totalExpense;

  const fetchTransactions = async () => {
  try {
    const res = await api.get("/transactions");

    console.log("Response:", res);
    console.log("Data:", res.data);
    console.log("Is Array:", Array.isArray(res.data));

    setTransactions(res.data);
  } catch (error) {
    console.log(error);
  }
};
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
