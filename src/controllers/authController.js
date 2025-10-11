import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Publicador from "../models/Publicador.js";

const SECRET_KEY = process.env.JWT_SECRET || "predirev_secret_key";

/* ------------------------------------------------------------------
   🔹 REGISTRO DE NUEVO USUARIO
------------------------------------------------------------------ */
const registrarUsuario = async (req, res) => {
  try {
    const { nombre1, correo, telefono, rol, estado, password } = req.body;

    const existe = await Publicador.findOne({ correo });
    if (existe) {
      return res.status(400).json({ mensaje: "El correo ya está registrado" });
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const nuevoUsuario = new Publicador({
      nombre1,
      correo,
      telefono,
      rol,
      estado: estado || "activo",
      password: hash,
      cambiopendiente: true,
      fechaUltimoCambio: new Date()
    });

    await nuevoUsuario.save();

    res.status(201).json({
      mensaje: "Usuario registrado exitosamente",
      data: {
        nombre1: nuevoUsuario.nombre1,
        correo: nuevoUsuario.correo,
        rol: nuevoUsuario.rol,
        estado: nuevoUsuario.estado,
        cambiopendiente: nuevoUsuario.cambiopendiente
      }
    });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al registrar usuario", error: error.message });
  }
};

/* ------------------------------------------------------------------
   🔹 INICIO DE SESIÓN
------------------------------------------------------------------ */
const loginUsuario = async (req, res) => {
  try {
    const { correo, password } = req.body;
    const usuario = await Publicador.findOne({ correo });

    if (!usuario) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }

    const passwordValido = bcrypt.compareSync(password, usuario.password);
    if (!passwordValido) {
      return res.status(401).json({ mensaje: "Contraseña incorrecta" });
    }

    const token = jwt.sign(
      { id: usuario._id, rol: usuario.rol, correo: usuario.correo },
      SECRET_KEY,
      { expiresIn: "8h" }
    );

    res.status(200).json({
      mensaje: "Inicio de sesión exitoso",
      token,
      usuario: {
        nombre1: usuario.nombre1,
        correo: usuario.correo,
        rol: usuario.rol,
        cambiopendiente: usuario.cambiopendiente
      }
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
    const { correo, passwordActual, nuevoPassword } = req.body;

    const usuario = await Publicador.findOne({ correo });
    if (!usuario) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }

    const passwordValido = bcrypt.compareSync(passwordActual, usuario.password);
    if (!passwordValido) {
      return res.status(401).json({ mensaje: "Contraseña actual incorrecta" });
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(nuevoPassword, salt);

    usuario.password = hash;
    usuario.cambiopendiente = false;
    usuario.fechaUltimoCambio = new Date();
    await usuario.save();

    res.status(200).json({
      mensaje: "Contraseña actualizada correctamente",
      data: {
        correo: usuario.correo,
        fechaUltimoCambio: usuario.fechaUltimoCambio
      }
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

    const usuario = await Publicador.findById(id);
    if (!usuario) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(nuevaPassword, salt);

    usuario.password = hash;
    usuario.cambiopendiente = true;
    usuario.fechaUltimoCambio = new Date();
    await usuario.save();

    res.status(200).json({
      mensaje: "Contraseña reiniciada correctamente",
      data: { correo: usuario.correo, cambiopendiente: true }
    });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al reiniciar contraseña", error: error.message });
  }
};

/* ------------------------------------------------------------------
   🔹 EXPORTS
------------------------------------------------------------------ */
export { registrarUsuario, loginUsuario, cambiarPassword, resetPassword };
