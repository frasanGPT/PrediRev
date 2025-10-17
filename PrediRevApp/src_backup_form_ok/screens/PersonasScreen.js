// src/screens/PersonasScreen.js
import React, { useEffect, useState } from "react";
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from "react-native";
import API, { autoLogin } from "../api/axiosConfig";

export default function PersonasScreen() {
  const [personas, setPersonas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarPersonas = async () => {
      try {
        await autoLogin(); // 🔐 Login automático temporal
        const { data } = await API.get("/personas");
        setPersonas(data);
      } catch (error) {
        console.warn("❌ Error al cargar personas:", error.message);
      } finally {
        setLoading(false);
      }
    };
    cargarPersonas();
  }, []);

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
        ListEmptyComponent={
          <Text style={{ textAlign: "center", marginTop: 20 }}>
            No hay personas registradas.
          </Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
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
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
});

