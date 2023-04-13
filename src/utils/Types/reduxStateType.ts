import { Book } from "./bookType";

export interface WishListState {
    books: { [key: string]: Book },
    bookCount: number,
    bookIds: { [key: string]: boolean }
};

export interface RootState {
    wishlist: WishListState;
};