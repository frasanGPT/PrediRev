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

import {
  verificarToken,
  soloAdmin,
  soloSuperAdmin
} from "../middleware/authMiddleware.js";

const router = express.Router();

/* ------------------------------------------------------------------
   🔹 Crear nuevo publicador (Solo admin o superadmin)
------------------------------------------------------------------ */
router.post("/", verificarToken, soloAdmin, crearPublicador);

/* ------------------------------------------------------------------
   🔹 Obtener todos los publicadores (Cualquier usuario autenticado)
------------------------------------------------------------------ */
router.get("/", verificarToken, obtenerPublicadores);

/* ------------------------------------------------------------------
   🔹 Obtener publicador por ID (Cualquier usuario autenticado)
------------------------------------------------------------------ */
router.get("/:id", verificarToken, obtenerPublicadorPorId);

/* ------------------------------------------------------------------
   🔹 Actualizar publicador (Solo admin o superadmin)
------------------------------------------------------------------ */
router.put("/:id", verificarToken, soloAdmin, actualizarPublicador);

/* ------------------------------------------------------------------
   🔹 Eliminar publicador (Solo superadmin)
------------------------------------------------------------------ */
router.delete("/:id", verificarToken, soloSuperAdmin, eliminarPublicador);

/* ------------------------------------------------------------------
   🔹 Asignar persona a publicador (Solo admin o superadmin)
------------------------------------------------------------------ */
router.post("/asignar", verificarToken, soloAdmin, asignarPersona);

export default router;
