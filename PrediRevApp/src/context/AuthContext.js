// src/context/AuthContext.js
import React, { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import API from "../api/axiosConfig";

/**
 * 🔐 AuthContext - Control de autenticación PrediRevApp
 * --------------------------------------------------------
 * Gestiona:
 *   ✅ Login real contra el backend (/auth/login)
 *   ✅ Logout (elimina token y datos del usuario)
 *   ✅ Persistencia de sesión (AsyncStorage)
 *   ✅ Rol del usuario (superadmin, admin, publicador)
 * --------------------------------------------------------
 */

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null); // objeto con nombre, rol, etc.
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🧩 Cargar sesión previa (si existe)
  useEffect(() => {
    const loadSession = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("usuario");
        const storedToken = await AsyncStorage.getItem("token");
        if (storedUser && storedToken) {
          setUsuario(JSON.parse(storedUser));
          setToken(storedToken);
        }
      } catch (error) {
        console.error("Error cargando sesión:", error);
      } finally {
        setLoading(false);
      }
    };
    loadSession();
  }, []);

  // 🧩 Función de login
  const login = async (correo, password) => {
    try {
      const { data } = await API.post("/auth/login", { correo, password });
      if (data?.token && data?.usuario) {
        setToken(data.token);
        setUsuario(data.usuario);

        await AsyncStorage.setItem("token", data.token);
        await AsyncStorage.setItem("usuario", JSON.stringify(data.usuario));

        console.log("✅ Sesión iniciada:", data.usuario.correo);
        return { success: true, rol: data.usuario.rol };
      }
    } catch (error) {
      console.warn("⚠️ Error en login:", error.response?.data || error.message);
      return { success: false, error };
    }
  };

  // 🧩 Cerrar sesión
  const logout = async () => {
    try {
      await AsyncStorage.multiRemove(["token", "usuario"]);
      setToken(null);
      setUsuario(null);
      console.log("🚪 Sesión cerrada");
    } catch (error) {
      console.error("Error cerrando sesión:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ usuario, token, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
