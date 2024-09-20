const express = require("express");
const router = express.Router();
const touristController = require("../controllers/touristController");

// Route to add a tourist spot (POST)
router.post("/tourist-spots", touristController.addTouristSpot);

// Route to get all tourist spots (GET)
router.get("/tourist-spots", touristController.getAllTouristSpots);

// Route to get a specific tourist spot by ID (GET)
router.get("/tourist-spots/:id", touristController.getTouristSpotById);

// Route to search for tourist spots (GET)
router.get("/spot/search", touristController.searchTouristSpots);

module.exports = router;
