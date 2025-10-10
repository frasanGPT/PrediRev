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

const router = express.Router();

// Rutas CRUD principales
router.post("/", crearTiempo);             // Crear registro de tiempo
router.get("/", obtenerTiempos);           // Listar solo activos
router.get("/:id", obtenerTiempoPorId);    // Obtener por ID
router.put("/:id", actualizarTiempo);      // Actualizar registro
router.delete("/:id", eliminarTiempo);     // Eliminar (solo SA)

// Ruta de control de estado
router.patch("/:id/estado", cambiarEstadoTiempo); // Activar/Inactivar

export default router;
