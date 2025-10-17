// src/middleware/authMiddleware.js
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET || "predirev_secret_key";

/* ------------------------------------------------------------------
   🔹 Verificar JWT de usuario autenticado
------------------------------------------------------------------ */
export const verificarToken = (req, res, next) => {
  const header = req.headers["authorization"];
  if (!header) {
    return res.status(401).json({ mensaje: "Token no proporcionado" });
  }

  const token = header.split(" ")[1];
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.usuario = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ mensaje: "Token inválido o expirado" });
  }
};

/* ------------------------------------------------------------------
   🔹 Solo Admin o SuperAdmin
------------------------------------------------------------------ */
export const soloAdmin = (req, res, next) => {
  if (!req.usuario) {
    return res.status(401).json({ mensaje: "Usuario no autenticado" });
  }

  const rol = req.usuario.rol;
  if (rol !== "admin" && rol !== "superadmin") {
    return res
      .status(403)
      .json({ mensaje: "Acceso denegado: se requiere rol de administrador o superadmin." });
  }

  next();
};

/* ------------------------------------------------------------------
   🔹 Solo SuperAdmin
------------------------------------------------------------------ */
export const soloSuperAdmin = (req, res, next) => {
  if (!req.usuario) {
    return res.status(401).json({ mensaje: "Usuario no autenticado" });
  }

  if (req.usuario.rol !== "superadmin") {
    return res.status(403).json({ mensaje: "Acceso denegado: se requiere rol de superadmin." });
  }

  next();
};
