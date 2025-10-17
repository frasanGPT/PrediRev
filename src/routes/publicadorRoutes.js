// src/routes/publicadorRoutes.js
import express from "express";
import {
  crearPublicador,
  obtenerPublicadores,
  obtenerPublicadorPorId,
  actualizarPublicador,
  eliminarPublicador,
  asignarPersona
} from "../controllers/publicadorController.js";

const router = express.Router();

// CRUD básico
router.post("/", crearPublicador);
router.get("/", obtenerPublicadores);
router.get("/:id", obtenerPublicadorPorId);
router.put("/:id", actualizarPublicador);
router.delete("/:id", eliminarPublicador);

// Relación: asignar persona a publicador
router.post("/asignar", asignarPersona);

export default router;
