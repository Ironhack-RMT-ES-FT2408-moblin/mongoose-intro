function errorHandling(app) {

  app.use((req, res) => {
    res.status(404).json({ errorMessage: "Te has perdido, esta ruta no existe" })
  })
  
  //500
  app.use((error, req, res, next) => {
    // por el hecho de que tiene 4 argumentos sabe que es un middleware especial de gestion de erorres 500
    console.log(error)
    res.status(500).json({errorMessage: "Problemas de servidor"})
  })

}

module.exports = errorHandling