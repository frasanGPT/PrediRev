// src/api/axiosConfig.js
import axios from "axios";

// 🔹 URL del backend accesible desde tu iPhone
const API_BASE_URL = "http://192.168.1.3:3000/api";

// 🔹 Credenciales temporales para pruebas
const DEFAULT_USER = {
  correo: "frasandev2009@gmail.com",
  password: "PrediRev2025",
};

const API = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// 🔸 Login automático temporal
export const autoLogin = async () => {
  try {
    const response = await API.post("/auth/login", DEFAULT_USER);
    const token = response.data.token;
    if (token) {
      API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      console.log("✅ Login automático exitoso");
    }
  } catch (error) {
    console.warn("⚠️ Falló el login automático:", error.message);
  }
};

export default API;
