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
    match: /^[a-zA-Z0-9\s]+$/
  },
  TarjetaPred: {
    type: String,
    maxlength: 6,
    match: /^[0-9]+$/
  },
  Territorio: {
    type: String,
    maxlength: 12
  },
  calle: {
    type: String,
    maxlength: 6,
    match: /^[a-zA-Z0-9\s]+$/
  },
  carrera: {
    type: String,
    maxlength: 6,
    match: /^[a-zA-Z0-9\s]+$/
  },
  diagonalNo: {
    type: String,
    maxlength: 6,
    match: /^[a-zA-Z0-9\s]+$/
  },
  casaNo: {
    type: String,
    maxlength: 12,
    match: /^[a-zA-Z0-9\s]+$/
  },
  piso: {
    type: String,
    maxlength: 3,
    match: /^[a-zA-Z0-9\s]+$/
  },
  color: {
    type: String,
    maxlength: 6
  },
  referenciaLLegar: {
    type: String,
    maxlength: 40,
    match: /^[a-zA-Z0-9\s]+$/
  },
  Acompaniante: {
    type: String,
    maxlength: 30
  },
  Tema: {
    type: String,
    required: true,
    maxlength: 40
  },
  observacion: {
    type: String,
    maxlength: 50
  },
  texto: {
    type: String,
    maxlength: 40,
    match: /^[a-zA-Z0-9\s]+$/
  },
  publicacion: {
    type: String,
    maxlength: 25,
    match: /^[a-zA-Z0-9\s]+$/
  },
  telefono: {
    type: String,
    maxlength: 33,
    match: /^[0-9]+$/
  },
  fecharegreso: {
    type: Date
  },
  coordenadasgas: {
    type: String,
    maxlength: 50,
    match: /^[a-zA-Z0-9\s]+$/
  },
  activo: {
    type: String,
    required: true,
    maxlength: 5
  },
  correo: {
    type: String,
    maxlength: 40,
    match: /^[a-zA-Z0-9@._-]+$/
  },
  fechapredicacion: {
    type: Date
  }
}, { timestamps: true });

export default mongoose.model("Persona", personaSchema);
