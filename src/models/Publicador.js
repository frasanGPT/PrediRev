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
    match: /^[a-zA-Z0-9@._-]+$/,
    unique: true // evita duplicados de correo
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
  },
  // Nuevo campo: obliga al cambio de contraseña en el primer inicio o reinicio
  cambiopendiente: {
    type: Boolean,
    default: false
  },
  // Nuevo campo: registra la última vez que se cambió la contraseña
  fechaUltimoCambio: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

export default mongoose.model("Publicador", publicadorSchema);
