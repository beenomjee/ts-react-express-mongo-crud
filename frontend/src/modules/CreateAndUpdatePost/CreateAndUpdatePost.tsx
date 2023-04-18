import { FC, useState, useRef, useEffect } from "react";
import styles from "./CreateAndUpdatePost.module.css";
import axios from "axios";
import {
  createPost,
  updatePost,
  useAppDispatch,
  useAppSelector,
} from "../../store";
import { useNavigate, useParams } from "react-router-dom";
import { Dialog, Loader } from "../../components";
interface IPost {
  title: string;
  body: string;
  slug: string;
}

interface IResponse {
  status: string;
  isSlugAvailable: boolean;
}
const checkFromDBSlugAvailablity = async (slug: string) => {
  try {
    const res = await axios.get<IResponse>(
      `http://localhost:3000/api/post/slug/${slug}`
    );
    return res.data.isSlugAvailable;
  } catch (err) {
    return false;
  }
};
const generateSlug = (title: string) => {
  title = title.trim();
  let slug: string = "";
  for (let i = 0; i < title.length; i++) {
    const chr = title[i];
    const ascii = chr.charCodeAt(0);
    if (
      (ascii >= 65 && ascii <= 92) ||
      (ascii >= 97 && ascii <= 122) ||
      (ascii >= 48 && ascii <= 57)
    ) {
      slug += chr;
    } else {
      slug += "-";
    }
  }
  return slug;
};

interface IProps {
  isUpdate?: boolean;
}

const CreatePost: FC<IProps> = ({ isUpdate = false }) => {
  const [data, setData] = useState<IPost>({ title: "", body: "", slug: "" });
  const [isSlugAvailable, setIsSlugAvailable] = useState<boolean>(true);
  const dispatch = useAppDispatch();
  const slugInputEl = useRef<HTMLInputElement>(null);
  const titleInputEl = useRef<HTMLInputElement>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const navigate = useNavigate();
  // updating
  const { _id } = useParams<{ _id: string }>();
  const posts = useAppSelector((state) => state.posts);

  const editHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setData((preState) => {
      if (e.target.id === "title") {
        return {
          ...preState,
          [e.target.id]: e.target.value,
          slug: generateSlug(e.target.value),
        };
      } else if (e.target.id === "slug") {
        setIsSlugAvailable(true);
      }
      return { ...preState, [e.target.id]: e.target.value };
    });
  };

  const blurHandler = () => {
    setIsSlugAvailable(true);
    setData((preState) => ({
      ...preState,
      slug: generateSlug(preState.slug),
    }));
  };

  const publish = async () => {
    const isAvail = await checkFromDBSlugAvailablity(data.slug);
    if (!isAvail) {
      setIsSlugAvailable(false);
      slugInputEl.current?.focus();
      return;
    }
    const callback = () => navigate("/");
    dispatch(createPost({ data, callback }));
  };

  // updating
  const update = async () => {
    let isAvail = await checkFromDBSlugAvailablity(data.slug);
    if (
      isUpdate &&
      posts.posts.find((post) => post._id === (_id as string))?.slug ===
        data.slug
    ) {
      isAvail = true;
    }
    if (!isAvail) {
      setIsSlugAvailable(false);
      slugInputEl.current?.focus();
      return;
    }
    const callback = () => navigate("/");
    dispatch(
      updatePost({
        data: {
          _id: _id as string,
          ...data,
        },
        callback,
      })
    );
  };

  const publishHandler = () => {
    setIsDialogOpen(true);
  };

  // updating
  const updateHandler = () => {
    setIsDialogOpen(true);
  };

  useEffect(() => {
    titleInputEl.current?.focus();
  }, [titleInputEl]);

  // updating
  useEffect(() => {
    if (isUpdate) {
      let post = posts.posts.find((post) => post._id === _id);
      console.log(posts);

      if (posts.isLoading) return;
      if (!post) {
        navigate("/error-page", { replace: true });
        return;
      }
      setData({
        body: post.body,
        slug: post.slug,
        title: post.title,
      });
    }
  }, [isUpdate, posts]);

  return posts.isLoading ? (
    <Loader />
  ) : (
    <div className={styles.container}>
      <h1>{isUpdate ? "Update Post" : "Add New Post"}</h1>
      <div className={styles.title}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          placeholder="Enter post title..."
          onChange={editHandler}
          value={data.title}
          ref={titleInputEl}
        />
      </div>
      <div className={`${styles.slug} ${!isSlugAvailable ? styles.error : ""}`}>
        <label htmlFor="slug">Slug</label>
        <input
          type="text"
          id="slug"
          onChange={editHandler}
          value={data.slug}
          onBlur={blurHandler}
          placeholder="Enter slug..."
          ref={slugInputEl}
        />
      </div>
      <div className={styles.body}>
        <label htmlFor="body">Body</label>
        <textarea
          id="body"
          onChange={editHandler}
          value={data.body}
          placeholder="Enter post body..."
        ></textarea>
      </div>
      <div className={styles.publish}>
        <button
          disabled={
            !Boolean(data.slug) ||
            !isSlugAvailable ||
            !Boolean(data.body) ||
            !Boolean(data.title)
          }
          onClick={publishHandler}
        >
          {isUpdate ? "Update" : "Publish"}
        </button>
      </div>

      <Dialog
        isOpen={isDialogOpen}
        title={isUpdate ? "Update Post?" : "Publish Post?"}
        message={
          isUpdate
            ? "Are you sure to update this post?"
            : "Are you sure to publish this post?"
        }
        clickHandler={(e, isPermit) => {
          setIsDialogOpen(false);
          isPermit && isUpdate ? update() : publish();
        }}
      />
    </div>
  );
};

export default CreatePost;
