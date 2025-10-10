// src/controllers/tiempoController.js
import Tiempo from "../models/Tiempo.js";

// Crear un nuevo registro de tiempo
export const crearTiempo = async (req, res) => {
  try {
    const datos = { ...req.body };
    if (!datos.estado) datos.estado = "activo";

    const nuevoTiempo = new Tiempo(datos);
    await nuevoTiempo.save();
    res.status(201).json({ mensaje: "Tiempo registrado exitosamente", data: nuevoTiempo });
  } catch (error) {
    res.status(400).json({ mensaje: "Error al registrar el tiempo", error: error.message });
  }
};

// Obtener todos los tiempos activos
export const obtenerTiempos = async (req, res) => {
  try {
    const tiempos = await Tiempo.find({ estado: "activo" })
      .populate("idPublicador", "nombre1 apellido1 rol");
    res.status(200).json(tiempos);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener los tiempos", error: error.message });
  }
};

// Obtener tiempo por ID
export const obtenerTiempoPorId = async (req, res) => {
  try {
    const tiempo = await Tiempo.findById(req.params.id)
      .populate("idPublicador", "nombre1 apellido1 rol");
    if (!tiempo) return res.status(404).json({ mensaje: "Registro de tiempo no encontrado" });
    res.status(200).json(tiempo);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener el tiempo", error: error.message });
  }
};

// Actualizar registro de tiempo
export const actualizarTiempo = async (req, res) => {
  try {
    const tiempoActualizado = await Tiempo.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!tiempoActualizado) return res.status(404).json({ mensaje: "Registro de tiempo no encontrado" });
    res.status(200).json({ mensaje: "Tiempo actualizado correctamente", data: tiempoActualizado });
  } catch (error) {
    res.status(400).json({ mensaje: "Error al actualizar el tiempo", error: error.message });
  }
};

// Cambiar estado (activar/inactivar)
export const cambiarEstadoTiempo = async (req, res) => {
  try {
    const { estado } = req.body;
    const tiempoActualizado = await Tiempo.findByIdAndUpdate(
      req.params.id,
      { estado },
      { new: true }
    );
    if (!tiempoActualizado) return res.status(404).json({ mensaje: "Registro de tiempo no encontrado" });
    res.status(200).json({ mensaje: `Estado cambiado a ${estado}`, data: tiempoActualizado });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al cambiar el estado", error: error.message });
  }
};

// Eliminar registro (solo SA)
export const eliminarTiempo = async (req, res) => {
  try {
    const { rol } = req.body;
    if (rol !== "super") {
      return res.status(403).json({ mensaje: "No tiene permisos para eliminar registros de tiempo" });
    }
    const tiempoEliminado = await Tiempo.findByIdAndDelete(req.params.id);
    if (!tiempoEliminado) return res.status(404).json({ mensaje: "Registro de tiempo no encontrado" });
    res.status(200).json({ mensaje: "Registro de tiempo eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al eliminar el registro", error: error.message });
  }
};
