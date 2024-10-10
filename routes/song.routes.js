const express = require("express")
const router = express.Router()

const Song = require("../models/Song.model.js");

router.post("/", async(req, res) => {

  const { title, releasedDate, time, artist } = req.body

  try {
    
    const response = await Song.create({ title, releasedDate, time, artist })
    res.status(201).json(response) // aqui asumimos que el cliente necesita la nueva cancion que se ha creado

  } catch (error) {
    console.log(error)
  }

})

router.get("/", async(req, res, next) => {

  try {
    
    const response = await Song.find()
    .populate({
      path: "artist",
      select: {name: 1, similarArtist: 1},
      populate: {
        path: "similarArtist",
        model: "Artist",
        select: {name: 1}
      }
    })
    // .populate("likes") // ejemplo de dos propiedades que tiene relaciones y queremos hacer populate

    res.status(200).json(response)

  } catch (error) {
    // next() // sin argumentos: salta a la siguiente ruta
    next(error) // con argumentos: se comporta como un salto al gestor de errores 500
    // ! de ahora en adelante, en todos los catch deberá haber este: next(error)
  }

})

module.exports = router