import axios from "axios";

const API_URL = "https://jwt-auth-eight-neon.vercel.app"; // URL backend

export const loginService = async (email, password) => {
  try {
    const response = await axios.post(
      `${API_URL}/login`,
      { email, password }, 
    );

    return response.data;
  } catch (error) {
    throw error.response?.data || { msg: "Login gagal" };
  }
};

export const registerService = async (name, email, password) => {
  try {
    const response = await axios.post(
      `${API_URL}/register`,
      { name, email, password },
    );

    return response.data;
  } catch (error) {
    throw error.response?.data || { msg: "Register gagal" };
  }
};

export const getExpensesService = async () => {
  const token = localStorage.getItem("token");

  try {
    const response = await axios.get(`${API_URL}/expenses`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Backend membungkus payload di dalam `data` (lihat pola yang sama di /goals)
    return response.data?.data ?? response.data ?? [];
  } catch (error) {
    throw error.response?.data || { msg: "Gagal mengambil data expenses" };
  }
};

export const getBillsService = async () => {
  const token = localStorage.getItem("token");

  try {
    const response = await axios.get(`${API_URL}/bills`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data?.data ?? response.data ?? [];
  } catch (error) {
    throw error.response?.data || { msg: "Gagal mengambil data upcoming bill" };
  }
};
