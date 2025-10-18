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

// Inicializamos el router ANTES de definir rutas 👇
const router = express.Router();

// ⚠️ RUTA TEMPORAL – Crear el primer usuario superadmin sin token
// Se eliminará después de crear el usuario inicial
import Usuario from "../models/Usuario.js";
import bcrypt from "bcryptjs";

router.post("/bootstrap", async (req, res) => {
  try {
    const { nombre, email, password, rol } = req.body;

    const existe = await Usuario.findOne({ email });
    if (existe) {
      return res.json({ mensaje: "⚠️ Ya existe un usuario con este email." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const nuevoUsuario = new Usuario({
      nombre,
      email,
      password: hashedPassword,
      rol: rol || "superadmin",
    });

    await nuevoUsuario.save();
    res.json({ mensaje: "✅ Usuario inicial creado exitosamente." });
  } catch (error) {
    console.error("❌ Error creando usuario inicial:", error);
    res.status(500).json({ error: error.message });
  }
});

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
router.patch(
  "/resetpassword/:id",
  verificarToken,
  soloSuperAdmin,
  resetPassword
);

export default router;
