import React from 'react';
import { useSelector } from 'react-redux';
import BookList from '../Shared/BookList/BookList';

export default function WishList() {
    const wishedBooks = useSelector(state => state.wishlist.books);
    return (
        <BookList bookList={Object.values(wishedBooks)} resultType='wishlist'/>
    )
}
