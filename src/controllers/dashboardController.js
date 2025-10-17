// src/controllers/dashboardController.js
import Revisita from "../models/Revisita.js";
import Territorio from "../models/Territorio.js";
import Publicador from "../models/Publicador.js";
import Persona from "../models/Persona.js";

/* ------------------------------------------------------------------
   🔹 RESUMEN GENERAL
------------------------------------------------------------------ */
export const obtenerResumenGlobal = async (req, res) => {
  try {
    const [totalPublicadores, totalPersonas, totalTerritorios, totalRevisitas] = await Promise.all([
      Publicador.countDocuments(),
      Persona.countDocuments(),
      Territorio.countDocuments(),
      Revisita.countDocuments(),
    ]);

    res.status(200).json({
      totalPublicadores,
      totalPersonas,
      totalTerritorios,
      totalRevisitas,
    });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener resumen global", error: error.message });
  }
};

/* ------------------------------------------------------------------
   🔹 MÉTRICAS DIARIAS DE REVISITAS
------------------------------------------------------------------ */
export const obtenerRevisitasPorDia = async (req, res) => {
  try {
    const resultados = await Revisita.aggregate([
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$fecha" },
          },
          total: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    const data = resultados.map((r) => ({ fecha: r._id, total: r.total }));

    res.status(200).json({ revisitasPorDia: data });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener revisitas por día", error: error.message });
  }
};

/* ------------------------------------------------------------------
   🔹 MÉTRICAS SEMANALES (revisitas por semana ISO)
------------------------------------------------------------------ */
export const obtenerRevisitasPorSemana = async (req, res) => {
  try {
    const resultados = await Revisita.aggregate([
      {
        $group: {
          _id: { $isoWeek: "$fecha" },
          total: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    const data = resultados.map((r) => ({
      semanaISO: r._id,
      total: r.total,
    }));

    res.status(200).json({ revisitasPorSemana: data });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener revisitas semanales", error: error.message });
  }
};

/* ------------------------------------------------------------------
   🔹 MÉTRICAS MENSUALES
------------------------------------------------------------------ */
export const obtenerRevisitasPorMes = async (req, res) => {
  try {
    const resultados = await Revisita.aggregate([
      {
        $group: {
          _id: { $month: "$fecha" },
          total: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    const data = resultados.map((r) => ({
      mes: r._id,
      total: r.total,
    }));

    res.status(200).json({ revisitasPorMes: data });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener revisitas mensuales", error: error.message });
  }
};

/* ------------------------------------------------------------------
   🔹 TERRITORIOS ASIGNADOS Y DISPONIBLES
------------------------------------------------------------------ */
export const obtenerEstadoTerritorios = async (req, res) => {
  try {
    const resultados = await Territorio.aggregate([
      { $group: { _id: "$estado", total: { $sum: 1 } } },
    ]);

    const data = resultados.map((r) => ({ estado: r._id, total: r.total }));

    res.status(200).json({ territoriosPorEstado: data });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener estados de territorios", error: error.message });
  }
};
