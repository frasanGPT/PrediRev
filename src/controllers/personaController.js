// src/controllers/personaController.js
import Persona from "../models/Persona.js";

// Crear una nueva persona
export const crearPersona = async (req, res) => {
  try {
    const nuevaPersona = new Persona(req.body);
    await nuevaPersona.save();
    res.status(201).json({ mensaje: "Persona creada exitosamente", data: nuevaPersona });
  } catch (error) {
    res.status(400).json({ mensaje: "Error al crear la persona", error: error.message });
  }
};

// Obtener todas las personas
export const obtenerPersonas = async (req, res) => {
  try {
    const personas = await Persona.find().populate("publicadorId", "nombre apellido telefono congregacion");
    res.status(200).json(personas);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener las personas", error: error.message });
  }
};

// ✅ Obtener persona por ID (con datos del publicador)
export const obtenerPersonaPorId = async (req, res) => {
  try {
    const persona = await Persona.findById(req.params.id).populate("publicadorId", "nombre apellido telefono congregacion");
    if (!persona) {
      return res.status(404).json({ mensaje: "Persona no encontrada" });
    }
    res.status(200).json(persona);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener la persona", error: error.message });
  }
};

// Actualizar persona
export const actualizarPersona = async (req, res) => {
  try {
    const personaActualizada = await Persona.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!personaActualizada) {
      return res.status(404).json({ mensaje: "Persona no encontrada" });
    }
    res.status(200).json({ mensaje: "Persona actualizada correctamente", data: personaActualizada });
  } catch (error) {
    res.status(400).json({ mensaje: "Error al actualizar la persona", error: error.message });
  }
};

// Eliminar persona
export const eliminarPersona = async (req, res) => {
  try {
    const personaEliminada = await Persona.findByIdAndDelete(req.params.id);
    if (!personaEliminada) {
      return res.status(404).json({ mensaje: "Persona no encontrada" });
    }
    res.status(200).json({ mensaje: "Persona eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al eliminar la persona", error: error.message });
  }
};
