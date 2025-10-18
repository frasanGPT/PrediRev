// src/controllers/personaController.js
import Persona from "../models/Persona.js";

/**
 * 🎯 Controlador: Personas
 * ------------------------------------------------------------
 * CRUD completo con control de permisos por rol:
 *  - publicador: puede crear y leer
 *  - admin: puede crear, leer, editar y activar/inactivar
 *  - superadmin: puede todo (crear, leer, editar, eliminar)
 * ------------------------------------------------------------
 * Se asume que el middleware verificarToken agrega req.user.rol
 */

// ✅ Crear una nueva persona
export const crearPersona = async (req, res) => {
  try {
    const { rol } = req.user || {};

    if (!["publicador", "admin", "superadmin"].includes(rol)) {
      return res.status(403).json({ mensaje: "No autorizado para crear personas" });
    }

    const nuevaPersona = new Persona(req.body);
    await nuevaPersona.save();

    res.status(201).json({
      mensaje: "✅ Persona creada exitosamente",
      data: nuevaPersona,
    });
  } catch (error) {
    res.status(400).json({
      mensaje: "❌ Error al crear la persona",
      error: error.message,
    });
  }
};

// ✅ Obtener todas las personas
export const obtenerPersonas = async (req, res) => {
  console.log("🧠 Usuario autenticado:", req.user); // ✅ imprime el usuario del token
  try {
    const personas = await Persona.find().populate(
      "publicadorId",
      "nombre apellido telefono congregacion"
    );
    res.status(200).json({
      mensaje: "✅ Lista de personas obtenida correctamente",
      data: personas,
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "❌ Error al obtener las personas",
      error: error.message,
    });
  }
};

// ✅ Obtener persona por ID
export const obtenerPersonaPorId = async (req, res) => {
  console.log("🧠 Usuario autenticado:", req.user);

  try {
    const persona = await Persona.findById(req.params.id).populate(
      "publicadorId",
      "nombre apellido telefono congregacion"
    );

    if (!persona) {
      return res.status(404).json({ mensaje: "Persona no encontrada" });
    }

    res.status(200).json({
      mensaje: "✅ Persona encontrada",
      data: persona,
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "❌ Error al obtener la persona",
      error: error.message,
    });
  }
};

// ✅ Actualizar persona (solo admin o superadmin)
export const actualizarPersona = async (req, res) => {
  try {
    const { rol } = req.user || {};

    if (!["admin", "superadmin"].includes(rol)) {
      return res.status(403).json({
        mensaje: "No autorizado para editar personas",
      });
    }

    const personaActualizada = await Persona.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!personaActualizada) {
      return res.status(404).json({ mensaje: "Persona no encontrada" });
    }

    res.status(200).json({
      mensaje: "✅ Persona actualizada correctamente",
      data: personaActualizada,
    });
  } catch (error) {
    res.status(400).json({
      mensaje: "❌ Error al actualizar la persona",
      error: error.message,
    });
  }
};

// ✅ Eliminar persona (solo superadmin)
export const eliminarPersona = async (req, res) => {
  try {
    const { rol } = req.user || {};

    if (rol !== "superadmin") {
      return res.status(403).json({
        mensaje: "No autorizado para eliminar personas",
      });
    }

    const personaEliminada = await Persona.findByIdAndDelete(req.params.id);

    if (!personaEliminada) {
      return res.status(404).json({ mensaje: "Persona no encontrada" });
    }

    res.status(200).json({
      mensaje: "🗑️ Persona eliminada correctamente",
      data: personaEliminada,
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "❌ Error al eliminar la persona",
      error: error.message,
    });
  }
};
