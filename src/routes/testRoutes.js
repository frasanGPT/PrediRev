// src/routes/testRoutes.js
import express from "express";

const router = express.Router();

// Ruta pública de prueba
router.get("/ping", (req, res) => {
  res.json({
    mensaje: "Conexión establecida con PrediRev API",
    horaServidor: new Date().toLocaleString(),
  });
});

export default router;
