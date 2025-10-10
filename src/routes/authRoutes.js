// src/routes/authRoutes.js
import express from "express";
import { registrarUsuario, loginUsuario } from "../controllers/authController.js";

const router = express.Router();

// 🔹 Registro de usuario (solo uso inicial o gestión del SuperAdmin)
router.post("/register", registrarUsuario);

// 🔹 Inicio de sesión (genera token JWT)
router.post("/login", loginUsuario);

export default router;
