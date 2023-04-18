import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import { rootReducer } from "./rootReducer";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: rootReducer,
});

export type IStoreState = ReturnType<typeof rootReducer>;
export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<IStoreState> = useSelector;
