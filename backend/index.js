const express = require("express");
const mongoose = require("mongoose");
var colors = require("colors");
const dotenv = require("dotenv");
const pinRoutes = require("./routes/pins");
const userRoutes=require('./routes/users')

const app = express();

dotenv.config();
app.use(express.json());

mongoose
  .connect(process.env.MONGO_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Mongo DB połączone".underline.yellow);
  })
  .catch((err) => {
    console.log(err);
  });

app.use("/api/pins", pinRoutes);
app.use('/api/users', userRoutes)

app.listen(8800, () => {
  console.log("Serwer działa na porcie 8800".underline.blue);
});
