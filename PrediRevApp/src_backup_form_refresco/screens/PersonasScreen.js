// src/screens/PersonasScreen.js
import React, { useEffect, useState, useCallback } from "react";
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity, StyleSheet } from "react-native";
import API, { autoLogin } from "../api/axiosConfig";
import NuevaPersonaScreen from "./NuevaPersonaScreen";

export default function PersonasScreen({ goBack }) {
  const [personas, setPersonas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [shouldRefresh, setShouldRefresh] = useState(false);

  const cargarPersonas = useCallback(async () => {
    setLoading(true);
    try {
      await autoLogin();
      const { data } = await API.get("/personas");
      setPersonas(data);
    } catch (error) {
      console.warn("❌ Error al cargar personas:", error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    cargarPersonas();
  }, [cargarPersonas]);

  // 🔹 Si el formulario indica “refrescar”, volvemos a cargar datos
  useEffect(() => {
    if (shouldRefresh) {
      cargarPersonas();
      setShouldRefresh(false);
    }
  }, [shouldRefresh, cargarPersonas]);

  if (showForm) {
    return (
      <NuevaPersonaScreen
        goBack={() => {
          setShowForm(false);
          setShouldRefresh(true); // ✅ al volver, refresca lista
        }}
      />
    );
  }

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={{ marginTop: 10 }}>Cargando personas...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Personas</Text>

      <TouchableOpacity style={styles.addButton} onPress={() => setShowForm(true)}>
        <Text style={styles.addButtonText}>+ Nueva Persona</Text>
      </TouchableOpacity>

      <FlatList
        data={personas}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.name}>
              {item.nombre1} {item.apellido1}
            </Text>
            <Text style={styles.info}>Barrio: {item.barrio}</Text>
          </View>
        )}
        ListEmptyComponent={<Text style={{ textAlign: "center", marginTop: 20 }}>No hay personas registradas.</Text>}
      />

      <TouchableOpacity onPress={goBack} style={styles.backButton}>
        <Text style={styles.backText}>← Volver</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 10, color: "#007AFF" },
  addButton: {
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 15,
  },
  addButtonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  card: {
    backgroundColor: "#f4f9ff",
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    borderColor: "#007AFF",
    borderWidth: 0.5,
  },
  name: { fontSize: 16, fontWeight: "600" },
  info: { fontSize: 14, color: "#333" },
  backButton: { marginTop: 30, alignItems: "center" },
  backText: { color: "#007AFF", fontSize: 16 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
});
