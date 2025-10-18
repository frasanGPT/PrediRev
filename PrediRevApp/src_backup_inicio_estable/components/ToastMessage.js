// src/components/ToastMessage.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function ToastMessage({ message, visible }) {
  if (!visible) return null;

  return (
    <View style={styles.toast}>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  toast: {
    position: "absolute",
    bottom: 40,
    alignSelf: "center",
    backgroundColor: "rgba(0,0,0,0.8)",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  text: { color: "#fff", fontWeight: "600" },
});
