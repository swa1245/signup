const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require('cors');
const router = require("./routes/authRouter");
const productRouter = require('./routes/productRouter')
require("dotenv").config();
require("./models/db");

const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());

app.use('/auth',router)
app.use('/products',productRouter)

app.listen(PORT, () => {
  console.log(`port is running on ${PORT}`);
});
