require("dotenv").config();

// hacemos la conexión a la DB
const mongoose = require("mongoose")
mongoose.connect("mongodb://127.0.0.1:27017/songs-and-artists-db")
.then(() => {
  console.log("conectados a la DB. Todo ok")
})
.catch((error) => {
  console.log(error)
})

const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const app = express();

// all middlewares & configurations here
app.use(logger("dev"));
app.use(express.static("public"));

// to allow CORS access from anywhere
app.use(cors({
  origin: '*'
}));

// below two configurations will help express routes at correctly receiving data. 
app.use(express.json()); // recognize an incoming Request Object as a JSON Object
app.use(express.urlencoded({ extended: false })); // recognize an incoming Request Object as a string or array


// all routes here...
app.get("/", (req, res, next) => {
  res.json({ message: "all good here!" })
})

app.post("/patata/:cohort/:ingrediente/algo", (req, res) => {

  // console.log(req.path)
  // console.log(req.headers)

  // el cliente nos quiere dar información adicional
  // params, query o el body
  console.log("req.params", req.params) // Se pasan en el URL. algo que define el servidor
  console.log("req.query", req.query) // Se pasan por el URL. el cliente lo define y envia
  console.log("req.body", req.body) // se pasa por el body (contenido de llamada). el cliente lo define y envia




  res.send("accediendo a esta ruta, todo bien")
})

// Ruta de Artistas
const Artist = require("./models/Artist.model.js")

// CRUD

app.post("/artist", (req, res) => {

  console.log(req.body)
  // queremos acceder a la DB y crear un documento con toda la info del req.body
  Artist.create({
    name: req.body.name,
    awardsWon: req.body.awardsWon,
    isTouring: req.body.isTouring,
    genre: req.body.genre
  })
  .then(() => {
    res.send("todo ok, documento creado")
  })
  .catch((error) => {
    console.log(error)
  })

})

app.get("/artist", (req, res) => {

  Artist.find() // busca todos los documentos
  .select( { name: 1, awardsWon: 1 } ) // funciona como el project de Mongo Compass. Indica las propiedades que necesito.
  .sort({awardsWon: -1}) // ordenar la data recibida por la propiedad indicada
  .limit(3) // limita la cantidad de elementos a recibir (ver tambien skip)
  .then((response) => {
    console.log(response)
    res.json(response)
  })
  .catch((error) => {
    console.log(error)
  })

})

app.get("/search", (req, res) => {

  console.log(req.query)

  Artist.find( req.query )
  .then((response) => {
    console.log(response)
    res.json(response)
  })
  .catch((error) => {
    console.log(error)
  })

})

// buscar los detalles de un artista
app.get("/artist/:artistId", async (req, res) => {

  try {
    
    const response = await Artist.findById( req.params.artistId )
    res.json(response)

  } catch (error) {
    console.log(error)    
  }

})

// borrar un artista (por su id)
app.delete("/artist/:artistId", async (req, res) => {

  try {
    
    await Artist.findByIdAndDelete( req.params.artistId )
    res.send("todo ok, artista borrado")

  } catch (error) {
    console.log(error)
  }

})

// editar un artista
app.put("/artist/:artistId", async (req, res) => {

  try {
    
    const response = await Artist.findByIdAndUpdate(req.params.artistId, {
      name: req.body.name,
      awardsWon: req.body.awardsWon,
      isTouring: req.body.isTouring,
      genre: req.body.genre
    }, {new: true})

    // mongoose nos da como respuesta la data antes de la actualización
    // si queremos la data despues de la actualizacion agregamos un tercer argumento {new: true}

    res.json(response) // asumimos que les interesa el nuevo documento

  } catch (error) {
    console.log(error)
  }

})

// ruta para editar una propiedad del documento
app.patch("/artist/:artistId/is-touring-false", async(req, res) => {

  try {
    
    await Artist.findByIdAndUpdate(req.params.artistId, {
      isTouring: false
    })
    res.send("todo ok, artista cambiado a que ya no hace tour")

  } catch (error) {
    console.log(error)
  }

})

// server listen & PORT
const PORT = process.env.PORT || 5005

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});