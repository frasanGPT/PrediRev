// src/screens/NuevaPersonaScreen.js
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
} from "react-native";
import API, { autoLogin } from "../api/axiosConfig";
import ToastMessage from "../components/ToastMessage";
import { globalStyles, colors } from "../theme/GlobalStyles";

/**
 * Formulario completo de registro de Persona
 * - Sin dependencias externas (compatible con Expo Go)
 * - Selector de fecha manual y rápido
 */
export default function NuevaPersonaScreen({ goBack }) {
  const [form, setForm] = useState({
    nombre1: "",
    nombre2: "",
    apellido1: "",
    apellido2: "",
    barrio: "",
    TarjetaPred: "",
    Territorio: "",
    calle: "",
    carrera: "",
    diagonalNo: "",
    casaNo: "",
    piso: "",
    color: "",
    referenciaLLegar: "",
    Acompaniante: "",
    Tema: "",
    observacion: "",
    texto: "",
    publicacion: "",
    telefono: "",
    coordenadasgas: "",
    activo: "True",
    correo: "",
  });

  const [fecharegreso, setFecharegreso] = useState("");
  const [fechapredicacion, setFechapredicacion] = useState("");
  const [toast, setToast] = useState({ visible: false, message: "" });

  const handleChange = (name, value) => setForm({ ...form, [name]: value });

  const showToast = (msg) => {
    setToast({ visible: true, message: msg });
    setTimeout(() => setToast({ visible: false, message: "" }), 2000);
  };

  const handleSubmit = async () => {
    if (!form.nombre1 || !form.barrio || !form.Tema) {
      showToast("Campos requeridos: Nombre1, Barrio, Tema");
      return;
    }

    const payload = {
      ...form,
      barrio: form.barrio.trim().normalize("NFD").replace(/[\u0300-\u036f]/g, ""),
      Tema: form.Tema.trim(),
      fecharegreso: fecharegreso ? new Date(fecharegreso) : null,
      fechapredicacion: fechapredicacion ? new Date(fechapredicacion) : null,
    };

    try {
      await autoLogin();
      await API.post("/personas", payload);
      showToast("✅ Persona registrada");
      setForm({
        nombre1: "",
        nombre2: "",
        apellido1: "",
        apellido2: "",
        barrio: "",
        TarjetaPred: "",
        Territorio: "",
        calle: "",
        carrera: "",
        diagonalNo: "",
        casaNo: "",
        piso: "",
        color: "",
        referenciaLLegar: "",
        Acompaniante: "",
        Tema: "",
        observacion: "",
        texto: "",
        publicacion: "",
        telefono: "",
        coordenadasgas: "",
        activo: "True",
        correo: "",
      });
      setFecharegreso("");
      setFechapredicacion("");
      setTimeout(goBack, 2200);
    } catch (error) {
      console.log("❌ Error al crear persona:", error.response?.data || error.message);
      showToast("Error al guardar");
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={globalStyles.title}>Registrar Persona</Text>

        {/* 🔹 Nombres y Apellidos */}
        <TextInput
          style={globalStyles.input}
          placeholder="Primer nombre *"
          value={form.nombre1}
          onChangeText={(v) => handleChange("nombre1", v)}
        />
        <TextInput
          style={globalStyles.input}
          placeholder="Segundo nombre"
          value={form.nombre2}
          onChangeText={(v) => handleChange("nombre2", v)}
        />
        <TextInput
          style={globalStyles.input}
          placeholder="Primer apellido"
          value={form.apellido1}
          onChangeText={(v) => handleChange("apellido1", v)}
        />
        <TextInput
          style={globalStyles.input}
          placeholder="Segundo apellido"
          value={form.apellido2}
          onChangeText={(v) => handleChange("apellido2", v)}
        />

        {/* 🔹 Dirección */}
        <TextInput
          style={globalStyles.input}
          placeholder="Barrio *"
          value={form.barrio}
          onChangeText={(v) => handleChange("barrio", v)}
        />
        <TextInput
          style={globalStyles.input}
          placeholder="Calle"
          value={form.calle}
          onChangeText={(v) => handleChange("calle", v)}
        />
        <TextInput
          style={globalStyles.input}
          placeholder="Carrera"
          value={form.carrera}
          onChangeText={(v) => handleChange("carrera", v)}
        />
        <TextInput
          style={globalStyles.input}
          placeholder="Casa / Apartamento"
          value={form.casaNo}
          onChangeText={(v) => handleChange("casaNo", v)}
        />

        {/* 🔹 Contacto */}
        <TextInput
          style={globalStyles.input}
          placeholder="Teléfono"
          keyboardType="numeric"
          value={form.telefono}
          onChangeText={(v) => handleChange("telefono", v)}
        />
        <TextInput
          style={globalStyles.input}
          placeholder="Correo electrónico"
          value={form.correo}
          onChangeText={(v) => handleChange("correo", v)}
        />

        {/* 🔹 Datos espirituales */}
        <TextInput
          style={globalStyles.input}
          placeholder="Tema *"
          value={form.Tema}
          onChangeText={(v) => handleChange("Tema", v)}
        />
        <TextInput
          style={globalStyles.input}
          placeholder="Publicación"
          value={form.publicacion}
          onChangeText={(v) => handleChange("publicacion", v)}
        />
        <TextInput
          style={globalStyles.input}
          placeholder="Observación"
          value={form.observacion}
          onChangeText={(v) => handleChange("observacion", v)}
        />

        {/* 🔹 Fechas (entrada manual) */}
        <TextInput
          style={globalStyles.input}
          placeholder="Fecha de regreso (YYYY-MM-DD)"
          value={fecharegreso}
          onChangeText={setFecharegreso}
        />
        <TextInput
          style={globalStyles.input}
          placeholder="Fecha de predicación (YYYY-MM-DD)"
          value={fechapredicacion}
          onChangeText={setFechapredicacion}
        />

        {/* 🔹 Botones */}
        <TouchableOpacity style={globalStyles.button} onPress={handleSubmit}>
          <Text style={globalStyles.buttonText}>Guardar Persona</Text>
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
    backgroundColor: colors.background,
    padding: 20,
    paddingBottom: 60,
  },
  backButton: { marginTop: 30, alignItems: "center" },
  backText: { color: colors.primary, fontSize: 16 },
});
