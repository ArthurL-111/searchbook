import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addBook, deleteBook } from '../../../Redux/store';
import InfoWindow from '../InfoWindow/InfoWindow';
import './BookList.css';

export default function BookList({bookList, resultType}) {
    const dispatch = useDispatch();
    const wishedBookIds = useSelector(state => state.wishlist.bookIds);
    const [isWindowOpen, setIsWindowOpen] = useState(false);
    const [detailInfo, setDetailInfo] = useState({});

    const handleAdd = (book) => {    
        dispatch(addBook(book));
    }

    const handleDelete = (id) => {
        dispatch(deleteBook(id));
    }

    const openWindow = (book) => {
        setDetailInfo({
            book: book,
            isInWishList: wishedBookIds.hasOwnProperty(book.id),
        });
        setIsWindowOpen(true);
    }

    const closeWindow = () => {
        setIsWindowOpen(false);
    }

    return (
        <div className='book-list'>
            <InfoWindow 
                isOpen={isWindowOpen} 
                closeWindow={closeWindow} 
                bookInfo={detailInfo} 
                handleAdd={handleAdd} 
                handleDelete={handleDelete}
            />
            {
                bookList && bookList.length !== 0
                ? bookList.map(book => (
                        <div className='book-item' key={book.id}>
                            <div className='book-thumbnail' onClick={() => openWindow(book)}>
                                {
                                    book.volumeInfo.imageLinks ? <img src={book.volumeInfo.imageLinks.thumbnail} alt="" />
                                                                         : <span>No Image</span>   
                                }
                                
                            </div>
                            <div className='book-info'>
                                <div className='book-title'>
                                    <div className='info-type'>Title</div>
                                    <div>
                                        {book.volumeInfo.title.trim()}
                                    </div>
                                </div>
                                <div className='book-auther'>
                                    <div className='info-type'>Auther</div>
                                    <div>
                                        {
                                            book.volumeInfo.author ?
                                            book.volumeInfo.authors.map((author) => (
                                                <span key={author}>
                                                    {author}
                                                </span>
                                            )) : <span>N/A</span>
                                        }
                                    </div>
                                </div>
                                <div className='book-publisher'>
                                    <div className='info-type'>Publisher</div>
                                    <div>
                                        {book.volumeInfo.publisher ? book.volumeInfo.publisher : 'N/A'}
                                    </div>
                                </div>
                                <div className='book-year'>
                                    <div className='info-type'>Publish Date</div>
                                    <div>
                                        {book.volumeInfo.publishedDate ? book.volumeInfo.publishedDate : 'N/A'}
                                    </div>
                                </div>
                                {
                                    book.volumeInfo.industryIdentifiers ?
                                    book.volumeInfo.industryIdentifiers.map((isbn) => (
                                        <div className='book-isbn' key={isbn.identifier}>
                                            <div className='info-type'>{isbn.type}</div>
                                            <div>
                                                {isbn.identifier}
                                            </div>
                                        </div>
                                    )) : null
                                }
                            </div>
                            <div className='book-ops'>
                                {   resultType === 'search' 
                                    ? wishedBookIds.hasOwnProperty(book.id) ? <button disabled>+</button> : <button onClick={() => handleAdd(book)}>+</button> 
                                    : <button onClick={() => handleDelete(book.id)}>-</button>
                                }
                            </div>
                        </div>
                    ))

                : resultType === 'search' ? <h2>No books found.</h2> : <h2>You have not added any books to wishlist.</h2>
            }
        </div>
    )
}
