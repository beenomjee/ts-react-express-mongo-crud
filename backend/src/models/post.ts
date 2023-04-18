import { Schema, Document, model } from "mongoose";

export interface IPost {
  title: string;
  body: string;
  slug: string;
}

export interface IPostDoc extends IPost, Document {}

const postSchema = new Schema<IPostDoc>(
  {
    title: {
      type: "string",
      required: true,
    },
    body: {
      type: "string",
      required: true,
    },
    slug: {
      type: "string",
      required: true,
    },
  },
  { timestamps: false }
);

const Post = model<IPostDoc>("post", postSchema);
export default Post;
