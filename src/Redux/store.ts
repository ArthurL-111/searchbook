import { configureStore } from "@reduxjs/toolkit";
import { wishListSlice } from "./wishListSlice";
import { searchSlice } from "./searchSlice";
import { useDispatch } from 'react-redux'

const store = configureStore({
    reducer:{
        wishlist: wishListSlice.reducer,
        search: searchSlice.reducer
    },
});

export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch

export default store;