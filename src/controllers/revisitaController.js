// src/controllers/revisitaController.js
import Revisita from "../models/Revisita.js";

// Crear una nueva revisita
export const crearRevisita = async (req, res) => {
  try {
    const datos = { ...req.body };
    if (!datos.estado) datos.estado = "activo";
    if (datos.completado === undefined) datos.completado = false;

    const nuevaRevisita = new Revisita(datos);
    await nuevaRevisita.save();
    res.status(201).json({ mensaje: "Revisita creada exitosamente", data: nuevaRevisita });
  } catch (error) {
    res.status(400).json({ mensaje: "Error al crear la revisita", error: error.message });
  }
};

// Obtener todas las revisitas activas
export const obtenerRevisitas = async (req, res) => {
  try {
    const revisitas = await Revisita.find({ estado: "activo" })
      .populate("idPublicador", "nombre1 apellido1 rol")
      .populate("idPersona", "nombre1 apellido1 barrio");
    res.status(200).json(revisitas);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener las revisitas", error: error.message });
  }
};

// Obtener revisita por ID
export const obtenerRevisitaPorId = async (req, res) => {
  try {
    const revisita = await Revisita.findById(req.params.id)
      .populate("idPublicador", "nombre1 apellido1 rol")
      .populate("idPersona", "nombre1 apellido1 barrio");
    if (!revisita) return res.status(404).json({ mensaje: "Revisita no encontrada" });
    res.status(200).json(revisita);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener la revisita", error: error.message });
  }
};

// Actualizar revisita
export const actualizarRevisita = async (req, res) => {
  try {
    const revisitaActualizada = await Revisita.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!revisitaActualizada) return res.status(404).json({ mensaje: "Revisita no encontrada" });
    res.status(200).json({ mensaje: "Revisita actualizada correctamente", data: revisitaActualizada });
  } catch (error) {
    res.status(400).json({ mensaje: "Error al actualizar la revisita", error: error.message });
  }
};

// Cambiar estado (activar/inactivar)
export const cambiarEstadoRevisita = async (req, res) => {
  try {
    const { estado } = req.body;
    const revisitaActualizada = await Revisita.findByIdAndUpdate(
      req.params.id,
      { estado },
      { new: true }
    );
    if (!revisitaActualizada) return res.status(404).json({ mensaje: "Revisita no encontrada" });
    res.status(200).json({ mensaje: `Estado cambiado a ${estado}`, data: revisitaActualizada });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al cambiar el estado", error: error.message });
  }
};

// Marcar revisita como completada
export const marcarComoCompletada = async (req, res) => {
  try {
    const revisitaCompletada = await Revisita.findByIdAndUpdate(
      req.params.id,
      { completado: true },
      { new: true }
    );
    if (!revisitaCompletada) return res.status(404).json({ mensaje: "Revisita no encontrada" });
    res.status(200).json({ mensaje: "Revisita marcada como completada", data: revisitaCompletada });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al marcar la revisita como completada", error: error.message });
  }
};

// Eliminar revisita (solo SA)
export const eliminarRevisita = async (req, res) => {
  try {
    const { rol } = req.body;
    if (rol !== "super") {
      return res.status(403).json({ mensaje: "No tiene permisos para eliminar revisitas" });
    }
    const revisitaEliminada = await Revisita.findByIdAndDelete(req.params.id);
    if (!revisitaEliminada) return res.status(404).json({ mensaje: "Revisita no encontrada" });
    res.status(200).json({ mensaje: "Revisita eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al eliminar la revisita", error: error.message });
  }
};
