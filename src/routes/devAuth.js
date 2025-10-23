// predirev/src/routes/devAuth.js:
import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import Usuario from "../models/Usuario.js"; // Ajusta el nombre según tu modelo real

dotenv.config();
const router = express.Router();

// ⚠️ Ruta solo para desarrollo — genera un token JWT del superadmin
router.get("/dev-token", async (req, res) => {
  if (process.env.NODE_ENV === "production") {
    return res.status(403).json({ mensaje: "❌ No permitido en producción" });
  }

  try {
    const userId = "68f3f55fa0e38be354277ec0"; // tu superadmin
    const usuario = await Usuario.findById(userId).lean();
    if (!usuario) return res.status(404).json({ mensaje: "Usuario no encontrado" });

    const payload = { id: usuario._id, rol: usuario.rol, email: usuario.email };
    const token = jwt.sign(payload, process.env.JWT_SECRET || "devsecret", { expiresIn: "7d" });

    return res.json({
      mensaje: "✅ Token dev generado correctamente",
      token,
      usuario: payload,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error generando token dev" });
  }
});

export default router;
