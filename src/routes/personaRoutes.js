// src/routes/personaRoutes.js
import express from "express";

import {
    crearPersona,
    obtenerPersonas,
    obtenerPersonaPorId,
    actualizarPersona,
    eliminarPersona,
    cambiarEstadoPersona
  } from "../controllers/personaController.js";
  

const router = express.Router();

// Rutas CRUD
router.post("/", crearPersona);           // Crear nueva persona
router.get("/", obtenerPersonas);         // Listar todas las personas
router.get("/:id", obtenerPersonaPorId);  // Obtener persona por ID
router.put("/:id", actualizarPersona);    // Actualizar persona
router.delete("/:id", eliminarPersona);   // Eliminar persona

// Cambiar estado de una persona (activar/inactivar)
router.patch("/:id/activar", cambiarEstadoPersona);


export default router;
