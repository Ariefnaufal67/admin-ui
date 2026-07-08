import React from "react";
import MainLayout from "../components/Layouts/MainLayout";
import CardExpenseComparison from "../components/Fragments/CardExpenseComparison";

function Expenses() {
  return (
    <MainLayout>
      <div className="text-2xl text-gray-02 mb-6">Expenses Comparison</div>
      <CardExpenseComparison />
    </MainLayout>
  );
}

export default Expenses;
