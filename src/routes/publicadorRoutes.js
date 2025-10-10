// src/routes/publicadorRoutes.js
import express from "express";
import {
  crearPublicador,
  obtenerPublicadores,
  obtenerPublicadorPorId,
  actualizarPublicador,
  eliminarPublicador
} from "../controllers/publicadorController.js";
import Publicador from "../models/Publicador.js";


const router = express.Router();

// Rutas CRUD para Publicador
router.post("/", crearPublicador);            // Crear nuevo publicador
router.get("/", obtenerPublicadores);         // Listar todos
router.get("/:id", obtenerPublicadorPorId);   // Obtener por ID
router.put("/:id", actualizarPublicador);     // Actualizar
router.delete("/:id", eliminarPublicador);    // Eliminar

// 🔹 Nueva ruta para cambiar el estado (activar/inactivar)
router.patch("/:id/estado", async (req, res) => {
  try {
    const { estado } = req.body;
    const publicadorActualizado = await Publicador.findByIdAndUpdate(
      req.params.id,
      { estado },
      { new: true }
    );
    if (!publicadorActualizado) {
      return res.status(404).json({ mensaje: "Publicador no encontrado" });
    }
    res.status(200).json({ mensaje: `Estado cambiado a ${estado}`, data: publicadorActualizado });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al actualizar el estado", error: error.message });
  }
});

export default router;

