// src/screens/PublicadoresScreen.js
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
import { globalStyles, colors } from "../theme/GlobalStyles";

/**
 * Pantalla Publicadores
 *  - Lista con paginación local (5 por página)
 *  - Adaptada al modelo actual de Publicador en backend
 */
export default function PublicadoresScreen({ goBack }) {
  const [publicadores, setPublicadores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const pageSize = 5;

  // 🔹 Cargar publicadores desde el backend
  const cargarPublicadores = useCallback(async () => {
    setLoading(true);
    try {
      await autoLogin();
      const { data } = await API.get("/publicadores");
      // Mostramos los más recientes primero
      setPublicadores(data.reverse());
    } catch (error) {
      console.warn("❌ Error al cargar publicadores:", error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    cargarPublicadores();
  }, [cargarPublicadores]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={{ marginTop: 10 }}>Cargando publicadores...</Text>
      </View>
    );
  }

  // 🔹 Cálculo de paginación local
  const totalPages = Math.ceil(publicadores.length / pageSize);
  const startIndex = (page - 1) * pageSize;
  const visibles = publicadores.slice(startIndex, startIndex + pageSize);

  return (
    <View style={globalStyles.screenContainer}>
      <Text style={globalStyles.title}>Publicadores</Text>

      <FlatList
        data={visibles}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            {/* Nombre completo */}
            <Text style={styles.name}>
              {item.nombre} {item.apellido}
            </Text>

            {/* Campos opcionales */}
            {item.correo && (
              <Text style={styles.info}>Correo: {item.correo}</Text>
            )}
            {item.telefono && (
              <Text style={styles.info}>Teléfono: {item.telefono}</Text>
            )}
            {item.congregacion && (
              <Text style={styles.info}>
                Congregación: {item.congregacion}
              </Text>
            )}
            {item.territorioAsignado && (
              <Text style={styles.info}>
                Territorio: {item.territorioAsignado}
              </Text>
            )}
          </View>
        )}
        ListEmptyComponent={
          <Text style={{ textAlign: "center", marginTop: 20 }}>
            No hay publicadores registrados.
          </Text>
        }
      />

      {/* 🔹 Controles de paginación */}
      {publicadores.length > pageSize && (
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
  name: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.textDark,
    marginBottom: 4,
  },
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
