import React, { useContext } from 'react'
import Swal from 'sweetalert2';
import AuthLayout from '../components/Layouts/AuthLayout';
import FormSignin from '../components/Fragments/FormSignin';
import { loginService } from '../services/authService';
import { AuthContext } from '../context/authContext';

function Signin() {
  const { login } = useContext(AuthContext);

  const handleLogin = async (email, password) => {
    try {
      const { refreshToken } = await loginService(email, password);
      login(refreshToken);
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Login gagal",
        text: err?.msg || "Email atau password salah. Silakan coba lagi.",
      });
      throw err; // supaya FormSignin tahu proses submit selesai (gagal)
    }
  };

  return (
    <AuthLayout title="Sign in to your account">
      <FormSignin onSubmit={handleLogin} />
    </AuthLayout>
  )
}

export default Signin