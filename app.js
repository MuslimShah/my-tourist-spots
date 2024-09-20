const express = require("express");
const mongoose = require("mongoose");
const fileUpload = require("express-fileupload");
const touristRoutes = require("./routes/touristRoutes");
const cors = require("cors");

const app = express();

// MongoDB connection
mongoose
  .connect("mongodb://localhost:27017/touristDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

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
