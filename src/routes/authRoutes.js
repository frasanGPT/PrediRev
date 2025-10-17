// src/routes/authRoutes.js
import express from "express";
import {
  registrarUsuario,
  loginUsuario,
  cambiarPassword,
  resetPassword
} from "../controllers/authController.js";
import {
  verificarToken,
  soloAdmin,
  soloSuperAdmin
} from "../middleware/authMiddleware.js";

const router = express.Router();

/* ------------------------------------------------------------------
   🔹 REGISTRO DE USUARIO (Solo Admin o SuperAdmin)
------------------------------------------------------------------ */
router.post("/register", verificarToken, soloAdmin, registrarUsuario);

/* ------------------------------------------------------------------
   🔹 INICIO DE SESIÓN (Login público)
------------------------------------------------------------------ */
router.post("/login", loginUsuario);

/* ------------------------------------------------------------------
   🔹 CAMBIO DE CONTRASEÑA (Usuario autenticado)
------------------------------------------------------------------ */
router.patch("/password", verificarToken, cambiarPassword);

/* ------------------------------------------------------------------
   🔹 REINICIO DE CONTRASEÑA (Solo SuperAdmin)
------------------------------------------------------------------ */
router.patch("/resetpassword/:id", verificarToken, soloSuperAdmin, resetPassword);

export default router;
