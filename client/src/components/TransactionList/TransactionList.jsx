import React from "react";
import TransactionCard from "../TransactionCard/TransactionCard";

const TransactionList = ({ Transactions, handleDelete }) => {
  return (
    <div className="pt-2">
      <TransactionCard Transactions={Transactions} onDelete={handleDelete} />
    </div>
  );
};

export default TransactionList;
