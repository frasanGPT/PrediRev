// src/navigation/DrawerNavigator.js
import React, { useContext } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { TouchableOpacity, Text } from "react-native";
import { AuthContext } from "../context/AuthContext";

// Pantallas principales
import Dashboard from "../screens/Dashboard";
import PersonasScreen from "../screens/PersonasScreen";
import PublicadoresScreen from "../screens/PublicadoresScreen";
import ReportesScreen from "../screens/ReportesScreen";

/**
 * 🧭 DrawerNavigator - Menú lateral de PrediRevApp
 * -------------------------------------------------------------
 * Muestra las pantallas disponibles según el rol del usuario.
 * Ya no incluye NavigationContainer porque se maneja en App.js.
 * -------------------------------------------------------------
 */

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  const { usuario, logout } = useContext(AuthContext);

  // 🔹 Rol actual del usuario
  const rol = usuario?.rol || "publicador";

  // 🔹 Botón personalizado de logout
  const LogoutButton = () => (
    <TouchableOpacity
      style={{
        padding: 15,
        backgroundColor: "#E57373",
        flex: 1,
        justifyContent: "center",
      }}
      onPress={logout}
    >
      <Text
        style={{
          color: "#fff",
          textAlign: "center",
          fontWeight: "bold",
          fontSize: 16,
        }}
      >
        Cerrar sesión
      </Text>
    </TouchableOpacity>
  );

  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#00897B" },
        headerTintColor: "#fff",
        drawerActiveTintColor: "#00897B",
      }}
    >
      {/* 🏠 Dashboard (visible para todos) */}
      <Drawer.Screen name="Dashboard" component={Dashboard} />

      {/* 👥 Personas (visible para admin y superadmin) */}
      {(rol === "admin" || rol === "superadmin") && (
        <Drawer.Screen name="Personas" component={PersonasScreen} />
      )}

      {/* 📖 Publicadores (solo superadmin) */}
      {rol === "superadmin" && (
        <Drawer.Screen name="Publicadores" component={PublicadoresScreen} />
      )}

      {/* 📊 Reportes (visible para todos) */}
      <Drawer.Screen name="Reportes" component={ReportesScreen} />

      {/* 🚪 Botón de logout */}
      <Drawer.Screen
        name="Cerrar sesión"
        component={LogoutButton}
        options={{ headerShown: false }}
      />
    </Drawer.Navigator>
  );
}
