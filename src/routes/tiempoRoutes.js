// src/routes/tiempoRoutes.js
import express from "express";
import {
  crearTiempo,
  obtenerTiempos,
  obtenerTiempoPorId,
  actualizarTiempo,
  cambiarEstadoTiempo,
  eliminarTiempo
} from "../controllers/tiempoController.js";
import { verificarToken } from "../middleware/authMiddleware.js"; // ✅ Protección
import Tiempo from "../models/Tiempo.js"; // ✅ Necesario para la nueva ruta

const router = express.Router();

// 🧩 CRUD principal (protegido)
router.post("/", verificarToken, crearTiempo);
router.get("/", verificarToken, obtenerTiempos);
router.get("/:id", verificarToken, obtenerTiempoPorId);
router.put("/:id", verificarToken, actualizarTiempo);
router.delete("/:id", verificarToken, eliminarTiempo);
router.patch("/:id/estado", verificarToken, cambiarEstadoTiempo);

// ✅ Nueva ruta: obtener tiempos por publicador (sin exponer password)
router.get("/publicador/:idPublicador", verificarToken, async (req, res) => {
  try {
    const { idPublicador } = req.params;
    const tiempos = await Tiempo.find({ idPublicador })
      .populate("idPublicador", "nombre apellido telefono congregacion rol"); // 🧹 sin password
    if (tiempos.length === 0)
      return res.status(404).json({ mensaje: "No hay registros de tiempo para este publicador" });
    res.status(200).json(tiempos);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener tiempos por publicador", error: error.message });
  }
});

export default router;
