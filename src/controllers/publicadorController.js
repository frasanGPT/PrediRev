// src/controllers/publicadorController.js
import Publicador from "../models/Publicador.js";
import Persona from "../models/Persona.js"; // ✅ import necesario

// Crear un nuevo publicador
export const crearPublicador = async (req, res) => {
  try {
    const datos = { ...req.body };
    if (!datos.estado) datos.estado = "activo"; // Valor por defecto

    const nuevoPublicador = new Publicador(datos);
    await nuevoPublicador.save();
    res.status(201).json({ mensaje: "Publicador creado exitosamente", data: nuevoPublicador });
  } catch (error) {
    res.status(400).json({ mensaje: "Error al crear el publicador", error: error.message });
  }
};

// Obtener todos los publicadores (con populate)
export const obtenerPublicadores = async (req, res) => {
  try {
    const publicadores = await Publicador.find().populate("personasAsignadas");
    res.status(200).json(publicadores);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener los publicadores", error: error.message });
  }
};

// Obtener un publicador por ID (con personas asignadas)
export const obtenerPublicadorPorId = async (req, res) => {
  try {
    const publicador = await Publicador.findById(req.params.id).populate("personasAsignadas");
    if (!publicador) {
      return res.status(404).json({ mensaje: "Publicador no encontrado" });
    }
    res.status(200).json(publicador);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener el publicador", error: error.message });
  }
};

// Actualizar un publicador
export const actualizarPublicador = async (req, res) => {
  try {
    const publicadorActualizado = await Publicador.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!publicadorActualizado) {
      return res.status(404).json({ mensaje: "Publicador no encontrado" });
    }
    res.status(200).json({ mensaje: "Publicador actualizado correctamente", data: publicadorActualizado });
  } catch (error) {
    res.status(400).json({ mensaje: "Error al actualizar el publicador", error: error.message });
  }
};

// Eliminar un publicador (solo super puede hacerlo)
export const eliminarPublicador = async (req, res) => {
  try {
    const { rol } = req.body; // se debe enviar el rol del usuario autenticado
    if (rol !== "super") {
      return res.status(403).json({ mensaje: "No tiene permisos para eliminar publicadores" });
    }

    const publicadorEliminado = await Publicador.findByIdAndDelete(req.params.id);
    if (!publicadorEliminado) {
      return res.status(404).json({ mensaje: "Publicador no encontrado" });
    }
    res.status(200).json({ mensaje: "Publicador eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al eliminar el publicador", error: error.message });
  }
};

// ✅ Actualizado: Asignar Persona a Publicador (relación en ambos sentidos)
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

    // 🔗 Relación doble: se actualizan ambos modelos
    publicador.personasAsignadas.push(personaId);
    persona.publicadorId = publicadorId;

    await publicador.save();
    await persona.save();

    res.status(200).json({
      mensaje: "Persona asignada correctamente al publicador",
      data: { publicador, persona }
    });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al asignar persona", error: error.message });
  }
};
