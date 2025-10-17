// src/routes/dashboardRoutes.js
import express from "express";
import {
  obtenerResumenGlobal,
  obtenerRevisitasPorDia,
  obtenerRevisitasPorSemana,
  obtenerRevisitasPorMes,
  obtenerEstadoTerritorios
} from "../controllers/dashboardController.js";

import { verificarToken, soloAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// 📈 Endpoints de métricas protegidos (solo admin/superadmin)
router.get("/resumen", verificarToken, soloAdmin, obtenerResumenGlobal);
router.get("/revisitas/dia", verificarToken, soloAdmin, obtenerRevisitasPorDia);
router.get("/revisitas/semana", verificarToken, soloAdmin, obtenerRevisitasPorSemana);
router.get("/revisitas/mes", verificarToken, soloAdmin, obtenerRevisitasPorMes);
router.get("/territorios/estado", verificarToken, soloAdmin, obtenerEstadoTerritorios);

export default router;
