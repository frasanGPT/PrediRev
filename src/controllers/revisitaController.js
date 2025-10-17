// src/controllers/revisitaController.js
import Revisita from "../models/Revisita.js";
import Persona from "../models/Persona.js";
import Publicador from "../models/Publicador.js";

// ➕ Crear nueva revisita
export const crearRevisita = async (req, res) => {
  try {
    const { idPublicador, idPersona, horainicio, horafinal, tema } = req.body;

    if (!idPublicador || !idPersona || !horainicio || !horafinal || !tema) {
      return res.status(400).json({ mensaje: "Faltan campos requeridos" });
    }

    const publicador = await Publicador.findById(idPublicador);
    const persona = await Persona.findById(idPersona);

    if (!publicador || !persona) {
      return res.status(404).json({ mensaje: "Persona o Publicador no encontrados" });
    }

    const nuevaRevisita = new Revisita(req.body);
    await nuevaRevisita.save();

    res.status(201).json({ mensaje: "Revisita creada exitosamente", data: nuevaRevisita });
  } catch (error) {
    res.status(400).json({ mensaje: "Error al crear la revisita", error: error.message });
  }
};

// 📋 Obtener todas las revisitas
export const obtenerRevisitas = async (req, res) => {
  try {
    const revisitas = await Revisita.find()
      .populate("idPublicador", "nombre apellido telefono congregacion")
      .populate("idPersona", "nombre1 apellido1 barrio Tema activo");
    res.status(200).json(revisitas);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener revisitas", error: error.message });
  }
};

// 🔍 Obtener revisita por ID
export const obtenerRevisitaPorId = async (req, res) => {
  try {
    const revisita = await Revisita.findById(req.params.id)
      .populate("idPublicador", "nombre apellido telefono congregacion")
      .populate("idPersona", "nombre1 apellido1 barrio Tema activo");
    if (!revisita) return res.status(404).json({ mensaje: "Revisita no encontrada" });
    res.status(200).json(revisita);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener la revisita", error: error.message });
  }
};

// ✏️ Actualizar revisita
export const actualizarRevisita = async (req, res) => {
  try {
    const revisitaActualizada = await Revisita.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!revisitaActualizada) return res.status(404).json({ mensaje: "Revisita no encontrada" });
    res.status(200).json({ mensaje: "Revisita actualizada correctamente", data: revisitaActualizada });
  } catch (error) {
    res.status(400).json({ mensaje: "Error al actualizar la revisita", error: error.message });
  }
};

// 🗑️ Eliminar revisita
export const eliminarRevisita = async (req, res) => {
  try {
    const revisitaEliminada = await Revisita.findByIdAndDelete(req.params.id);
    if (!revisitaEliminada) return res.status(404).json({ mensaje: "Revisita no encontrada" });
    res.status(200).json({ mensaje: "Revisita eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al eliminar la revisita", error: error.message });
  }
};

//
// 📌 NUEVAS BÚSQUEDAS PERSONALIZADAS
//

// 1️⃣ Buscar por Publicador
export const obtenerRevisitasPorPublicador = async (req, res) => {
  try {
    const { idPublicador } = req.params;
    const revisitas = await Revisita.find({ idPublicador })
      .populate("idPublicador", "nombre apellido telefono congregacion")
      .populate("idPersona", "nombre1 apellido1 barrio Tema activo");
    if (revisitas.length === 0)
      return res.status(404).json({ mensaje: "No hay revisitas registradas para este publicador" });
    res.status(200).json(revisitas);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener revisitas por publicador", error: error.message });
  }
};

// 2️⃣ Buscar por Persona
export const obtenerRevisitasPorPersona = async (req, res) => {
  try {
    const { idPersona } = req.params;
    const revisitas = await Revisita.find({ idPersona })
      .populate("idPublicador", "nombre apellido telefono congregacion")
      .populate("idPersona", "nombre1 apellido1 barrio Tema activo");
    if (revisitas.length === 0)
      return res.status(404).json({ mensaje: "No hay revisitas registradas para esta persona" });
    res.status(200).json(revisitas);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener revisitas por persona", error: error.message });
  }
};

// 3️⃣ Buscar por rango de fechas (?desde=YYYY-MM-DD&hasta=YYYY-MM-DD)
export const obtenerRevisitasPorFecha = async (req, res) => {
  try {
    const { desde, hasta } = req.query;

    if (!desde || !hasta) {
      return res.status(400).json({ mensaje: "Debe proporcionar los parámetros 'desde' y 'hasta' (YYYY-MM-DD)" });
    }

    const desdeFecha = new Date(desde);
    const hastaFecha = new Date(hasta);

    const revisitas = await Revisita.find({
      fecha: { $gte: desdeFecha, $lte: hastaFecha }
    })
      .populate("idPublicador", "nombre apellido telefono congregacion")
      .populate("idPersona", "nombre1 apellido1 barrio Tema activo");

    if (revisitas.length === 0)
      return res.status(404).json({ mensaje: "No se encontraron revisitas en el rango especificado" });

    res.status(200).json(revisitas);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener revisitas por fecha", error: error.message });
  }
};

// 4️⃣ Buscar revisitas por Publicador dentro de un rango de fechas
export const obtenerRevisitasPorPublicadorYFecha = async (req, res) => {
  try {
    const { idPublicador } = req.params;
    const { desde, hasta } = req.query;

    if (!desde || !hasta) {
      return res.status(400).json({
        mensaje: "Debe proporcionar los parámetros 'desde' y 'hasta' (YYYY-MM-DD)"
      });
    }

    const desdeFecha = new Date(desde);
    const hastaFecha = new Date(hasta);

    const revisitas = await Revisita.find({
      idPublicador,
      fecha: { $gte: desdeFecha, $lte: hastaFecha }
    })
      .populate("idPublicador", "nombre apellido telefono congregacion")
      .populate("idPersona", "nombre1 apellido1 barrio Tema activo");

    if (revisitas.length === 0) {
      return res.status(404).json({
        mensaje: "No se encontraron revisitas para este publicador en el rango especificado"
      });
    }

    res.status(200).json(revisitas);
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al obtener revisitas por publicador y rango de fechas",
      error: error.message
    });
  }
};


// 5️⃣ Estadísticas de revisitas por publicador dentro de un rango de fechas (con resumen global)
export const obtenerEstadisticasPorPublicador = async (req, res) => {
  try {
    const { desde, hasta } = req.query;

    if (!desde || !hasta) {
      return res.status(400).json({
        mensaje: "Debe proporcionar los parámetros 'desde' y 'hasta' (YYYY-MM-DD)"
      });
    }

    const desdeFecha = new Date(desde);
    const hastaFecha = new Date(hasta);

    // 🧮 Agregación principal (por publicador)
    const estadisticas = await Revisita.aggregate([
      {
        $match: {
          fecha: { $gte: desdeFecha, $lte: hastaFecha }
        }
      },
      {
        $group: {
          _id: "$idPublicador",
          totalRevisitas: { $sum: 1 },
          totalHoras: {
            $sum: {
              $convert: { input: "$tiempohoras", to: "double", onError: 0, onNull: 0 }
            }
          },
          promedioHoras: {
            $avg: {
              $convert: { input: "$tiempohoras", to: "double", onError: 0, onNull: 0 }
            }
          }
        }
      },
      {
        $lookup: {
          from: "publicadors",
          localField: "_id",
          foreignField: "_id",
          as: "publicador"
        }
      },
      { $unwind: { path: "$publicador", preserveNullAndEmptyArrays: true } },
      {
        $project: {
          _id: 0,
          publicadorId: "$publicador._id",
          nombre: "$publicador.nombre",
          apellido: "$publicador.apellido",
          congregacion: "$publicador.congregacion",
          telefono: "$publicador.telefono",
          totalRevisitas: 1,
          totalHoras: { $round: ["$totalHoras", 2] },
          promedioHoras: { $round: ["$promedioHoras", 2] }
        }
      },
      { $sort: { totalRevisitas: -1 } }
    ]);

    if (estadisticas.length === 0) {
      return res.status(404).json({
        mensaje: "No se encontraron revisitas en el rango especificado"
      });
    }

    // 🧩 Calcular resumen global del periodo
    const totalRevisitasGlobal = estadisticas.reduce((acc, cur) => acc + cur.totalRevisitas, 0);
    const totalHorasGlobal = estadisticas.reduce((acc, cur) => acc + (cur.totalHoras || 0), 0);
    const promedioHorasGlobal =
      estadisticas.length > 0 ? parseFloat((totalHorasGlobal / totalRevisitasGlobal).toFixed(2)) : 0;

    // 🔹 Resumen global
    const resumenGlobal = {
      totalPublicadores: estadisticas.length,
      totalRevisitas: totalRevisitasGlobal,
      totalHoras: parseFloat(totalHorasGlobal.toFixed(2)),
      promedioHoras: promedioHorasGlobal
    };

    // 📦 Respuesta final
    res.status(200).json({
      rango: { desde: desdeFecha, hasta: hastaFecha },
      resumenGlobal,
      estadisticas
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al generar estadísticas por publicador",
      error: error.message
    });
  }
};
