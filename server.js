require("dotenv").config();

// hacemos la conexión a la DB
// require("./db/index.js")
require("./db")

const express = require("express");

const app = express(); // Solo debe existir una vez (es todo el objeto de nuestro servidor)
const configs = require("./config")
configs(app)

// all routes here...
const indexRouter = require("./routes/index.routes.js")
app.use("/api", indexRouter)

// gestor de errores
const errorHandling = require("./error-handlers")
errorHandling(app)

// server listen & PORT
const PORT = process.env.PORT || 5005

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});