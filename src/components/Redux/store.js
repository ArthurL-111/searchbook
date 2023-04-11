import { createSlice, configureStore } from "@reduxjs/toolkit";

export const wishListSlice = createSlice({
    name: 'WishList',
    initialState: {
        books: {},
        bookCount: 0,
        bookIds: {},
    },
    reducers: {
        addBook: (state, action) => {
            const bookToAdd = action.payload;
            const bookId = action.payload.id;

            if (!state.books.hasOwnProperty(bookId)) {
                state.books[bookId] = bookToAdd;
                state.bookCount += 1;
                state.bookIds[bookId] = true;
            }
        },
        deleteBook: (state, action) => {
            const bookIdToDelete = action.payload;

            if (state.books.hasOwnProperty(bookIdToDelete)) {
                delete state.books[bookIdToDelete];
                delete state.bookIds[bookIdToDelete];
                state.bookCount -= 1;
            }
        }
    },
});

export const {addBook, deleteBook} = wishListSlice.actions;

export default configureStore({
    reducer:{
        wishlist: wishListSlice.reducer,
    },
});