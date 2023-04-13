import React from 'react';
import { useSelector } from 'react-redux';
import BookList from '../Shared/BookList/BookList';
import { RootState } from '../../utils/Types/reduxStateType';

export default function WishList() {
    const wishedBooks = useSelector((state: RootState) => state.wishlist.books);
    return (
        <BookList bookList={Object.values(wishedBooks)} resultType='wishlist'/>
    )
}
