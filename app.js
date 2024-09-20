const express = require("express");
const mongoose = require("mongoose");
const fileUpload = require("express-fileupload");
const touristRoutes = require("./routes/touristRoutes");
const cors = require("cors");
require("dotenv").config();
//cloudnary version 2
const cloudnary = require("cloudinary").v2;

const app = express();

// MongoDB connection
mongoose
  .connect(`${process.env.MONGODB_URI}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

//config cloudnary
cloudnary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});
// Middleware
app.use(express.json());
app.use(fileUpload());
app.use(cors());
app.use(express.static("public"));

// Routes
app.use("/api", touristRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
