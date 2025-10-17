// App.js
import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, StatusBar } from "react-native";
import Dashboard from "./src/screens/Dashboard";
import PersonasScreen from "./src/screens/PersonasScreen";
import PublicadoresScreen from "./src/screens/PublicadoresScreen";
import ReportesScreen from "./src/screens/ReportesScreen";

export default function App() {
  const [screen, setScreen] = useState("Dashboard");

  const renderScreen = () => {
    switch (screen) {
      case "Personas":
        return <PersonasScreen goBack={() => setScreen("Dashboard")} />;
      case "Publicadores":
        return <PublicadoresScreen goBack={() => setScreen("Dashboard")} />;
      case "Reportes":
        return <ReportesScreen goBack={() => setScreen("Dashboard")} />;
      default:
        return <Dashboard navigate={setScreen} />;
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
