// src/controllers/territorioController.js
import Territorio from "../models/Territorio.js";
import Publicador from "../models/Publicador.js";
import Persona from "../models/Persona.js";

//
// ➕ Crear nuevo territorio
//
export const crearTerritorio = async (req, res) => {
  try {
    const { codigo, nombre, descripcion, estado, observacion } = req.body;

    if (!codigo || !nombre) {
      return res.status(400).json({ mensaje: "Los campos 'codigo' y 'nombre' son obligatorios" });
    }

    const existente = await Territorio.findOne({ codigo });
    if (existente) {
      return res.status(400).json({ mensaje: "Ya existe un territorio con este código" });
    }

    const nuevoTerritorio = new Territorio({
      codigo,
      nombre,
      descripcion,
      estado,
      observacion,
    });

    await nuevoTerritorio.save();
    res.status(201).json({ mensaje: "Territorio creado exitosamente", data: nuevoTerritorio });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al crear el territorio", error: error.message });
  }
};

//
// 📋 Obtener todos los territorios
//
export const obtenerTerritorios = async (req, res) => {
  try {
    const territorios = await Territorio.find()
      .populate("publicadorId", "nombre apellido congregacion telefono")
      .populate("personas", "nombre1 apellido1 barrio Tema activo");

    res.status(200).json(territorios);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener los territorios", error: error.message });
  }
};

//
// 🔍 Obtener un territorio por ID
//
export const obtenerTerritorioPorId = async (req, res) => {
  try {
    const territorio = await Territorio.findById(req.params.id)
      .populate("publicadorId", "nombre apellido congregacion telefono")
      .populate("personas", "nombre1 apellido1 barrio Tema activo");

    if (!territorio) return res.status(404).json({ mensaje: "Territorio no encontrado" });
    res.status(200).json(territorio);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener el territorio", error: error.message });
  }
};

//
// ✏️ Actualizar territorio
//
export const actualizarTerritorio = async (req, res) => {
  try {
    const actualizado = await Territorio.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!actualizado) return res.status(404).json({ mensaje: "Territorio no encontrado" });
    res.status(200).json({ mensaje: "Territorio actualizado correctamente", data: actualizado });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al actualizar el territorio", error: error.message });
  }
};

//
// 🗑️ Eliminar territorio
//
export const eliminarTerritorio = async (req, res) => {
  try {
    const eliminado = await Territorio.findByIdAndDelete(req.params.id);
    if (!eliminado) return res.status(404).json({ mensaje: "Territorio no encontrado" });
    res.status(200).json({ mensaje: "Territorio eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al eliminar el territorio", error: error.message });
  }
};

//
// 🔗 Asignar publicador al territorio
//
export const asignarPublicador = async (req, res) => {
  try {
    const { territorioId, publicadorId } = req.body;

    const territorio = await Territorio.findById(territorioId);
    if (!territorio) return res.status(404).json({ mensaje: "Territorio no encontrado" });

    const publicador = await Publicador.findById(publicadorId);
    if (!publicador) return res.status(404).json({ mensaje: "Publicador no encontrado" });

    territorio.publicadorId = publicadorId;
    territorio.estado = "Asignado";
    territorio.fechaAsignacion = new Date();
    territorio.fechaDevolucion = null;

    await territorio.save();
    res.status(200).json({ mensaje: "Publicador asignado correctamente", data: territorio });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al asignar publicador", error: error.message });
  }
};

//
// 📆 Marcar territorio como devuelto
//
export const marcarTerritorioDevuelto = async (req, res) => {
  try {
    const { territorioId } = req.body;
    const territorio = await Territorio.findById(territorioId);

    if (!territorio) return res.status(404).json({ mensaje: "Territorio no encontrado" });

    territorio.publicadorId = null;
    territorio.estado = "Disponible";
    territorio.fechaDevolucion = new Date();

    await territorio.save();
    res.status(200).json({ mensaje: "Territorio marcado como devuelto", data: territorio });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al devolver territorio", error: error.message });
  }
};

//
// ➕ Agregar persona al territorio
//
export const agregarPersonaATerritorio = async (req, res) => {
  try {
    const { territorioId, personaId } = req.body;

    const territorio = await Territorio.findById(territorioId);
    if (!territorio) return res.status(404).json({ mensaje: "Territorio no encontrado" });

    const persona = await Persona.findById(personaId);
    if (!persona) return res.status(404).json({ mensaje: "Persona no encontrada" });

    if (!territorio.personas.includes(personaId)) {
      territorio.personas.push(personaId);
    }

    await territorio.save();
    res.status(200).json({ mensaje: "Persona agregada al territorio", data: territorio });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al agregar persona", error: error.message });
  }
};
