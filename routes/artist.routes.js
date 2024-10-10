const express = require("express")
const router = express.Router()

const Artist = require("../models/Artist.model.js");

router.post("/", (req, res) => {

  console.log(req.body)
  // queremos acceder a la DB y crear un documento con toda la info del req.body
  Artist.create(req.body)
  .then(() => {
    res.sendStatus(201) // sendStatus no require envio de send o json o sendFile
  })
  .catch((error) => {
    console.log(error)
  })

})

router.get("/", (req, res) => {

  // ?name=Foo Fighters

  console.log(req.query)

  Artist.find(req.query) // busca todos los documentos
  .select( { name: 1, awardsWon: 1 } ) // funciona como el project de Mongo Compass. Indica las propiedades que necesito.
  .sort({awardsWon: -1}) // ordenar la data recibida por la propiedad indicada
  .limit(3) // limita la cantidad de elementos a recibir (ver tambien skip)
  .then((response) => {
    console.log(response)
    res.status(200).json(response)
  })
  .catch((error) => {
    console.log(error)
  })

})

// router.get("/search", (req, res) => {

//   console.log(req.query)

//   Artist.find( req.query )
//   .then((response) => {
//     console.log(response)
//     res.json(response)
//   })
//   .catch((error) => {
//     console.log(error)
//   })

// })

// buscar los detalles de un artista
router.get("/:artistId", async (req, res) => {

  try {
    
    const response = await Artist.findById( req.params.artistId )
    res.status(200).json(response)

  } catch (error) {
    console.log(error)    
  }

})

// borrar un artista (por su id)
router.delete("/:artistId", async (req, res) => {

  try {
    
    await Artist.findByIdAndDelete( req.params.artistId )
    res.sendStatus(202)

  } catch (error) {
    console.log(error)
  }

})

// editar un artista
router.put("/:artistId", async (req, res) => {

  try {
    
    const response = await Artist.findByIdAndUpdate(req.params.artistId, {
      name: req.body.name,
      awardsWon: req.body.awardsWon,
      isTouring: req.body.isTouring,
      genre: req.body.genre
    }, {new: true})

    // mongoose nos da como respuesta la data antes de la actualización
    // si queremos la data despues de la actualizacion agregamos un tercer argumento {new: true}

    res.status(202).json(response) // asumimos que les interesa el nuevo documento

  } catch (error) {
    console.log(error)
  }

})

// ruta para editar una propiedad del documento
router.patch("/:artistId/is-touring-false", async(req, res) => {

  try {
    
    await Artist.findByIdAndUpdate(req.params.artistId, {
      isTouring: false
    })
    res.sendStatus(202)

  } catch (error) {
    console.log(error)
  }

})

module.exports = router