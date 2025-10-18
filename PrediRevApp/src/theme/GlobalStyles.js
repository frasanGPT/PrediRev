// src/theme/GlobalStyles.js
// 🎨 Estilos globales de PrediRev para mantener coherencia visual

export const colors = {
    primary: "#007AFF",
    primaryLight: "#00C6FF",
    textDark: "#333",
    textLight: "#fff",
    background: "#f9f9f9",
    border: "#ccc",
  };
  
  export const globalStyles = {
    screenContainer: {
      flex: 1,
      backgroundColor: colors.background,
      padding: 20,
    },
    title: {
      fontSize: 22,
      fontWeight: "bold",
      color: colors.primary,
      marginBottom: 10,
    },
    button: {
      backgroundColor: colors.primary,
      padding: 15,
      borderRadius: 10,
      alignItems: "center",
      marginVertical: 8,
    },
    buttonText: {
      color: colors.textLight,
      fontWeight: "bold",
      fontSize: 16,
    },
    input: {
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 8,
      padding: 10,
      marginBottom: 15,
      backgroundColor: "#fff",
    },
  };
  