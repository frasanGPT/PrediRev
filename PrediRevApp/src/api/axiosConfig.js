c// src/api/axiosConfig.js
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * 🌐 Configuración central de Axios - PrediRevApp
 * ------------------------------------------------------------
 * Esta versión reemplaza el login automático por un flujo real
 * controlado por AuthContext. Incluye:
 *   ✅ BaseURL local para Expo Go (red Wi-Fi)
 *   ✅ Headers globales JSON
 *   ✅ Interceptor que agrega el token JWT desde AsyncStorage
 *   ✅ Manejo unificado de errores
 * ------------------------------------------------------------
 */

// 🔹 Dirección IP local del backend
// ⚠️ Reemplázala si cambia tu red Wi-Fi o IP.
const API_BASE_URL = "http://192.168.1.3:3000/api";

// 🔹 Crear instancia global de Axios
const API = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
  timeout: 10000, // 10 segundos por petición
});

// 🧩 Interceptor: agrega el token JWT a cada request automáticamente
API.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.warn("⚠️ Error recuperand
