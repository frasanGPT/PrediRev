// src/models/Revisita.js
import mongoose from "mongoose";

const revisitaSchema = new mongoose.Schema({
  idPublicador: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Publicador",
    required: true
  },
  idPersona: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Persona",
    required: true
  },
  fecha: {
    type: Date,
    required: true,
    default: Date.now
  },
  horainicio: {
    type: String,
    required: true,
    maxlength: 5,
    match: /^[a-zA-Z0-9:]+$/
  },
  horafinal: {
    type: String,
    required: true,
    maxlength: 5,
    match: /^[a-zA-Z0-9:]+$/
  },
  tiempohoras: {
    type: String,
    maxlength: 5,
    match: /^[0-9.]+$/
  },
  tema: {
    type: String,
    required: true,
    maxlength: 45,
    match: /^[a-zA-Z0-9\sáéíóúÁÉÍÓÚñÑ.,-]+$/
  },
  libro: {
    type: String,
    maxlength: 25,
    match: /^[a-zA-Z0-9\sáéíóúÁÉÍÓÚñÑ.,-]*$/
  },
  pagina: {
    type: String,
    maxlength: 5,
    match: /^[0-9]*$/
  },
  proximavisita: {
    type: Date
  },
  preguntas: {
    type: String,
    maxlength: 40,
    match: /^[a-zA-Z0-9\sáéíóúÁÉÍÓÚñÑ.,-]*$/
  },
  tarea: {
    type: String,
    maxlength: 40,
    match: /^[a-zA-Z0-9\sáéíóúÁÉÍÓÚñÑ.,-]*$/
  },
  observacion: {
    type: String,
    maxlength: 40,
    match: /^[a-zA-Z0-9\sáéíóúÁÉÍÓÚñÑ.,-]*$/
  },
  // 🔹 Campo de control administrativo
  estado: {
    type: String,
    required: true,
    maxlength: 8,
    enum: ["activo", "inactivo"],
    default: "activo"
  },
  // 🔹 Campo de seguimiento de progreso
  completado: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

export default mongoose.model("Revisita", revisitaSchema);
