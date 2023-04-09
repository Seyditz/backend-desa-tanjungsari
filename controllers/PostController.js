const { response } = require("express");
const Post = require("../models/Post");

// Get All Post
const getAll = async (req, res, next) => {
  try {
    const posts = await Post.paginate(
      {},
      { page: req.query.page, limit: req.query.limit }
    );
    res.status(200).json(posts);
  } catch (error) {
    res.status(400).json(error);
  }
};

// Get Post By ID
const getPostById = async (req, res, next) => {
  try {
    const post = await Post.findById(req.body.id);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Create Post
const createPost = async (req, res, next) => {
  console.log(req.body);
  const newPost = new Post(req.body);

  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Delete Post
const deletePost = (req, res, next) => {
  let id = req.body.id;
  Post.findByIdAndRemove(id)
    .then(() => {
      res.json({
        message: "Post deleted successfully!",
      });
    })
    .catch((error) => {
      res.json({
        message: "An error occured!",
      });
    });
};

// Update Post
const updatePost = async (req, res) => {
  const updatedData = {
    name: req.body.name,
    description: req.body.description,
    image: req.body.image,
    category: req.body.category,
  };

  try {
    const updatedPost = await Post.findByIdAndUpdate(
      req.body.id,
      {
        $set: updatedData,
      },
      {
        new: true,
      }
    );
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  getAll,
  getPostById,
  createPost,
  deletePost,
  updatePost
};
