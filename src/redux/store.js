import { configureStore } from "@reduxjs/toolkit";
import catsReducer from "./reducers/catsReducer";

export const store = configureStore({
    reducer : catsReducer
})