// src/controllers/authController.js
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Usuario from "../models/Usuario.js"; // ✅ usamos el modelo correcto

const SECRET_KEY = process.env.JWT_SECRET || "predirev_secret_key";

/* ------------------------------------------------------------------
   🔹 REGISTRO DE NUEVO USUARIO (requiere token admin/superadmin)
------------------------------------------------------------------ */
const registrarUsuario = async (req, res) => {
  try {
    const { nombre, email, password, rol } = req.body;

    if (!email || !password || !nombre) {
      return res.status(400).json({ mensaje: "Faltan campos obligatorios" });
    }

    // Normalizar email
    const emailNormalizado = email.trim().toLowerCase();

    // Validar rol permitido
    const rolesPermitidos = ["superadmin", "admin", "publicador"];
    if (rol && !rolesPermitidos.includes(rol)) {
      return res.status(400).json({ mensaje: "Rol no permitido" });
    }

    // Verificar si ya existe el email
    const existe = await Usuario.findOne({ email: emailNormalizado });
    if (existe) {
      return res.status(400).json({ mensaje: "El email ya está registrado" });
    }

    // Crear nuevo usuario (bcrypt se ejecuta en pre-save)
    const nuevoUsuario = new Usuario({
      nombre,
      email: emailNormalizado,
      password,
      rol: rol || "publicador",
    });

    await nuevoUsuario.save();

    res.status(201).json({
      mensaje: "✅ Usuario registrado exitosamente",
      data: {
        nombre: nuevoUsuario.nombre,
        email: nuevoUsuario.email,
        rol: nuevoUsuario.rol,
      },
    });
  } catch (error) {
    res.status(500).json({ mensaje: "❌ Error al registrar usuario", error: error.message });
  }
};

/* ------------------------------------------------------------------
   🔹 INICIO DE SESIÓN
------------------------------------------------------------------ */
const loginUsuario = async (req, res) => {
  try {
    const { email, password } = req.body;
    const emailNormalizado = email?.trim().toLowerCase();

    const usuario = await Usuario.findOne({ email: emailNormalizado });
    if (!usuario) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }

    const passwordValido = await bcrypt.compare(password, usuario.password);
    if (!passwordValido) {
      return res.status(401).json({ mensaje: "Contraseña incorrecta" });
    }

    const token = jwt.sign(
      { id: usuario._id, rol: usuario.rol, email: usuario.email },
      SECRET_KEY,
      { expiresIn: "8h" }
    );

    res.status(200).json({
      mensaje: "✅ Inicio de sesión exitoso",
      token,
      usuario: {
        id: usuario._id,
        nombre: usuario.nombre,
        email: usuario.email,
        rol: usuario.rol,
      },
    });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al iniciar sesión", error: error.message });
  }
};

/* ------------------------------------------------------------------
   🔹 CAMBIO DE CONTRASEÑA (Usuario autenticado)
------------------------------------------------------------------ */
const cambiarPassword = async (req, res) => {
  try {
    const { email, passwordActual, nuevoPassword } = req.body;
    const emailNormalizado = email?.trim().toLowerCase();

    const usuario = await Usuario.findOne({ email: emailNormalizado });
    if (!usuario) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }

    const passwordValido = await bcrypt.compare(passwordActual, usuario.password);
    if (!passwordValido) {
      return res.status(401).json({ mensaje: "Contraseña actual incorrecta" });
    }

    usuario.password = nuevoPassword;
    await usuario.save();

    res.status(200).json({
      mensaje: "Contraseña actualizada correctamente",
      data: { email: usuario.email },
    });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al cambiar contraseña", error: error.message });
  }
};

/* ------------------------------------------------------------------
   🔹 REINICIO DE CONTRASEÑA (Solo SuperAdmin)
------------------------------------------------------------------ */
const resetPassword = async (req, res) => {
  try {
    const { id } = req.params;
    const { nuevaPassword } = req.body;

    const usuario = await Usuario.findById(id);
    if (!usuario) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }

    usuario.password = nuevaPassword;
    await usuario.save();

    res.status(200).json({
      mensaje: "Contraseña reiniciada correctamente",
      data: { email: usuario.email },
    });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al reiniciar contraseña", error: error.message });
  }
};

/* ------------------------------------------------------------------
   🔹 EXPORTS
------------------------------------------------------------------ */
export { registrarUsuario, loginUsuario, cambiarPassword, resetPassword };
