// src/models/Persona.js
import mongoose from "mongoose";

const personaSchema = new mongoose.Schema({
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
  barrio: {
    type: String,
    required: true,
    maxlength: 30,
    trim: true,
    match: /^[a-zA-Z0-9\s]+$/
  },
  TarjetaPred: {
    type: String,
    maxlength: 6,
    trim: true,
    match: /^[0-9]+$/
  },
  Territorio: {
    type: String,
    maxlength: 12,
    trim: true
  },
  calle: {
    type: String,
    maxlength: 6,
    trim: true,
    match: /^[a-zA-Z0-9\s]+$/
  },
  carrera: {
    type: String,
    maxlength: 6,
    trim: true,
    match: /^[a-zA-Z0-9\s]+$/
  },
  diagonalNo: {
    type: String,
    maxlength: 6,
    trim: true,
    match: /^[a-zA-Z0-9\s]+$/
  },
  casaNo: {
    type: String,
    maxlength: 12,
    trim: true,
    match: /^[a-zA-Z0-9\s]+$/
  },
  piso: {
    type: String,
    maxlength: 3,
    trim: true,
    match: /^[a-zA-Z0-9\s]+$/
  },
  color: {
    type: String,
    maxlength: 6,
    trim: true
  },
  referenciaLLegar: {
    type: String,
    maxlength: 40,
    trim: true,
    match: /^[a-zA-Z0-9\s]+$/
  },
  Acompaniante: {
    type: String,
    maxlength: 30,
    trim: true
  },
  Tema: {
    type: String,
    required: true,
    maxlength: 40,
    trim: true
  },
  observacion: {
    type: String,
    maxlength: 50,
    trim: true
  },
  texto: {
    type: String,
    maxlength: 40,
    trim: true,
    match: /^[a-zA-Z0-9\s]+$/
  },
  publicacion: {
    type: String,
    maxlength: 25,
    trim: true,
    match: /^[a-zA-Z0-9\s]+$/
  },
  telefono: {
    type: String,
    maxlength: 33,
    trim: true,
    match: /^[0-9]+$/
  },
  fecharegreso: {
    type: Date
  },
  coordenadasgas: {
    type: String,
    maxlength: 50,
    trim: true,
    match: /^[a-zA-Z0-9\s]+$/
  },
  activo: {
    type: String,
    required: true,
    maxlength: 5,
    trim: true
  },
  correo: {
    type: String,
    maxlength: 40,
    trim: true,
    match: /^[a-zA-Z0-9@._-]+$/
  },
  fechapredicacion: {
    type: Date
  },
  // 🔗 Relación inversa: referencia al publicador asignado
  publicadorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Publicador",
    default: null
  }
}, { timestamps: true });

// 🧹 Middleware para limpiar texto antes de guardar
personaSchema.pre("save", function (next) {
  const doc = this;

  const cleanText = (value) => {
    if (typeof value !== "string") return value;
    const cleaned = value.trim().replace(/\s+/g, " ").toLowerCase();
    return cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
  };

  const textFields = [
    "nombre1",
    "nombre2",
    "apellido1",
    "apellido2",
    "barrio",
    "TarjetaPred",
    "Territorio",
    "calle",
    "carrera",
    "diagonalNo",
    "casaNo",
    "piso",
    "color",
    "referenciaLLegar",
    "Acompaniante",
    "Tema",
    "observacion",
    "texto",
    "publicacion",
    "coordenadasgas",
    "activo",
    "correo"
  ];

  textFields.forEach((field) => {
    if (doc[field]) doc[field] = cleanText(doc[field]);
  });

  next();
});

export default mongoose.model("Persona", personaSchema);

