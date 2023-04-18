import React, { useState, useEffect } from "react";
import styles from "./Post.module.css";
import { IPost, useAppSelector } from "../../store";
import { useNavigate, useParams } from "react-router-dom";
import { Loader } from "../../components";
const Post = () => {
  const [post, setPost] = useState<IPost>({
    _id: "",
    body: "",
    slug: "",
    title: "",
  });
  const posts = useAppSelector((state) => state.posts);
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  useEffect(() => {
    if (posts.isLoading) return;
    let post = posts.posts.find((post) => post.slug === (slug as string));
    if (!post) {
      navigate("/error-page");
      return;
    }
    setPost(post);
  }, [posts]);

  return posts.isLoading ? (
    <Loader />
  ) : (
    <div className={styles.container}>
      <h1>{post.title}</h1>
      <div
        className={styles.body}
        dangerouslySetInnerHTML={{ __html: post.body }}
      ></div>
    </div>
  );
};

export default Post;
