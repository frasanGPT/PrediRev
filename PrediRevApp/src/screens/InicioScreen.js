// src/screens/InicioScreen.js
import React, { useEffect, useState, useContext } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { AuthContext } from "../context/AuthContext";

/**
 * 🎬 InicioScreen – Versión actualizada con AuthContext
 * -------------------------------------------------------------
 * Esta pantalla:
 *  ✅ Usa AuthContext en lugar de autoLogin()
 *  ✅ Realiza login automático con credenciales de prueba
 *  ✅ Guarda token y usuario en AsyncStorage
 *  ✅ Navega al Dashboard tras confirmación
 *  ✅ Reintenta automáticamente si falla
 * -------------------------------------------------------------
 */

export default function InicioScreen() {
  const { login } = useContext(AuthContext); // usamos la función login() global
  const [mensaje, setMensaje] = useState("Iniciando sesión...");

  useEffect(() => {
    const loginYContinuar = async () => {
      console.log("🌀 Cargando InicioScreen...");
      try {
        // ⚙️ Credenciales temporales para pruebas
        const correo = "frasandev2009@gmail.com";
        const password = "PrediRev2025";

        // 🔑 Llamada real al login del backend
        const resultado = await login(correo, password);

        if (resultado.success) {
          setMensaje("✅ Sesión iniciada correctamente");
        } else {
          throw new Error("Credenciales inválidas o fallo de conexión");
        }
      } catch (error) {
        console.log("⚠️ Error en login automático:", error.message);
        setMensaje("Error de conexión. Reintentando...");
        // 🔁 Reintenta automáticamente después de 3 segundos
        setTimeout(loginYContinuar, 3000);
      }
    };

    loginYContinuar();
  }, []);

  return (
    <LinearGradient colors={["#007AFF", "#00C6FF"]} style={styles.container}>
      <Text style={styles.title}>PrediRev</Text>

      <ActivityIndicator size="large" color="#fff" style={{ marginVertical: 20 }} />

      <Text style={styles.text}>{mensaje}</Text>
      <Text style={styles.note}>Login automático con AuthContext</Text>
    </LinearGradient>
  );
}

// 🎨 Estilos visuales
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#fff",
  },
  text: {
    color: "#eaf7ff",
    fontSize: 16,
    textAlign: "center",
    marginTop: 10,
  },
  note: {
    color: "#bde0ff",
    fontSize: 12,
    marginTop: 40,
    fontStyle: "italic",
  },
});
