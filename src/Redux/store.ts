import { createSlice, configureStore, PayloadAction } from "@reduxjs/toolkit";
import { Book } from "../utils/Types/bookType";
import { WishListState } from "../utils/Types/reduxStateType";

const initialState: WishListState = {
    books: {},
    bookCount: 0,
    bookIds: {},
}

export const wishListSlice = createSlice({
    name: 'WishList',
    initialState,
    reducers: {
        addBook: (state, action: PayloadAction<Book>) => {
            const bookToAdd = action.payload;
            const bookId = action.payload.id;

            if (!state.books.hasOwnProperty(bookId)) {
                state.books[bookId] = bookToAdd;
                state.bookCount += 1;
                state.bookIds[bookId] = true;
            }
        },
        deleteBook: (state, action: PayloadAction<string>) => {
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