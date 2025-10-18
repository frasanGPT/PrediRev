import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import API, { autoLogin } from "../api/axiosConfig";
import ToastMessage from "../components/ToastMessage";

export default function NuevaPersonaScreen({ goBack }) {
  const [form, setForm] = useState({
    nombre1: "",
    apellido1: "",
    barrio: "",
    TarjetaPred: "",
  });
  const [toast, setToast] = useState({ visible: false, message: "" });

  const handleChange = (name, value) => setForm({ ...form, [name]: value });

  const showToast = (msg) => {
    setToast({ visible: true, message: msg });
    setTimeout(() => setToast({ visible: false, message: "" }), 2000);
  };

  const handleSubmit = async () => {
    if (!form.nombre1 || !form.apellido1 || !form.barrio) {
      showToast("Completa los campos requeridos");
      return;
    }

    const payload = {
      ...form,
      barrio: form.barrio.trim().normalize("NFD").replace(/[\u0300-\u036f]/g, ""),
      activo: "True",
      Tema: "Predicación general",
    };

    try {
      await autoLogin();
      await API.post("/personas", payload);
      showToast("✅ Persona guardada");
      setForm({ nombre1: "", apellido1: "", barrio: "", TarjetaPred: "" });
      setTimeout(goBack, 2200); // vuelve después del toast
    } catch (error) {
      console.log("❌ Error:", error.response?.data || error.message);
      showToast("Error al guardar");
    }
  };

  return (
    <View style={{ flex: 1 }}>
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

      <ToastMessage message={toast.message} visible={toast.visible} />
    </View>
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
