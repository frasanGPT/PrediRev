// src/routes/dashboardRoutes.js
import express from "express";
import {
  obtenerResumenGlobal,
  obtenerRevisitasPorDia,
  obtenerRevisitasPorSemana,
  obtenerRevisitasPorMes,
  obtenerEstadoTerritorios,
  obtenerDashboardResumen
} from "../controllers/dashboardController.js";

import { verificarToken } from "../middleware/authMiddleware.js";

const router = express.Router();

/* ------------------------------------------------------------------
   📊 RUTAS DE MÉTRICAS Y RESUMEN GENERAL
------------------------------------------------------------------ */

// 🔸 Métricas básicas (libres o protegidas según tus necesidades)
router.get("/global", obtenerResumenGlobal);
router.get("/revisitas/dia", obtenerRevisitasPorDia);
router.get("/revisitas/semana", obtenerRevisitasPorSemana);
router.get("/revisitas/mes", obtenerRevisitasPorMes);
router.get("/territorios/estado", obtenerEstadoTerritorios);

/* ------------------------------------------------------------------
   📈 NUEVO: RESUMEN GLOBAL PARA EL DASHBOARD DE LA APP EXPO
   - Requiere autenticación con token JWT
------------------------------------------------------------------ */
router.get("/resumen", verificarToken, obtenerDashboardResumen);

export default router;
