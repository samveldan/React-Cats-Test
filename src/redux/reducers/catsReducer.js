import { createSlice } from "@reduxjs/toolkit";

const cats = createSlice({
    name : "cats",
    initialState : {
        cats : [],
        favorites : [],
        currentPage : "home",
        isLoading : true
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
        },
        addToFavorite(state, action) {
            state.favorites.push(action.payload);
        },
        removeFromFavorite(state, action) {
            state.favorites = state.favorites.filter(i => {
                if(i.id !== action.payload.id) return i;
            })
        },
        setIsLoading(state, action) {
            state.isLoading = action.payload;
        }
    }
})

export const {setCats, setFavorites, setPage, addToFavorite, removeFromFavorite, setIsLoading} = cats.actions;
export default cats.reducer;