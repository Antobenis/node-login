const express = require("express");
const mongoose = require('mongoose');
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const userRoute = require("./routes/user")

const port = 7000
const app = express();



dotenv.config()

mongoose.connect(process.env.MANGO_DB,
     
      { useNewUrlParser: true })
      
      .then(() => {
            console.log("mangodb connected");
      })
      .catch((err) => {
            console.log(`mangodb not connected ${err}`);
      })


//middleware

app.use(express.json())
app.use(helmet())
app.use(morgan('login'))


app.use("/api" , userRoute);

app.listen(port, () => {
      console.log(`server conected ${port}`);
})