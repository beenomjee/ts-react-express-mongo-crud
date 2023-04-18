import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { IFetchResponse, IRequestData, IPost, IPostState } from "../types";

export const fetchPosts = createAsyncThunk<
  IFetchResponse,
  void,
  { rejectValue: string }
>("post/fetch", async (_, { rejectWithValue }) => {
  try {
    const res = await axios.get<IFetchResponse>(
      "http://localhost:3000/api/post"
    );
    return res.data;
  } catch (e: any) {
    return rejectWithValue(e.message);
  }
});

export const createPost = createAsyncThunk<
  { status: string; post: IPost },
  IRequestData,
  { rejectValue: string }
>("post/create", async (data, { rejectWithValue }) => {
  try {
    const res = await axios.post("http://localhost:3000/api/post", data.data);
    data.callback();
    return res.data;
  } catch (e: any) {
    return rejectWithValue(e.message);
  }
});

export const updatePost = createAsyncThunk<
  { status: string; post: IPost },
  { data: IPost; callback: () => void },
  { rejectValue: string }
>("post/update", async (data, { rejectWithValue }) => {
  try {
    const res = await axios.put(
      `http://localhost:3000/api/post/${data.data._id}`,
      data.data
    );
    data.callback();
    return res.data;
  } catch (e: any) {
    return rejectWithValue(e.message);
  }
});

export const deletePost = createAsyncThunk<
  { _id: string },
  string,
  { rejectValue: string }
>("post/delete", async (_id, { rejectWithValue }) => {
  try {
    const response = await axios.delete(
      `http://localhost:3000/api/post/${_id}`
    );
    return { _id };
  } catch (e: any) {
    return rejectWithValue(e.message);
  }
});

const initialState: IPostState = {
  error: "",
  isLoading: true,
  posts: [],
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    setError: (state, action) => {
      return {
        ...state,
        error: action.payload,
      };
    },
  },
  extraReducers: (builder) => {
    // fetching
    builder.addCase(fetchPosts.pending, (state, action): IPostState => {
      return {
        error: "",
        isLoading: true,
        posts: [],
      };
    });
    builder.addCase(fetchPosts.fulfilled, (state, action): IPostState => {
      return {
        error: "",
        isLoading: false,
        posts: action.payload.posts,
      };
    });
    builder.addCase(fetchPosts.rejected, (state, action): IPostState => {
      return {
        error: action.payload as string,
        isLoading: false,
        posts: [],
      };
    });

    // creating
    builder.addCase(createPost.pending, (state, action) => {
      return {
        error: "",
        isLoading: true,
        posts: state.posts,
      };
    });
    builder.addCase(createPost.fulfilled, (state, action) => {
      return {
        error: "",
        isLoading: false,
        posts: [...state.posts, action.payload.post],
      };
    });
    builder.addCase(createPost.rejected, (state, action) => {
      return {
        error: action.payload as string,
        isLoading: false,
        posts: state.posts,
      };
    });

    // updating
    builder.addCase(updatePost.pending, (state, action) => {
      return {
        error: "",
        isLoading: true,
        posts: state.posts,
      };
    });
    builder.addCase(updatePost.fulfilled, (state, action) => {
      return {
        error: "",
        isLoading: false,
        posts: state.posts.map((post) =>
          post._id === action.payload.post._id ? action.payload.post : post
        ),
      };
    });
    builder.addCase(updatePost.rejected, (state, action) => {
      return {
        error: action.payload as string,
        isLoading: false,
        posts: state.posts,
      };
    });

    // deleting
    builder.addCase(deletePost.pending, (state, action) => {
      return {
        error: "",
        isLoading: true,
        posts: state.posts,
      };
    });
    builder.addCase(deletePost.fulfilled, (state, action) => {
      return {
        error: "",
        isLoading: false,
        posts: state.posts.filter((post) => post._id !== action.payload._id),
      };
    });
    builder.addCase(deletePost.rejected, (state, action) => {
      return {
        error: action.payload as string,
        isLoading: false,
        posts: state.posts,
      };
    });
  },
});

export const postReducer = postSlice.reducer;
export const { setError } = postSlice.actions;
