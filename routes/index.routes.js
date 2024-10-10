const express = require("express")
const router = express.Router()

// index.routes será gestor de rutas

router.get("/", (req, res, next) => {
  res.status(200).json({ message: "all good here!" })
})

router.post("/patata/:cohort/:ingrediente/algo", (req, res) => {

  // console.log(req.path)
  // console.log(req.headers)

  // el cliente nos quiere dar información adicional
  // params, query o el body
  console.log("req.params", req.params) // Se pasan en el URL. algo que define el servidor
  console.log("req.query", req.query) // Se pasan por el URL. el cliente lo define y envia
  console.log("req.body", req.body) // se pasa por el body (contenido de llamada). el cliente lo define y envia




  res.send("accediendo a esta ruta, todo bien")
})

const artistRouter = require("./artist.routes.js")
router.use("/artist", artistRouter)

const songRouter = require("./song.routes.js")
router.use("/song", songRouter)

module.exports = router