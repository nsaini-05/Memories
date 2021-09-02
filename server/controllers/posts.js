import PostMessage from "../models/postMessage.js";
import cloudinary from "cloudinary";
import mongoose from "mongoose";

/*************************************/
/* GET POST */
/*************************************/

export const getPosts = async (req, res) => {
  try {
    const postMessages = await PostMessage.find();
    res.status(200).json(postMessages);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/*************************************/
/* CREATE POST */
/*************************************/

export const createPost = async (req, res) => {
  if (req.body.selectedFile.public_url !== "") {
    const result = await cloudinary.v2.uploader.upload(
      req.body.selectedFile.public_url,
      {
        folder: "Memories",
      }
    );

    // req.body.selectedFile = {
    //   public_id: "",
    //   public_url: "",
    // };

    req.body.selectedFile.public_url = result.secure_url;
    req.body.selectedFile.public_id = result.public_id;
  }

  const post = req.body;
  const newPost = new PostMessage(post);
  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (err) {
    // res.status(404).json({ message: `Error : ${err.message}` });
    console.log(err);
  }
};

/*************************************/
/* UPDATE POST */
/*************************************/

export const updatePost = async (req, res) => {
  const { id } = req.params;

  if (req.body.selectedFile.public_url !== "") {
    const result = await cloudinary.v2.uploader.upload(
      req.body.selectedFile.public_url,
      {
        folder: "Memories",
      }
    );

    req.body.selectedFile.public_url = result.secure_url;
    req.body.selectedFile.public_id = result.public_id;
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "No post with that ID" });
  }

  const post = await PostMessage.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.json(post);
};

/*************************************/
/* DELETE POST */
/*************************************/

export const deletePost = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "No post with that ID" });
  }
  const post = await PostMessage.findById(id);
  const image_id = post.selectedFile.public_id;
  await cloudinary.v2.uploader.destroy(image_id);
  await post.remove();
  res.json({ message: "Post deleted successfully" });
};

/*************************************/
/* LIKE POST */
/*************************************/

export const likePost = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "No post with that ID" });
  }
  const post = await PostMessage.findById(id);
  const updatedPost = await PostMessage.findByIdAndUpdate(
    id,
    { likeCount: post.likeCount + 1 },
    { new: true }
  );
  res.json(updatedPost);
};
