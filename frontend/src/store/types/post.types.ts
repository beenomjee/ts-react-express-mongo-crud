interface IPost {
  _id: string;
  title: string;
  body: string;
  slug: string;
}

interface IPostState {
  posts: IPost[];
  isLoading: boolean;
  error: string;
}

interface IFetchResponse {
  status: string;
  posts: IPost[];
}

interface IRequestData {
  data: {
    title: string;
    body: string;
    slug: string;
  };
  callback: () => void;
}

export type { IFetchResponse, IRequestData, IPost, IPostState };
