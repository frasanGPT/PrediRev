// src/screens/Dashboard.js
import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { globalStyles, colors } from "../theme/GlobalStyles";

// 📏 Obtenemos el ancho de pantalla para ajustar los botones proporcionalmente
const { width } = Dimensions.get("window");

/**
 * Dashboard principal de PrediRev
 *
 * Mantiene coherencia visual con toda la app:
 *  - Encabezado con gradiente azul
 *  - Botones uniformes con ancho fijo (80 % del ancho de pantalla)
 *  - Sin dependencias externas
 */
export default function Dashboard({ navigate }) {
  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <StatusBar barStyle="light-content" />
      {/* 🔹 Encabezado con gradiente azul */}
      <LinearGradient colors={[colors.primary, colors.primaryLight]} style={styles.header}>
        <Text style={styles.headerTitle}>PrediRev</Text>
        <Text style={styles.headerSubtitle}>Panel principal</Text>
      </LinearGradient>

      {/* 🔹 Contenido principal */}
      <ScrollView contentContainerStyle={styles.content}>
        <TouchableOpacity style={styles.menuButton} onPress={() => navigate("Personas")}>
          <Text style={globalStyles.buttonText}>👥 Personas</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuButton} onPress={() => navigate("Publicadores")}>
          <Text style={globalStyles.buttonText}>📋 Publicadores</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuButton} onPress={() => navigate("Reportes")}>
          <Text style={globalStyles.buttonText}>📊 Reportes</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingVertical: 60,
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 36,
    fontWeight: "bold",
    color: colors.textLight,
  },
  headerSubtitle: {
    fontSize: 18,
    color: "#eaf7ff",
    marginTop: 6,
  },
  content: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
  },
  // 🔹 Botón del menú principal (ancho uniforme)
  menuButton: {
    width: width * 0.8, // 80% del ancho total
    backgroundColor: colors.primary,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginVertical: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
});
