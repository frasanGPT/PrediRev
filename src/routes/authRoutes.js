import express from "express";
import {
  registrarUsuario,
  loginUsuario,
  cambiarPassword,
  resetPassword
} from "../controllers/authController.js";
import { verificarToken, verificarRol } from "../middleware/authMiddleware.js";

const router = express.Router();

/* ------------------------------------------------------------------
   🔹 REGISTRO DE USUARIO (Solo SuperAdmin o Admin)
------------------------------------------------------------------ */
router.post("/register", verificarToken, verificarRol(["super", "admin"]), registrarUsuario);

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
router.patch("/resetpassword/:id", verificarToken, verificarRol(["super"]), resetPassword);

export default router;
