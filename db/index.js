const mongoose = require("mongoose")

mongoose.connect("mongodb://127.0.0.1:27017/songs-and-artists-db")
.then(() => {
  console.log("conectados a la DB. Todo ok")
})
.catch((error) => {
  console.log(error)
})