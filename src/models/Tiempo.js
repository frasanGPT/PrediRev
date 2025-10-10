// src/models/Tiempo.js
import mongoose from "mongoose";

const tiempoSchema = new mongoose.Schema({
  idPublicador: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Publicador",
    required: true
  },
  fecha: {
    type: Date,
    required: true,
    default: Date.now
  },
  horainicio: {
    type: String,
    maxlength: 12,
    match: /^[a-zA-Z0-9:]+$/
  },
  horafinal: {
    type: String,
    maxlength: 12,
    match: /^[a-zA-Z0-9:]+$/
  },
  tiempo: {
    type: String,
    maxlength: 3,
    match: /^[0-9]+$/
  },
  casaencasa: {
    type: String,
    maxlength: 1,
    match: /^[01]?$/
  },
  informal: {
    type: String,
    maxlength: 1,
    match: /^[01]?$/
  },
  plataforma: {
    type: String,
    maxlength: 1,
    match: /^[01]?$/
  },
  telefono: {
    type: String,
    maxlength: 1,
    match: /^[01]?$/
  },
  carta: {
    type: String,
    maxlength: 1,
    match: /^[01]?$/
  },
  exhibidor: {
    type: String,
    maxlength: 1,
    match: /^[01]?$/
  },
  otro: {
    type: String,
    maxlength: 40,
    match: /^[a-zA-Z0-9\sáéíóúÁÉÍÓÚñÑ.,-]*$/
  },
  publicaciones: {
    type: String,
    maxlength: 2,
    match: /^[0-9]*$/
  },
  videos: {
    type: String,
    maxlength: 2,
    match: /^[0-9]*$/
  },
  conversacion: {
    type: String,
    maxlength: 2,
    match: /^[0-9]*$/
  },
  // 🔹 Campo de control administrativo
  estado: {
    type: String,
    required: true,
    maxlength: 8,
    enum: ["activo", "inactivo"],
    default: "activo"
  }
}, { timestamps: true });

export default mongoose.model("Tiempo", tiempoSchema);
