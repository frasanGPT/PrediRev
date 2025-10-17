import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>PrediRev</Text>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Personas")}>
        <Text style={styles.buttonText}>Ir a Personas</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Publicadores")}>
        <Text style={styles.buttonText}>Ir a Publicadores</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#f9f9f9" },
  title: { fontSize: 28, fontWeight: "bold", marginBottom: 40, color: "#007AFF" },
  button: { backgroundColor: "#007AFF", padding: 14, borderRadius: 10, marginVertical: 10, width: 200 },
  buttonText: { color: "#fff", fontSize: 16, textAlign: "center" },
});
