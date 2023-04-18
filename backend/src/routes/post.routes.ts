import { Router } from "express";
import {
  createPost,
  deletePost,
  isSlugAvailable,
  readAllPosts,
  readPost,
  updatePost,
} from "../controllers";

const postRouter = Router();

postRouter.get("/", readAllPosts);
postRouter.get("/:id", readPost);
postRouter.post("/", createPost);
postRouter.put("/:id", updatePost);
postRouter.delete("/:id", deletePost);
postRouter.get("/slug/:slug", isSlugAvailable);

export { postRouter };
