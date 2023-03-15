const { response } = require("express");
const Umkm = require("../models/Umkm");

// Get All Umkm
const getAll = async (req, res, next) => {
  try {
    const umkm = await Umkm.paginate(
      {},
      { page: req.query.page, limit: req.query.limit }
    );
    res.status(200).json(umkm);
  } catch (error) {
    res.status(400).json(error);
  }
};

// Create Umkm
const createUmkm = async (req, res, next) => {
  console.log(req.body);
  const newUmkm = new Umkm(req.body);

  try {
    const savedUmkm = await newUmkm.save();
    res.status(200).json(savedUmkm);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Delete Umkm
const deleteUmkm = (req, res, next) => {
  let id = req.body.id;
  Umkm.findByIdAndRemove(id)
    .then(() => {
      res.json({
        message: "Umkm deleted successfully!",
      });
    })
    .catch((error) => {
      res.json({
        message: "An error occured!",
      });
    });
};

// Update Umkm
const updateUmkm = async (req, res) => {
  const updatedData = {
    name: req.body.name,
    description: req.body.description,
    image: req.body.image,
    category: req.body.category,
  };

  try {
    const updatedUmkm = await Umkm.findByIdAndUpdate(
      req.body.id,
      {
        $set: updatedData,
      },
      {
        new: true,
      }
    );
    res.status(200).json(updatedUmkm);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  getAll,
  createUmkm,
  deleteUmkm,
  updateUmkm
};
