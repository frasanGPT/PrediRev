// src/routes/territorioRoutes.js
import express from "express";
import {
  crearTerritorio,
  obtenerTerritorios,
  obtenerTerritorioPorId,
  actualizarTerritorio,
  eliminarTerritorio,
  asignarPublicador,
  marcarTerritorioDevuelto,
  agregarPersonaATerritorio
} from "../controllers/territorioController.js";

const router = express.Router();

// 📦 CRUD completo
router.post("/", crearTerritorio);
router.get("/", obtenerTerritorios);
router.get("/:id", obtenerTerritorioPorId);
router.put("/:id", actualizarTerritorio);
router.delete("/:id", eliminarTerritorio);

// 🔗 Acciones especiales
router.post("/asignar-publicador", asignarPublicador);
router.post("/devolver", marcarTerritorioDevuelto);
router.post("/agregar-persona", agregarPersonaATerritorio);

export default router;
