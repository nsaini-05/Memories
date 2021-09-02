import express from "express";
const router = express.Router();

import {
  getPosts,
  createPost,
  updatePost,
  deletePost,
  likePost,
} from "../controllers/posts.js";

// router.get("/", (req, res) => {
//   res.send("This works");
// });

router.get("/", getPosts);
router.post("/", createPost);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);
router.patch("/:id/likepost", likePost);

export default router;
