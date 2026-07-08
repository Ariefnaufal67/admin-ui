import React, { useEffect, useState } from "react";
import Card from "../Elements/Card";
import Icon from "../Elements/Icon";
import Loader from "../Elements/Loader";
import { getBillsService } from "../../services/authService";

// Ikon brand berdasarkan nama tagihan (fallback ke ikon Bill generik)
const BRAND_ICON = {
  figma: <Icon.Figma />,
  adobe: <Icon.Adobe />,
};

function getIconForName(name = "") {
  const lower = name.toLowerCase();
  const key = Object.keys(BRAND_ICON).find((k) => lower.includes(k));
  return key ? BRAND_ICON[key] : <Icon.Bill />;
}

const pick = (obj, keys, fallback) => {
  for (const key of keys) {
    if (obj && obj[key] !== undefined && obj[key] !== null) return obj[key];
  }
  return fallback;
};

const isNumericDay = (v) =>
  v !== undefined && v !== null && /^\d{1,2}$/.test(String(v).trim());

// Kalau backend hanya mengirim 1 field tanggal (bukan month/date terpisah),
// pecah jadi { month: "May", day: "15" }
function formatDateParts(dateStr) {
  const d = new Date(dateStr);
  if (!dateStr || isNaN(d.getTime())) return { month: "-", day: "-" };
  return {
    month: d.toLocaleString("en-US", { month: "long" }),
    day: String(d.getDate()),
  };
}

function normalizeBill(item, idx) {
  const rawDay = pick(item, ["date"], null);
  const rawMonth = pick(item, ["month"], null);

  let month = rawMonth;
  let day = isNumericDay(rawDay) ? String(rawDay) : null;

  if (!month || !day) {
    const candidate = pick(item, ["dueDate", "due_date", "billDate", "date"], null);
    const parsed = formatDateParts(candidate);
    month = month || parsed.month;
    day = day || parsed.day;
  }

  const name = pick(item, ["name", "title"], "-");

  return {
    id: item.id ?? idx,
    name,
    month,
    date: day,
    lastCharge: pick(item, ["lastCharge", "last_charge"], "-"),
    amount: pick(item, ["amount", "total", "price"], 0),
    icon: getIconForName(name),
  };
}

function CardUpcomingBill() {
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBills = async () => {
      setLoading(true);
      setError(null);
      try {
        const raw = await getBillsService();
        const list = Array.isArray(raw) ? raw : [];
        setBills(list.map(normalizeBill));
      } catch (err) {
        setError(err?.msg || "Gagal memuat data upcoming bill");
      } finally {
        setLoading(false);
      }
    };

    fetchBills();
  }, []);

  let content;

  if (loading) {
    content = <Loader label="Loading bills..." />;
  } else if (error) {
    content = (
      <div className="text-special-red text-sm text-center py-6">{error}</div>
    );
  } else if (bills.length === 0) {
    content = (
      <div className="text-gray-02 text-sm text-center py-6">
        Belum ada tagihan
      </div>
    );
  } else {
    content = (
      <div className="flex flex-col justify-around h-full">
        {bills.map((item) => (
          <div key={item.id} className="flex justify-between pt-3 pb-3">
            <div className="flex">
              <div className="bg-special-bg p-4 rounded-lg flex flex-col">
                <span className="text-xs">{item.month}</span>
                <span className="text-2xl font-bold">{item.date}</span>
              </div>
              <div className="ms-10">
                {item.icon}
                <span className="font-bold">{item.name}</span>
                <br />
                <span className="text-xs">Last Charge - {item.lastCharge}</span>
              </div>
            </div>
            <div className="flex items-center">
              <span className="py-2 px-4 border border-gray-05 rounded-lg font-bold">
                ${item.amount}
              </span>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <>
      <Card title="Upcoming Bill" desc={content} />
    </>
  );
}

export default CardUpcomingBill;
