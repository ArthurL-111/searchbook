import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../utils/Types/reduxStateType";

export const searchBook = createAsyncThunk < ReturnType<any>, void, {state: RootState} > (
    'search/searchbook',
    async (_, thunkAPI) => {
        const { keyword, currentPageNum, itemsPerPage } = thunkAPI.getState().search;
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${keyword}&startIndex=${(currentPageNum - 1) * itemsPerPage}&maxResults=${itemsPerPage}`)
                                    .then(res => res.json());
        return response;
    }
)

export const swithPage = createAsyncThunk < ReturnType<any>, number, {state: RootState} > (
    'search/switchpage',
    async (newPageNum, thunkAPI) => {
        const { keyword, itemsPerPage } = thunkAPI.getState().search;
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${keyword}&startIndex=${(newPageNum - 1) * itemsPerPage}&maxResults=${itemsPerPage}`)
                                    .then(res => res.json());
        return {response, newPageNum};
    }
)

export const searchSlice = createSlice({
    name: "Search",
    initialState: {
        keyword: "",
        isLoading: "init", // [init, loading, loaded, error]
        searchedBooks: [],
        currentPageNum: 1,
        totalPageNum: 1,
        itemsPerPage: 10,
    },
    reducers: {
        setKeyWord: (state, action) => {
            state.keyword = action.payload;
            state.currentPageNum = 1;
            state.totalPageNum = 1;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(searchBook.pending, (state, _) => {
                state.isLoading = 'loading';
            })
            .addCase(searchBook.fulfilled, (state, action) => {
                state.searchedBooks = action.payload.items;
                state.totalPageNum = Math.ceil(action.payload.totalItems / state.itemsPerPage);
                state.isLoading = 'loaded';
            })
            .addCase(searchBook.rejected, (state, _) => {
                state.isLoading = 'error';
            })
            .addCase(swithPage.pending, (state, _) => {
                state.isLoading = 'loading';
            })
            .addCase(swithPage.fulfilled, (state, action) => {
                state.searchedBooks = action.payload.response.items;
                state.currentPageNum = action.payload.newPageNum;
                state.isLoading = 'loaded';
            })
            .addCase(swithPage.rejected, (state, _) => {
                state.isLoading = 'error';
            })
    }
});

export const { setKeyWord } = searchSlice.actions;