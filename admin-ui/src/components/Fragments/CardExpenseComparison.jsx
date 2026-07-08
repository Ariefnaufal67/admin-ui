import React, { useEffect, useState } from "react";
import Icon from "../Elements/Icon";
import Loader from "../Elements/Loader";
import CardExpenseCategory from "../Elements/CardExpenseCategory";
import { getExpensesService } from "../../services/authService";

// Ikon default per kategori (mengikuti pola yang sama dengan data.jsx / CardExpenseBreakdown)
const CATEGORY_ICON = {
  housing: <Icon.House />,
  food: <Icon.Food />,
  transportation: <Icon.Transport />,
  transport: <Icon.Transport />,
  entertainment: <Icon.Gamepad />,
  shopping: <Icon.Shopping />,
  others: <Icon.Other />,
  other: <Icon.Other />,
};

// Ambil field pertama yang tersedia dari beberapa kemungkinan nama key
// (karena bentuk response backend belum tentu identik dengan asumsi awal)
const pick = (obj, keys, fallback = undefined) => {
  for (const key of keys) {
    if (obj && obj[key] !== undefined && obj[key] !== null) return obj[key];
  }
  return fallback;
};

// Normalisasi response API (mendukung 2 kemungkinan bentuk: sudah dikelompokkan
// per kategori, atau masih berupa list transaksi flat) menjadi bentuk yang siap
// dipakai oleh <CardExpenseCategory />
function normalizeExpenses(raw) {
  if (!Array.isArray(raw) || raw.length === 0) return [];

  const hasNestedItems = raw.some((row) =>
    Array.isArray(pick(row, ["items", "transactions", "details"], null))
  );

  if (hasNestedItems) {
    // Bentuk A: sudah berupa kategori + daftar item di dalamnya
    return raw.map((row, idx) => {
      const category = pick(row, ["category", "categoryName", "name"], "Others");
      const items = pick(row, ["items", "transactions", "details"], []);

      return {
        id: row.id ?? idx,
        category,
        amount: pick(row, ["amount", "total", "totalAmount"], 0),
        percentage: pick(row, ["percentage", "percent", "change"], null),
        trend: pick(row, ["trend", "direction"], "up"),
        items: items.map((it, i) => ({
          id: it.id ?? i,
          name: pick(it, ["name", "title", "item"], "-"),
          amount: pick(it, ["amount", "price", "value"], 0),
          date: pick(it, ["date", "createdAt", "created_at"], ""),
        })),
      };
    });
  }

  // Bentuk B: list transaksi flat, dikelompokkan manual per kategori
  const grouped = {};
  raw.forEach((row, idx) => {
    const category = pick(row, ["category", "categoryName"], "Others");
    const key = category.toLowerCase();

    if (!grouped[key]) {
      grouped[key] = { category, amount: 0, items: [] };
    }

    const amount = Number(pick(row, ["amount", "price", "value"], 0)) || 0;
    grouped[key].amount += amount;
    grouped[key].items.push({
      id: row.id ?? idx,
      name: pick(row, ["name", "title", "item"], "-"),
      amount,
      date: pick(row, ["date", "createdAt", "created_at"], ""),
    });
  });

  return Object.values(grouped).map((g, idx) => ({
    id: idx,
    category: g.category,
    amount: g.amount,
    percentage: null, // data pembanding bulan lalu tidak tersedia di list flat
    trend: "up",
    items: g.items,
  }));
}

function CardExpenseComparison() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExpenses = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getExpensesService();
        setExpenses(normalizeExpenses(data));
      } catch (err) {
        setError(err?.msg || "Gagal memuat data expenses");
      } finally {
        setLoading(false);
      }
    };

    fetchExpenses();
  }, []);

  if (loading) {
    return <Loader label="Loading expenses..." />;
  }

  if (error) {
    return (
      <div className="w-full text-center py-10 text-special-red text-sm">
        {error}
      </div>
    );
  }

  if (expenses.length === 0) {
    return (
      <div className="w-full text-center py-10 text-gray-02 text-sm">
        Belum ada data expenses.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {expenses.map((exp) => (
        <CardExpenseCategory
          key={exp.id}
          icon={CATEGORY_ICON[exp.category?.toLowerCase()] || <Icon.Other />}
          category={exp.category}
          amount={exp.amount}
          percentage={exp.percentage}
          trend={exp.trend}
          items={exp.items}
        />
      ))}
    </div>
  );
}

export default CardExpenseComparison;
