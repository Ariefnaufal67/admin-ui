import React from "react";
import { useRouteError, Link } from "react-router-dom";
import Logo from "../components/Elements/Logo";

function ErrorPage() {
  const error = useRouteError();

  // Untuk route yang belum dibuat (jatuh ke path "*"), useRouteError()
  // bisa saja null/undefined -> tidak boleh langsung diakses propertinya.
  const message =
    error?.statusText ||
    error?.message ||
    "Halaman yang kamu tuju tidak ditemukan.";

  return (
    <div className="flex justify-center min-h-screen items-center bg-special-mainBg flex-col text-center px-6">
      <Logo />
      <h1 className="text-2xl font-bold mt-3 mb-1 text-defaultBlack">
        Sorry, an unexpected error has occurred.
      </h1>
      <p className="text-lg text-gray-02">{message}</p>
      <Link to="/" className="text-primary font-bold mt-6">
        Back to Overview
      </Link>
    </div>
  );
}

export default ErrorPage;
