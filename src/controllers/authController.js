// src/controllers/authController.js
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Publicador from "../models/Publicador.js";

const SECRET_KEY = process.env.JWT_SECRET || "predirev_secret_key";

// 🔹 Registro de nuevo usuario (Publicador)
export const registrarUsuario = async (req, res) => {
  try {
    const { nombre1, correo, telefono, rol, estado, password } = req.body;

    // Verificar si el correo ya está registrado
    const existe = await Publicador.findOne({ correo });
    if (existe) {
      return res.status(400).json({ mensaje: "El correo ya está registrado" });
    }

    // Encriptar la contraseña
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    // Crear nuevo publicador con contraseña
    const nuevoUsuario = new Publicador({
      nombre1,
      correo,
      telefono,
      rol,
      estado: estado || "activo",
      password: hash
    });

    await nuevoUsuario.save();

    res.status(201).json({
      mensaje: "Usuario registrado exitosamente",
      data: {
        nombre1: nuevoUsuario.nombre1,
        correo: nuevoUsuario.correo,
        rol: nuevoUsuario.rol,
        estado: nuevoUsuario.estado
      }
    });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al registrar usuario", error: error.message });
  }
};

// 🔹 Inicio de sesión
export const loginUsuario = async (req, res) => {
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

    // Generar token JWT
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
        rol: usuario.rol
      }
    });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al iniciar sesión", error: error.message });
  }
};
