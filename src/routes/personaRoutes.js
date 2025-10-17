// src/routes/personaRoutes.js
import express from "express";
import {
  crearPersona,
  obtenerPersonas,
  obtenerPersonaPorId,
  actualizarPersona,
  eliminarPersona
} from "../controllers/personaController.js";

const router = express.Router();

router.post("/", crearPersona);
router.get("/", obtenerPersonas);
router.get("/:id", obtenerPersonaPorId);
router.put("/:id", actualizarPersona);
router.delete("/:id", eliminarPersona);

export default router;
