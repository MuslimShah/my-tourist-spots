const TouristSpot = require("../models/touristModel");
const path = require("path");

// Add a new tourist spot
const addTouristSpot = async (req, res) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send("No files were uploaded.");
    }

    const { name, province, district, country, category } = req.body;
    const image = req.files.image;

    // Set the upload path to public/uploads
    const uploadPath = path.join(__dirname, "../public/uploads/", image.name);

    // Move the image file to the specified path
    image.mv(uploadPath, (err) => {
      if (err) {
        return res.status(500).json({ msg: "Error saving file", error: err });
      }

      // Store the relative image path in the database
      const imagePath = `/uploads/${image.name}`;

      // Save tourist spot info in the database
      const newTouristSpot = new TouristSpot({
        name,
        location: {
          province: province,
          district: district,
          country: country,
        },
        category,
        image: imagePath, // Save relative path in the DB
      });

      newTouristSpot
        .save()
        .then(() => res.status(200).json({ msg: "Spot added" }))
        .catch((err) =>
          res.status(500).json({ msg: "Error saving tourist spot", error: err })
        );
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error adding tourist spot", error });
  }
};

// Get all tourist spots
const getAllTouristSpots = async (req, res) => {
  try {
    const spots = await TouristSpot.find();
    res.status(200).json(spots);
  } catch (error) {
    res.status(500).json({ msg: "Error retrieving tourist spots", error });
  }
};

// Get a tourist spot by ID
const getTouristSpotById = async (req, res) => {
  try {
    const spot = await TouristSpot.findById(req.params.id);
    if (!spot) return res.status(404).json({ msg: "Tourist spot not found" });
    res.status(200).json(spot);
  } catch (error) {
    res.status(500).json({ msg: "Error retrieving tourist spot", error });
  }
};

// Search tourist spots by name, province, or category
const searchTouristSpots = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({ msg: "Query parameter is required" });
    }

    console.log("Search Query:", query);

    const spots = await TouristSpot.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { "location.province": { $regex: query, $options: "i" } }, // Correct path for province
        { category: { $regex: query, $options: "i" } },
      ],
    });

    console.log("Found Spots:", spots);

    res.status(200).json(spots);
  } catch (error) {
    res.status(500).json({ msg: "Error searching tourist spots", error });
  }
};

// Export all functions at once
module.exports = {
  addTouristSpot,
  getAllTouristSpots,
  getTouristSpotById,
  searchTouristSpots,
};
