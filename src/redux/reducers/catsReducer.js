import { createSlice } from "@reduxjs/toolkit";

const cats = createSlice({
    name : "cats",
    initialState : {
        cats : [],
        favorites : [],
        currentPage : "home"
    },
    reducers : {
        setCats(state, action) {
            state.cats = action.payload;
        },
        setFavorites(state, action) {
            state.favorites = action.payload;
        },
        setPage(state, action) {
            state.currentPage = action.payload;
        }
    }
})

export const {setCats, setFavorites, setPage} = cats.actions;
export default cats.reducer;