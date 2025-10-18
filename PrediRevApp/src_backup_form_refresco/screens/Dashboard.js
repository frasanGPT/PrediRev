// src/screens/Dashboard.js
import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function Dashboard({ navigate }) {
  return (
    <LinearGradient colors={["#007AFF", "#00C6FF"]} style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>PrediRev</Text>
        <Text style={styles.subtitle}>Panel principal</Text>

        <View style={styles.cardContainer}>
          <TouchableOpacity style={styles.card} onPress={() => navigate("Personas")}>
            <Text style={styles.cardTitle}>Personas</Text>
            <Text style={styles.cardText}>Ver y registrar personas</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.card} onPress={() => navigate("Publicadores")}>
            <Text style={styles.cardTitle}>Publicadores</Text>
            <Text style={styles.cardText}>Gestionar territorios</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.card} onPress={() => navigate("Reportes")}>
            <Text style={styles.cardTitle}>Reportes</Text>
            <Text style={styles.cardText}>Estadísticas generales</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: {
    paddingVertical: 80,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: "#eaf7ff",
    marginBottom: 40,
  },
  cardContainer: { width: "100%" },
  card: {
    backgroundColor: "rgba(255,255,255,0.9)",
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#007AFF",
    marginBottom: 5,
  },
  cardText: { fontSize: 14, color: "#333" },
});
