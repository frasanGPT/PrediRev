// src/routes/publicadorRoutes.js
import express from "express";
import {
  crearPublicador,
  obtenerPublicadores,
  obtenerPublicadorPorId,
  actualizarPublicador,
  eliminarPublicador
} from "../controllers/publicadorController.js";
import { verificarToken, verificarRol } from "../middleware/authMiddleware.js";
import Publicador from "../models/Publicador.js";

const router = express.Router();

// Rutas CRUD con protección JWT y roles
router.post("/", verificarToken, verificarRol("super", "admin"), crearPublicador);        // Crear
router.get("/", verificarToken, obtenerPublicadores);                                     // Listar todos
router.get("/:id", verificarToken, obtenerPublicadorPorId);                               // Obtener por ID
router.put("/:id", verificarToken, verificarRol("super", "admin"), actualizarPublicador); // Actualizar
router.delete("/:id", verificarToken, verificarRol("super"), eliminarPublicador);         // Eliminar

// 🔹 Ruta de cambio de estado (solo super o admin)
router.patch("/:id/estado", verificarToken, verificarRol("super", "admin"), async (req, res) => {
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
