require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

const resumeRoutes = require("./routes/resumeRoutes");
app.use("/api", resumeRoutes);

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDb connected");
    app.listen(5000, () => {
      console.log("Serveer running on Port : 5000");
    });
  })
  .catch((error) => console.error(error));
