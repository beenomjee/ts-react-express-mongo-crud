export { store, useAppDispatch, useAppSelector } from "./store";
export {
  fetchPosts,
  createPost,
  updatePost,
  deletePost,
  setError,
} from "./slices";
export type { IStoreState } from "./store";
export type { IFetchResponse, IRequestData, IPost, IPostState } from "./types";
