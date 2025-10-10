// src/models/Publicador.js
import mongoose from "mongoose";

const publicadorSchema = new mongoose.Schema({
  nombre1: {
    type: String,
    required: true,
    maxlength: 25,
    trim: true
  },
  nombre2: {
    type: String,
    maxlength: 25,
    trim: true
  },
  apellido1: {
    type: String,
    maxlength: 25,
    trim: true
  },
  apellido2: {
    type: String,
    maxlength: 25,
    trim: true
  },
  correo: {
    type: String,
    required: true,
    maxlength: 40,
    match: /^[a-zA-Z0-9@._-]+$/
  },
  telefono: {
    type: String,
    required: true,
    maxlength: 30,
    match: /^[a-zA-Z0-9\s+()-]+$/
  },
  rol: {
    type: String,
    required: true,
    maxlength: 5,
    enum: ["super", "admin", "publ"]
  },
  estado: {
    type: String,
    required: true,
    maxlength: 8,
    enum: ["activo", "inactivo"],
    default: "activo"
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  }
}, { timestamps: true });

export default mongoose.model("Publicador", publicadorSchema);
