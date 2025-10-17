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
  obtenerRevisitasPorPublicadorYFecha,
  obtenerEstadisticasPorPublicador    // ✅ <-- esta línea
} from "../controllers/revisitaController.js";






const router = express.Router();

// CRUD principal
router.post("/", crearRevisita);
router.get("/", obtenerRevisitas);
router.get("/:id", obtenerRevisitaPorId);
router.put("/:id", actualizarRevisita);
router.delete("/:id", eliminarRevisita);

// 📌 Nuevas rutas de búsqueda
router.get("/publicador/:idPublicador", obtenerRevisitasPorPublicador);
router.get("/persona/:idPersona", obtenerRevisitasPorPersona);
router.get("/fecha/rango", obtenerRevisitasPorFecha);
router.get("/publicador/:idPublicador/fecha/rango", obtenerRevisitasPorPublicadorYFecha);

// 📊 Estadísticas por publicador (rango de fechas)
router.get("/estadisticas/publicadores", obtenerEstadisticasPorPublicador);



export default router;
