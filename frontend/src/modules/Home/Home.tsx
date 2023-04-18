import React, { FC, useState, useRef, useEffect } from "react";
import styles from "./Home.module.css";
import { Dialog, Loader, Posts } from "../../components";
import { AiOutlinePlus } from "react-icons/ai";
import { FiSearch } from "react-icons/fi";
import { IPost, deletePost, useAppDispatch, useAppSelector } from "../../store";
import { useNavigate } from "react-router-dom";

const Home: FC = () => {
  const postState = useAppSelector((state) => state.posts);
  const [filteredPosts, setFilteredPosts] = useState<IPost[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [idState, setIdState] = useState<string>("");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const searchInputEl = useRef<HTMLInputElement>(null);
  const addNewHandler = () => navigate("/create");
  const clickDeleteDialogHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    isPermit: boolean
  ) => {
    setIsDialogOpen(false);
    if (isPermit) {
      dispatch(deletePost(idState));
    }
  };

  const deleteHandler = (_id: string) => {
    setIsDialogOpen(true);
    setIdState(_id);
  };

  const inputContainerClickHandler = () => {
    searchInputEl.current?.focus();
  };

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    let query = e.target.value.trim();
    setFilteredPosts(
      postState.posts.filter((post) => post._id.startsWith(query))
    );
  };

  useEffect(() => {
    setFilteredPosts(postState.posts);
  }, [postState]);

  return postState.isLoading ? (
    <Loader />
  ) : (
    <div className={styles.container}>
      <h1>Posts</h1>
      <div className={styles.heading}>
        <div className={styles.left} onClick={inputContainerClickHandler}>
          <FiSearch />
          <input
            type="text"
            placeholder="Search by ID"
            ref={searchInputEl}
            onChange={changeHandler}
          />
        </div>

        <div className={styles.right}>
          <button onClick={addNewHandler}>
            <AiOutlinePlus />
            <span>Add Post</span>
          </button>
        </div>
      </div>
      <div className={styles.posts}>
        <Posts posts={filteredPosts} deleteHandler={deleteHandler} />
      </div>

      {/* Dialog */}
      <Dialog
        message="This post will be permanently deleted from the database."
        title="Delete Message?"
        clickHandler={clickDeleteDialogHandler}
        isOpen={isDialogOpen}
      />
    </div>
  );
};

export default Home;
