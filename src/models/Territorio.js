// src/models/Territorio.js
import mongoose from "mongoose";

const { Schema } = mongoose;

const territorioSchema = new Schema({
  codigo: {
    type: String,
    required: true,
    unique: true,
    maxlength: 10,
    trim: true,
    match: /^[a-zA-Z0-9\s-]+$/
  },
  nombre: {
    type: String,
    required: true,
    maxlength: 50,
    trim: true
  },
  descripcion: {
    type: String,
    maxlength: 150,
    trim: true
  },
  estado: {
    type: String,
    enum: ["Disponible", "Asignado", "En trabajo", "Completado", "Inactivo"],
    default: "Disponible",
    trim: true
  },
  // 🔗 Relación con el publicador responsable
  publicadorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Publicador",
    default: null
  },
  // 🔗 Lista de personas asociadas al territorio
  personas: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Persona"
    }
  ],
  // Fecha de entrega o devolución del territorio
  fechaAsignacion: {
    type: Date
  },
  fechaDevolucion: {
    type: Date
  },
  observacion: {
    type: String,
    maxlength: 100,
    trim: true
  }
}, { timestamps: true });

// 🧹 Limpieza automática de texto antes de guardar
territorioSchema.pre("save", function (next) {
  const doc = this;

  const cleanText = (value) => {
    if (typeof value !== "string") return value;
    const cleaned = value.trim().replace(/\s+/g, " ").toLowerCase();
    return cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
  };

  const textFields = ["codigo", "nombre", "descripcion", "estado", "observacion"];
  textFields.forEach((field) => {
    if (doc[field]) doc[field] = cleanText(doc[field]);
  });

  next();
});

export default mongoose.model("Territorio", territorioSchema);
