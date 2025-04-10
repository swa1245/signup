const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("mongo db connected");
  })
  .catch((err) => {
    console.log(`erro in connecting db ${err}`);
  });
