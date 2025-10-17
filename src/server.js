// src/server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

dotenv.config();
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// 🔗 Importar rutas (una sola vez cada una)
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

// Ruta base de prueba
app.get("/", (req, res) => {
  res.send("Servidor PrediRev activo 🚀");
});

// Puerto y conexión
const PORT = process.env.PORT || 3000;
connectDB();
/*
app.listen(PORT, () => {
  console.log(`✅ Servidor PrediRev ejecutándose en el puerto ${PORT}`);
});
*/

app.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ Servidor PrediRev disponible en red local: http://<tu_ip_local>:${PORT}`);
});
