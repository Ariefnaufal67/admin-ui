import React from "react";
import Swal from "sweetalert2";
import AuthLayout from "../components/Layouts/AuthLayout";
import FormSignUp from "../components/Fragments/FormSignUp";
import { registerService } from "../services/authService";

function SignUp() {
  const handleRegister = async (values) => {
    try {
      const data = await registerService(values.name, values.email, values.password);

      Swal.fire({
        icon: "success",
        title: "Registrasi berhasil",
        text: data?.msg || "Akun berhasil dibuat. Silakan login.",
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Registrasi gagal",
        text: err?.msg || "Terjadi kesalahan saat mendaftar. Coba lagi.",
      });
    }
  };

  return (
    <AuthLayout title="Create your account" type="register">
      <FormSignUp onSubmit={handleRegister} />
    </AuthLayout>
  );
}

export default SignUp;
