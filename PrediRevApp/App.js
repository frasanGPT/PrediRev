// App.js
import React, { useContext } from "react";
import { View, ActivityIndicator, StyleSheet, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { AuthProvider, AuthContext } from "./src/context/AuthContext";
import DrawerNavigator from "./src/navigation/DrawerNavigator";
import InicioScreen from "./src/screens/InicioScreen";

/**
 * 🚀 App principal de PrediRevApp (versión con Drawer + Roles)
 * ---------------------------------------------------------------
 * 1️⃣ Usa AuthProvider para manejar login/logout globalmente.
 * 2️⃣ Muestra InicioScreen si no hay sesión.
 * 3️⃣ Muestra DrawerNavigator si hay sesión activa.
 * 4️⃣ Controla loader inicial mientras se valida AsyncStorage.
 * ---------------------------------------------------------------
 */

// 🔹 Componente principal que decide qué mostrar
function MainApp() {
  const { usuario, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#00897B" />
      </View>
    );
  }

  return usuario ? (
    <DrawerNavigator />
  ) : (
    <InicioScreen />
  );
}

// 🔹 Envuelve todo con el AuthProvider
export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <StatusBar barStyle="light-content" />
        <MainApp />
      </NavigationContainer>
    </AuthProvider>
  );
}

// 🎨 Estilos básicos
const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
});
