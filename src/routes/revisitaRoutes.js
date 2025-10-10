// src/routes/revisitaRoutes.js
import express from "express";
import {
  crearRevisita,
  obtenerRevisitas,
  obtenerRevisitaPorId,
  actualizarRevisita,
  cambiarEstadoRevisita,
  marcarComoCompletada,
  eliminarRevisita
} from "../controllers/revisitaController.js";

const router = express.Router();

// Rutas CRUD principales
router.post("/", crearRevisita);              // Crear nueva revisita
router.get("/", obtenerRevisitas);            // Listar solo activas
router.get("/:id", obtenerRevisitaPorId);     // Obtener por ID
router.put("/:id", actualizarRevisita);       // Actualizar revisita
router.delete("/:id", eliminarRevisita);      // Eliminar (solo SA)

// Rutas de control específicas
router.patch("/:id/estado", cambiarEstadoRevisita);       // Activar/Inactivar revisita
router.patch("/:id/completada", marcarComoCompletada);    // Marcar revisita como completada

export default router;
