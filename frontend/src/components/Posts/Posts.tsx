import React, { FC } from "react";
import styles from "./Posts.module.css";
import { IPost } from "../../store";
import { AiOutlineEdit } from "react-icons/ai";
import { RiDeleteBin5Line } from "react-icons/ri";
import { FiExternalLink } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
interface IProps {
  posts: IPost[];
  deleteHandler: (_id: string) => void;
}

const Posts: FC<IProps> = ({ posts, deleteHandler }) => {
  const navigate = useNavigate();

  const openPostHandler = (slug: string) => {
    navigate(`/post/${slug}`);
  };
  const editHandler = (_id: string) => {
    navigate(`/update/${_id}`);
  };

  return posts.length === 0 ? (
    <p className={styles.noPost}>No Post Found!</p>
  ) : (
    <div className={styles.container}>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post._id}>
              <td>{post._id}</td>
              <td>
                {`${post.title.slice(0, 50)}${
                  post.title.length > 50 ? "..." : ""
                }`}
              </td>

              <td>
                <button onClick={() => openPostHandler(post.slug)}>
                  <FiExternalLink />
                </button>
                <button onClick={() => editHandler(post._id)}>
                  <AiOutlineEdit />
                </button>
                <button onClick={() => deleteHandler(post._id)}>
                  <RiDeleteBin5Line />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Posts;
