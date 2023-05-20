const { response } = require("express");
const HomeCarousel = require("../models/HomeCarousel");

// Get All HomeCarousel
const getAll = async (req, res, next) => {
  try {
    const images = await HomeCarousel.find()
    res.status(200).json({images: images[0].images});
  } catch (error) {
    res.status(400).json(error);
  }
};

// Create Image
const createHomeCarousel = async (req, res, next) => {
    console.log(req.body);
    const newHomeCarousel = new HomeCarousel(req.body);
  
    try {
      const savedHomeCarousel = await newHomeCarousel.save();
      res.status(200).json(savedHomeCarousel);
    } catch (error) {
      res.status(500).json(error);
    }
  };


// Update HomeCarousel
const updateHomeCarousel = async (req, res) => {
  const updatedData = {
    name: req.body.name,
    description: req.body.description,
    image: req.body.image,
    category: req.body.category,
  };

  try {
    const updatedHomeCarousel = await HomeCarousel.findByIdAndUpdate(
      req.body.id,
      {
        $set: updatedData,
      },
      {
        new: true,
      }
    );
    res.status(200).json(updatedHomeCarousel);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Search HomeCarousels
const searchHomeCarousels = async (req, res, next) => {
  const {name, category} = req.body
  const search = {}

  if(name) {
    search.name = { $regex: new RegExp(name.toLowerCase(), "i") }
  }
  if(category) {
    search.category = category
  }

  try {
    const searchedHomeCarousels = await HomeCarousel.paginate(
      search,
      { page: req.query.page, limit: req.query.limit }
    );
    res.status(200).json(searchedHomeCarousels);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  getAll,
  createHomeCarousel,
  updateHomeCarousel,
  searchHomeCarousels
};
