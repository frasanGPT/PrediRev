// App.js
import React, { useState } from "react";
import { View, StyleSheet, StatusBar } from "react-native";
import InicioScreen from "./src/screens/InicioScreen";
import Dashboard from "./src/screens/Dashboard";
import PersonasScreen from "./src/screens/PersonasScreen";
import PublicadoresScreen from "./src/screens/PublicadoresScreen";
import ReportesScreen from "./src/screens/ReportesScreen";

/**
 * App principal de PrediRev (Expo Go)
 *
 * Flujo:
 *  1️⃣ InicioScreen → ejecuta autoLogin()
 *  2️⃣ Si el login es exitoso → navega automáticamente al Dashboard
 *  3️⃣ Desde el Dashboard se accede a Personas, Publicadores, Reportes
 *
 * Se mantiene la navegación manual mediante el estado "screen" sin dependencias externas.
 */
export default function App() {
  const [screen, setScreen] = useState("Inicio");

  const renderScreen = () => {
    switch (screen) {
      case "Dashboard":
        return <Dashboard navigate={setScreen} />;
      case "Personas":
        return <PersonasScreen goBack={() => setScreen("Dashboard")} />;
      case "Publicadores":
        return <PublicadoresScreen goBack={() => setScreen("Dashboard")} />;
      case "Reportes":
        return <ReportesScreen goBack={() => setScreen("Dashboard")} />;
      default:
        // Pantalla inicial (login automático)
        return <InicioScreen navigate={setScreen} />;
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      {renderScreen()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
