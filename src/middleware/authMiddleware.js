// src/middleware/authMiddleware.js
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET || "predirev_secret_key";

// 🔹 Verifica que el token sea válido
export const verificarToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) {
    return res.status(403).json({ mensaje: "Token no proporcionado" });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.usuario = decoded; // adjuntamos datos del usuario (id, rol, correo)
    next();
  } catch (error) {
    return res.status(401).json({ mensaje: "Token inválido o expirado", error: error.message });
  }
};

// 🔹 Permite acceso solo a roles específicos
export const verificarRol = (rolesPermitidos = []) => (req, res, next) => {
  try {
    const rolUsuario = req.usuario?.rol?.toLowerCase();

    if (!rolUsuario) {
      return res.status(401).json({ mensaje: "Rol no encontrado en el token" });
    }

    const rolesNormalizados = rolesPermitidos.map(r => r.toLowerCase());

    if (!rolesNormalizados.includes(rolUsuario)) {
      console.warn(`❌ Acceso denegado: rol=${rolUsuario}, permitidos=${rolesNormalizados}`);
      return res.status(403).json({ mensaje: "No tiene permisos para esta acción" });
    }

    next();
  } catch (error) {
    res.status(500).json({ mensaje: "Error verificando rol", error: error.message });
  }
};

