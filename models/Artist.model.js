const mongoose = require("mongoose")

// creamos el esquema
const artistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  awardsWon: {
    type: Number,
    min: 0,
    default: 0
  },
  isTouring: Boolean,
  genre: {
    type: [String],
    enum: ["rock", "country", "alternative", "grunge", "pop"]
  }
})

//! cada vez que modifiquemos los esquemas de la BD, debemos borrar la colección.

// creamos el modelo
const Artist = mongoose.model("Artist", artistSchema)
// 1. el nombre interno con el que mongo reconoce este modelo y la colección
// 2. el esquema

module.exports = Artist