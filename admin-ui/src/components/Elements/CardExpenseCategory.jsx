import React from "react";
import Icon from "./Icon";

// Element baru: kartu untuk 1 kategori expense (icon, total, persentase, & daftar item)
function CardExpenseCategory(props) {
  const {
    icon,
    category,
    amount,
    percentage = null,
    trend = "up", // "up" -> naik (merah), "down" -> turun (hijau)
    items = [],
  } = props;

  const isUp = trend === "up";

  return (
    <div className="bg-special-card rounded-lg shadow-sm border border-gray-05 px-5 py-5 h-full flex flex-col">
      {/* Header kategori */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start">
          <div className="bg-special-bg text-gray-02 p-3 rounded-lg flex items-center justify-center">
            {icon}
          </div>
          <div className="ms-3">
            <div className="text-gray-02 text-sm">{category}</div>
            <div className="font-bold text-xl text-defaultBlack">${amount}</div>
          </div>
        </div>

        {percentage !== null && percentage !== undefined && (
          <div className="text-right">
            <div
              className={`flex items-center justify-end gap-1 font-semibold text-sm ${
                isUp ? "text-special-red" : "text-special-green"
              }`}
            >
              {percentage}%
              {isUp ? <Icon.ArrowUp size={14} /> : <Icon.ArrowDown size={14} />}
            </div>
            <div className="text-xs text-gray-02 mt-1 whitespace-nowrap">
              Compare to the last month
            </div>
          </div>
        )}
      </div>

      {/* Daftar item transaksi kategori ini */}
      <div className="flex-1">
        {items.length === 0 && (
          <div className="text-gray-02 text-sm text-center py-6">
            Belum ada transaksi
          </div>
        )}
        {items.map((item, idx) => (
          <div
            key={item.id ?? idx}
            className={`flex justify-between items-start py-3 ${
              idx !== items.length - 1 ? "border-b border-gray-05" : ""
            }`}
          >
            <span className="font-semibold text-sm text-defaultBlack">
              {item.name}
            </span>
            <div className="text-right">
              <div className="font-semibold text-sm text-defaultBlack">
                ${item.amount}
              </div>
              <div className="text-xs text-gray-02 mt-1 whitespace-nowrap">
                {item.date}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CardExpenseCategory;
