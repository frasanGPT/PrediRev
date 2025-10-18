// src/screens/NuevaPersonaScreen.js
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from "react-native";
import API, { autoLogin } from "../api/axiosConfig";

export default function NuevaPersonaScreen({ goBack }) {
  const [form, setForm] = useState({
    nombre1: "",
    apellido1: "",
    barrio: "",
    TarjetaPred: "",
  });

  const handleChange = (name, value) => setForm({ ...form, [name]: value });

  const handleSubmit = async () => {
    if (!form.nombre1 || !form.apellido1 || !form.barrio) {
      Alert.alert("Campos incompletos", "Por favor completa nombre, apellido y barrio.");
      return;
    }

    // 🔹 Limpieza y campos mínimos requeridos por el backend
    const payload = {
      ...form,
      barrio: form.barrio.trim().normalize("NFD").replace(/[\u0300-\u036f]/g, ""), // elimina tildes
      activo: "True",
      Tema: "Predicación general", // valor por defecto temporal
    };

    console.log("📤 Enviando datos:", payload);

    try {
      await autoLogin();
      const { data } = await API.post("/personas", payload);
      Alert.alert("✅ Registro exitoso", "La persona fue registrada correctamente.");
      console.log("✅ Persona creada:", data);
      setForm({ nombre1: "", apellido1: "", barrio: "", TarjetaPred: "" });
    } catch (error) {
      Alert.alert("❌ Error", error.message);
      console.log("❌ Error al crear persona:", error.response?.data || error.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Registrar Persona</Text>

      <TextInput
        style={styles.input}
        placeholder="Primer nombre"
        value={form.nombre1}
        onChangeText={(v) => handleChange("nombre1", v)}
      />
      <TextInput
        style={styles.input}
        placeholder="Primer apellido"
        value={form.apellido1}
        onChangeText={(v) => handleChange("apellido1", v)}
      />
      <TextInput
        style={styles.input}
        placeholder="Barrio"
        value={form.barrio}
        onChangeText={(v) => handleChange("barrio", v)}
      />
      <TextInput
        style={styles.input}
        placeholder="Tarjeta Pred (opcional)"
        keyboardType="numeric"
        value={form.TarjetaPred}
        onChangeText={(v) => handleChange("TarjetaPred", v)}
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Guardar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={goBack} style={styles.backButton}>
        <Text style={styles.backText}>← Volver</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#007AFF",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  backButton: { marginTop: 30, alignItems: "center" },
  backText: { color: "#007AFF", fontSize: 16 },
});
