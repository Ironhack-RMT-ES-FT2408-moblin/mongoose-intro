const mongoose = require("mongoose")

const songSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  releasedDate: {
    type: Date
  },
  time: Number,
  artist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Artist" // Esto es la referencia "nombre" de un modelo registrado
  },
  // likes: [
  //   {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "User"
  //   }
  // ]
})

const Song = mongoose.model("Song", songSchema)

module.exports = Song