import React, { useState } from 'react'

function PostCard({ id, userId, title, body }) {
  const [isClicked, setIsClicked] = useState(false);

  return (
    <div className="
      flex flex-col justify-between
      bg-white rounded-lg shadow p-4
      transition-all duration-200
      hover:scale-105 hover:border hover:border-gray-300 hover:bg-pink-100
      cursor-pointer
    ">
      {/* Judul */}
      <h2 className="text-center font-bold text-sm mb-3 capitalize">
        {title}
      </h2>

      {/* Isi */}
      <p className="text-center text-xs text-gray-600 mb-4">
        {body}
      </p>

      {/* Tombol */}
      <button className={`${isClicked ? "bg-(--color-special-red2) hover:opacity-80" : "bg-gray-500 hover:bg-gray-400"} text-white p-2 rounded-md w-full`}
        onClick={() => setIsClicked(true)}
      >
        {isClicked ? "Tombol sudah diklik" : "Silakan Klik"}
      </button>
    </div>
  );
}

export default PostCard;