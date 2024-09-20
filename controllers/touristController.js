const path = require("path");
// Add a new tourist spot
const cloudinary = require("cloudinary").v2;
const TouristSpot = require("../models/touristModel");
const stream = require("stream");

const addTouristSpot = async (req, res) => {
  try {
    if (!req.files || !req.files.image) {
      return res.status(400).json({ msg: "Must contain an image" });
    }

    const productImage = req.files.image;

    // Check if the file is actually an image
    if (!productImage.mimetype.startsWith("image")) {
      return res.status(400).json({ msg: "Must contain an image" });
    }

    // Check for the size
    const maxSize = 1024 * 1024; // 1MB
    if (productImage.size > maxSize) {
      return res
        .status(400)
        .json({ msg: "Image size should be less than 1MB" });
    }

    // Create a buffer stream from the image data
    const bufferStream = new stream.PassThrough();
    bufferStream.end(productImage.data); // Assuming productImage.data contains the image buffer

    // Upload the image to Cloudinary
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        use_filename: true,
        folder: "file-upload-02",
      },
      async (error, result) => {
        if (error) {
          return res
            .status(500)
            .json({ msg: "Error uploading image to Cloudinary", error });
        }

        // The secure URL is the path to the uploaded image
        const imagePath = result.secure_url;

        // Get additional data from the request body
        const { name, province, district, country, category } = req.body;

        // Save tourist spot info in the database
        const newTouristSpot = new TouristSpot({
          name,
          location: {
            province,
            district,
            country,
          },
          category,
          image: imagePath, // Save the URL in the DB
        });

        try {
          await newTouristSpot.save();
          res.status(200).json({ msg: "Spot added" });
        } catch (err) {
          res
            .status(500)
            .json({ msg: "Error saving tourist spot", error: err });
        }
      }
    );

    // Pipe the buffer stream to Cloudinary's upload stream
    bufferStream.pipe(uploadStream);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error adding tourist spot", error });
  }
};

module.exports = { addTouristSpot };

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

const deleteTouristSpot = async (req, res) => {
  try {
    const spotId = req.params.id;
    const del = await TouristSpot.findOneAndDelete({ _id: spotId });
    if (!del) {
      return res.status(404).json({ msg: "no spot found" });
    }

    res.status(200).json({ msg: "spot deleted" });
  } catch (error) {
    res.status(500).json({ msg: "Error deleting tourist spots" });
  }
};

// Export all functions at once
module.exports = {
  deleteTouristSpot,
  addTouristSpot,
  getAllTouristSpots,
  getTouristSpotById,
  searchTouristSpots,
};
