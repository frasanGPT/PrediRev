// src/models/Publicador.js
import mongoose from "mongoose";

const { Schema } = mongoose;

const publicadorSchema = new Schema({
  nombre: {
    type: String,
    required: true,
    maxlength: 40,
    trim: true
  },
  apellido: {
    type: String,
    required: true,
    maxlength: 40,
    trim: true
  },
  telefono: {
    type: String,
    maxlength: 20,
    trim: true,
    match: /^[0-9]+$/
  },
  correo: {
    type: String,
    required: true,
    unique: true,
    maxlength: 50,
    trim: true,
    lowercase: true,
    match: /^[a-zA-Z0-9@._-]+$/
  },
  grupo: {
    type: String,
    maxlength: 20,
    trim: true,
    match: /^[a-zA-Z0-9\s]+$/
  },
  congregacion: {
    type: String,
    maxlength: 40,
    trim: true,
    match: /^[a-zA-Z0-9\s]+$/
  },
  territorioAsignado: {
    type: String,
    maxlength: 12,
    trim: true
  },
  fechaAsignacion: {
    type: Date
  },
  observacion: {
    type: String,
    maxlength: 100,
    trim: true
  },
  activo: {
    type: String,
    required: true,
    maxlength: 5,
    trim: true
  },

  // 🔒 Campos de autenticación
  rol: {
    type: String,
    enum: ["publicador", "admin", "superadmin"],
    default: "publicador",
  },
  password: {
    type: String,
    required: true,
    select: true // <--- Clave: asegura que se incluya al hacer findOne()
  },
  cambiopendiente: {
    type: Boolean,
    default: true
  },
  fechaUltimoCambio: {
    type: Date,
    default: Date.now
  },

  // 🔗 Relación con Personas
  personasAsignadas: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Persona"
    }
  ]
}, { timestamps: true });

// 🧹 Middleware: limpieza de texto antes de guardar
publicadorSchema.pre("save", function (next) {
  const doc = this;

  const cleanText = (value) => {
    if (typeof value !== "string") return value;
    const cleaned = value.trim().replace(/\s+/g, " ").toLowerCase();
    return cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
  };

  const textFields = [
    "nombre",
    "apellido",
    "correo",
    "grupo",
    "congregacion",
    "territorioAsignado",
    "observacion",
    "activo"
  ];

  textFields.forEach((field) => {
    if (doc[field]) doc[field] = cleanText(doc[field]);
  });

  next();
});

export default mongoose.model("Publicador", publicadorSchema);
