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

import personaRoutes from "./routes/personaRoutes.js";
import publicadorRoutes from "./routes/publicadorRoutes.js";
import revisitaRoutes from "./routes/revisitaRoutes.js";


app.use("/api/personas", personaRoutes);
app.use("/api/publicadores", publicadorRoutes);
app.use("/api/revisitas", revisitaRoutes);





// Rutas básicas de prueba
app.get("/", (req, res) => {
  res.send("Servidor PrediRev activo 🚀");
});

// Puerto de conexión
const PORT = process.env.PORT || 3000;

// Conexión a MongoDB
connectDB();


app.listen(PORT, () => {
  console.log(`✅ Servidor PrediRev ejecutándose en el puerto ${PORT}`);
});
