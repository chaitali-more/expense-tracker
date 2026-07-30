import React from "react";
import IncomeForm from "../components/IncomeForm/IncomeForm";
import SEO from "../components/SEO/SEO";

const AddIncomePage = ({ setTransactions }) => {
  return (
    <div>
      <SEO
        title="Add Income Entry | Personal Finance Tracker"
        description="Record new salary, bonus, freelance earnings, investments, or gifts to keep your personal income balance up to date with real-time financial tracking."
      />
      <IncomeForm setTransactions={setTransactions} />
    </div>
  );
};

export default AddIncomePage;
