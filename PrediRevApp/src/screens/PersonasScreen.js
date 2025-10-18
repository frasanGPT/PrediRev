// src/screens/PersonasScreen.js
import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import API, { autoLogin } from "../api/axiosConfig";
import NuevaPersonaScreen from "./NuevaPersonaScreen";
import { globalStyles, colors } from "../theme/GlobalStyles";

/**
 * Pantalla Personas (paginada localmente)
 *  - Muestra 5 personas por página
 *  - Botones “Anterior” y “Siguiente”
 *  - Diseño coherente con el resto de la app
 */
export default function PersonasScreen({ goBack }) {
  const [personas, setPersonas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [shouldRefresh, setShouldRefresh] = useState(false);
  const [page, setPage] = useState(1);
  const pageSize = 5; // 🔹 Mostrar 5 personas por página

  // Cargar datos desde el backend
  const cargarPersonas = useCallback(async () => {
    setLoading(true);
    try {
      await autoLogin();
      const { data } = await API.get("/personas");
      setPersonas(data.reverse()); // 🔹 Las más recientes primero
    } catch (error) {
      console.warn("❌ Error al cargar personas:", error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    cargarPersonas();
  }, [cargarPersonas]);

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
          setShouldRefresh(true);
        }}
      />
    );
  }

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={{ marginTop: 10 }}>Cargando personas...</Text>
      </View>
    );
  }

  // 🔹 Cálculo de las páginas
  const totalPages = Math.ceil(personas.length / pageSize);
  const startIndex = (page - 1) * pageSize;
  const visiblePersonas = personas.slice(startIndex, startIndex + pageSize);

  return (
    <View style={globalStyles.screenContainer}>
      <Text style={globalStyles.title}>Personas</Text>

      <TouchableOpacity style={globalStyles.button} onPress={() => setShowForm(true)}>
        <Text style={globalStyles.buttonText}>+ Nueva Persona</Text>
      </TouchableOpacity>

      {/* 🔹 Lista paginada */}
      <FlatList
        data={visiblePersonas}
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

      {/* 🔹 Controles de paginación */}
      {personas.length > pageSize && (
        <View style={styles.pagination}>
          <TouchableOpacity
            style={[styles.pageButton, page === 1 && styles.disabledButton]}
            onPress={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1}
          >
            <Text style={styles.pageButtonText}>← Anterior</Text>
          </TouchableOpacity>

          <Text style={styles.pageIndicator}>
            Página {page} de {totalPages}
          </Text>

          <TouchableOpacity
            style={[styles.pageButton, page === totalPages && styles.disabledButton]}
            onPress={() => setPage((p) => Math.min(p + 1, totalPages))}
            disabled={page === totalPages}
          >
            <Text style={styles.pageButtonText}>Siguiente →</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* 🔹 Botón volver */}
      <TouchableOpacity onPress={goBack} style={styles.backButton}>
        <Text style={styles.backText}>← Volver al Dashboard</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#f4f9ff",
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    borderColor: colors.primary,
    borderWidth: 0.5,
  },
  name: { fontSize: 16, fontWeight: "600" },
  info: { fontSize: 14, color: colors.textDark },
  pagination: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 15,
  },
  pageButton: {
    backgroundColor: colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  disabledButton: {
    backgroundColor: "#b3d4ff",
  },
  pageButtonText: {
    color: colors.textLight,
    fontWeight: "bold",
    fontSize: 14,
  },
  pageIndicator: {
    fontSize: 14,
    color: colors.textDark,
  },
  backButton: { marginTop: 25, alignItems: "center" },
  backText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: "500",
  },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
});
