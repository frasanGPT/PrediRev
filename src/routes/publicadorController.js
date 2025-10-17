// src/controllers/publicadorController.js
import Publicador from "../models/Publicador.js";
import Persona from "../models/Persona.js";

// 🧩 Crear nuevo publicador
export const crearPublicador = async (req, res) => {
  try {
    const nuevoPublicador = new Publicador(req.body);
    const guardado = await nuevoPublicador.save();
    res.status(201).json(guardado);
  } catch (error) {
    res.status(400).json({ mensaje: "Error al crear el publicador", error });
  }
};

// 📋 Obtener todos los publicadores
export const obtenerPublicadores = async (req, res) => {
  try {
    const publicadores = await Publicador.find().populate("personasAsignadas");
    res.json(publicadores);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener publicadores", error });
  }
};

// 🔍 Obtener un publicador por ID (con personas)
export const obtenerPublicadorPorId = async (req, res) => {
  try {
    const publicador = await Publicador.findById(req.params.id).populate("personasAsignadas");
    if (!publicador) return res.status(404).json({ mensaje: "Publicador no encontrado" });
    res.json(publicador);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al buscar el publicador", error });
  }
};

// ✏️ Actualizar publicador
export const actualizarPublicador = async (req, res) => {
  try {
    const actualizado = await Publicador.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!actualizado) return res.status(404).json({ mensaje: "Publicador no encontrado" });
    res.json(actualizado);
  } catch (error) {
    res.status(400).json({ mensaje: "Error al actualizar el publicador", error });
  }
};

// 🗑️ Eliminar publicador
export const eliminarPublicador = async (req, res) => {
  try {
    const eliminado = await Publicador.findByIdAndDelete(req.params.id);
    if (!eliminado) return res.status(404).json({ mensaje: "Publicador no encontrado" });
    res.json({ mensaje: "Publicador eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al eliminar el publicador", error });
  }
};

// 🔗 Asignar persona a un publicador
export const asignarPersona = async (req, res) => {
  try {
    const { publicadorId, personaId } = req.body;

    const publicador = await Publicador.findById(publicadorId);
    const persona = await Persona.findById(personaId);

    if (!publicador || !persona) {
      return res.status(404).json({ mensaje: "Publicador o Persona no encontrados" });
    }

    // Evitar duplicados
    if (publicador.personasAsignadas.includes(personaId)) {
      return res.status(400).json({ mensaje: "La persona ya está asignada a este publicador" });
    }

    publicador.personasAsignadas.push(personaId);
    await publicador.save();

    res.json({ mensaje: "Persona asignada correctamente", publicador });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al asignar persona", error });
  }
};
