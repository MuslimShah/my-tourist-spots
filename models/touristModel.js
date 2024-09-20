const mongoose = require("mongoose");

const touristSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    image: { type: String, required: true }, // Store image filename or URL
    location: {
      province: { type: String, required: true },
      district: { type: String, required: true },
      country: { type: String, required: true },
    },
    category: {
      type: String,
      enum: ["plain", "mountain", "desert"],
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("TouristSpot", touristSchema);
