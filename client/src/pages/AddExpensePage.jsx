import React from "react";
import ExpenseForm from "../components/ExpenseForm/ExpenseForm";
import SEO from "../components/SEO/SEO";

const AddExpensePage = ({ setTransactions }) => {
  return (
    <div>
      <SEO
        title="Add Expense Entry | Personal Finance Tracker"
        description="Log groceries, bills, travel, shopping, and personal spending to monitor your daily expenses and maintain full control over your personal budget."
      />
      <ExpenseForm setTransactions={setTransactions} />
    </div>
  );
};

export default AddExpensePage;
