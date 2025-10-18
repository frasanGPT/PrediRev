// src/screens/InicioScreen.js
// Pantalla inicial simple que realiza el login automático y dirige al Dashboard
import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { autoLogin } from "../api/axiosConfig";

/**
 * Esta pantalla:
 *  - Muestra el logo y un texto de bienvenida
 *  - Llama automáticamente a autoLogin()
 *  - Si el login tiene éxito, navega al Dashboard luego de 5 segundos (para visualización)
 *  - Si falla, muestra un mensaje temporal y vuelve a intentar después
 */
export default function InicioScreen({ navigate }) {
  const [mensaje, setMensaje] = useState("Iniciando sesión...");

  useEffect(() => {
    const loginYContinuar = async () => {
      console.log("🌀 Cargando InicioScreen...");
      try {
        await autoLogin();
        setMensaje("✅ Inicio de sesión exitoso");
        // ⏱ Espera 5 segundos para confirmar visualmente la transición
        setTimeout(() => navigate("Dashboard"), 5000);
      } catch (error) {
        console.log("⚠️ Error en autoLogin:", error.message);
        setMensaje("Error de conexión. Reintentando...");
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
      <Text style={styles.note}>Transición retardada 5s (solo para prueba)</Text>
    </LinearGradient>
  );
}

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
