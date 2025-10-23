// src/server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import os from "os";
import { connectDB } from "./config/db.js";
import devAuthRoutes from "./routes/devAuth.js";

dotenv.config();
const app = express();

// 🧩 Middlewares
app.use(cors());
app.use(express.json());

// 🔗 Importar rutas
import personaRoutes from "./routes/personaRoutes.js";
import publicadorRoutes from "./routes/publicadorRoutes.js";
import revisitaRoutes from "./routes/revisitaRoutes.js";
import tiempoRoutes from "./routes/tiempoRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import testRoutes from "./routes/testRoutes.js";
import territorioRoutes from "./routes/territorioRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";

// 🧭 Registrar rutas
app.use("/api/personas", personaRoutes);
app.use("/api/publicadores", publicadorRoutes);
app.use("/api/revisitas", revisitaRoutes);
app.use("/api/tiempos", tiempoRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/test", testRoutes);
app.use("/api/territorios", territorioRoutes);
app.use("/api/dashboard", dashboardRoutes);

// Solo habilitar en entorno de desarrollo
if (process.env.NODE_ENV !== "production") {
  app.use("/api/auth", devAuthRoutes);
}


// Ruta base de prueba
app.get("/", (req, res) => {
  res.send("Servidor PrediRev activo 🚀");
});




// 🧱 Conexión a MongoDB
connectDB();

// 🧭 Detectar IP local automáticamente
const getLocalIP = () => {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === "IPv4" && !iface.internal) {
        return iface.address;
      }
    }
  }
  return "localhost";
};

const localIP = getLocalIP();
const PORT = process.env.PORT || 3000;

// 🚀 Iniciar servidor
app.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ Servidor PrediRev disponible en red local: http://${localIP}:${PORT}`);
  console.log("✅ Conexión exitosa a MongoDB Atlas");
});
