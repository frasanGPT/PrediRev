// src/routes/revisitaRoutes.js
import express from "express";
import {
  crearRevisita,
  obtenerRevisitas,
  obtenerRevisitaPorId,
  actualizarRevisita,
  eliminarRevisita,
  obtenerRevisitasPorPublicador,
  obtenerRevisitasPorPersona,
  obtenerRevisitasPorFecha,
  obtenerRevisitasPorPublicadorYFecha
} from "../controllers/revisitaController.js";

import {
  verificarToken,
  soloAdmin,
  soloSuperAdmin
} from "../middleware/authMiddleware.js";

const router = express.Router();

/* ------------------------------------------------------------------
   🔹 CRUD PRINCIPAL DE REVISITAS
------------------------------------------------------------------ */

// ➕ Crear revisita (publicador, admin o superadmin)
router.post("/", verificarToken, crearRevisita);

// 📋 Obtener todas las revisitas (cualquier usuario autenticado)
router.get("/", verificarToken, obtenerRevisitas);

// 🔍 Obtener revisita por ID (cualquier usuario autenticado)
router.get("/:id", verificarToken, obtenerRevisitaPorId);

// ✏️ Actualizar revisita (solo admin o superadmin)
router.put("/:id", verificarToken, soloAdmin, actualizarRevisita);

// 🗑️ Eliminar revisita (solo superadmin)
router.delete("/:id", verificarToken, soloSuperAdmin, eliminarRevisita);

/* ------------------------------------------------------------------
   🔹 BÚSQUEDAS PERSONALIZADAS
------------------------------------------------------------------ */

// 🔸 Buscar revisitas por publicador
router.get("/publicador/:idPublicador", verificarToken, obtenerRevisitasPorPublicador);

// 🔸 Buscar revisitas por persona
router.get("/persona/:idPersona", verificarToken, obtenerRevisitasPorPersona);

// 🔸 Buscar revisitas dentro de un rango de fechas
router.get("/fecha/rango", verificarToken, obtenerRevisitasPorFecha);

// 🔸 Buscar revisitas por publicador dentro de un rango de fechas
router.get("/publicador/:idPublicador/fecha/rango", verificarToken, obtenerRevisitasPorPublicadorYFecha);

export default router;
