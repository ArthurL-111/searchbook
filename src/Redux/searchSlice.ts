import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../utils/Types/reduxStateType";

export const searchBook = createAsyncThunk < ReturnType<any>, void, {state: RootState} > (
    'search/searchbook',
    async (_, thunkAPI) => {
        const { keyword } = thunkAPI.getState().search;
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${keyword}&startIndex=0&maxResults=20`)
                                    .then(res => res.json());
        return response;
    }
)

export const searchSlice = createSlice({
    name: "Search",
    initialState: {
        keyword: "",
        isLoading: "init", // [init, loading, loaded, error]
        searchedBooks: [],
    },
    reducers: {
        setKeyWord: (state, action) => {
            state.keyword = action.payload;
            console.log('keyword ', state.keyword);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(searchBook.pending, (state, action) => {
                state.isLoading = 'loading';
            })
            .addCase(searchBook.fulfilled, (state, action) => {
                console.log(action.payload);
                state.searchedBooks = action.payload.items;
                state.isLoading = 'loaded';
            })
            .addCase(searchBook.rejected, (state, action) => {
                state.isLoading = 'error';
            })
    }
});

export const { setKeyWord } = searchSlice.actions;