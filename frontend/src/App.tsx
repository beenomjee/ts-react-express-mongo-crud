import React, { FC, useEffect } from "react";
import { CreateAndUpdatePost, ErrorPage, Home, Post } from "./modules";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { fetchPosts, useAppDispatch } from "./store";
const App: FC = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreateAndUpdatePost />} />
          <Route
            path="/update/:_id"
            element={<CreateAndUpdatePost isUpdate={true} />}
          />
          <Route path="/post/:slug" element={<Post />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
