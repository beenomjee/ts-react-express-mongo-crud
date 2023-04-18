import { Request, Response } from "express";
import { IPost, Post } from "./../models";

const readAllPosts = async (req: Request<{}, {}, {}, {}>, res: Response) => {
  try {
    const posts = await Post.find();
    return res.json({ status: "200 OK", posts });
  } catch (error: any) {
    console.log(error.message);
    return res.json({ status: 500, message: error.message });
  }
};

const readPost = async (
  req: Request<{ id: number }, {}, {}, {}>,
  res: Response
) => {
  try {
    const post = await Post.findById(req.params.id);
    return res.json({ status: "200 OK", post });
  } catch (error: any) {
    if (error.kind === "ObjectId") {
      return res.status(404).json({ status: "404 Not Found" });
    }
    console.log(error.message);
    return res.json({ status: 500, message: error.message });
  }
};

const createPost = async (req: Request<{}, {}, IPost, {}>, res: Response) => {
  try {
    const { title, body, slug } = req.body;
    if (!title || !body || !slug)
      return res.status(404).json({
        status: "404 Not Found",
        message: "All required fields are not provided!",
      });

    const post = new Post({ title, body, slug });
    await post.save();
    return res.status(201).json({ status: "201 Created", post });
  } catch (error: any) {
    console.log(error.message);
    return res.json({ status: 500, message: error.message });
  }
};

const updatePost = async (
  req: Request<{ id: number }, {}, IPost, {}>,
  res: Response
) => {
  try {
    const { title, body, slug } = req.body;
    if (!title || !body || !slug)
      return res.status(404).json({
        status: "404 Not Found",
        message: "All required fields are not provided!",
      });

    let post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ status: "404 Not Found" });

    post = await Post.findByIdAndUpdate(
      req.params.id,
      { title, body, slug },
      { new: true }
    );
    return res.status(200).json({ status: "200 OK", post });
  } catch (error: any) {
    if (error.kind === "ObjectId") {
      return res.status(404).json({ status: "404 Not Found" });
    }
    console.log(error.message);
    return res.json({ status: 500, message: error.message });
  }
};

const deletePost = async (
  req: Request<{ id: number }, {}, {}, {}>,
  res: Response
) => {
  try {
    let post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ status: "404 Not Found" });
    await Post.findByIdAndDelete(req.params.id);
    return res
      .status(200)
      .json({ status: "success", message: "Post deleted successfully!" });
  } catch (error: any) {
    if (error.kind === "ObjectId") {
      return res.status(404).json({ status: "404 Not Found" });
    }
    console.log(error.message);
    return res.json({ status: 500, message: error.message });
  }
};

const isSlugAvailable = async (
  req: Request<{ slug: string }, {}, {}, {}>,
  res: Response
) => {
  try {
    let post = await Post.findOne({ slug: req.params.slug });

    return res
      .status(200)
      .json({ status: "success", isSlugAvailable: !Boolean(post) });
  } catch (error: any) {
    if (error.kind === "ObjectId") {
      return res.status(404).json({ status: "404 Not Found" });
    }
    console.log(error.message);
    return res.json({ status: 500, message: error.message });
  }
};

export {
  readAllPosts,
  readPost,
  updatePost,
  createPost,
  deletePost,
  isSlugAvailable,
};
