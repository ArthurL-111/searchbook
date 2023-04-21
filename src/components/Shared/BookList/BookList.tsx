import React, { useState } from 'react';
import useWishList from '../../../utils/Hooks/useWishList';
import InfoWindow from '../InfoWindow/InfoWindow';
import { Book } from '../../../utils/Types/bookType';
import './BookList.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../../utils/Types/reduxStateType';
import { swithPage } from '../../../Redux/searchSlice';
import { useAppDispatch } from '../../../Redux/store';

interface BookListProps {
    bookList: Book[],
    resultType: string,
}

interface DetailInfo {
    book?: Book;
}

const BookList:React.FC<BookListProps> = ({bookList, resultType}) => {
    const { wishedBookIds, handleAdd, handleDelete } = useWishList();
    const [isWindowOpen, setIsWindowOpen] = useState<boolean>(false);
    const [detailInfo, setDetailInfo] = useState<DetailInfo>({ book: undefined });
    const curPage = useSelector((state: RootState) => state.search.currentPageNum);
    const totalPage = useSelector((state: RootState) => state.search.totalPageNum);
    const dispatch = useAppDispatch()

    const openWindow = (book:Book):void => {
        setDetailInfo({
            book: book,
        });
        setIsWindowOpen(true);
    }

    const closeWindow:VoidFunction = ():void => {
        setIsWindowOpen(false);
    }

    const handlePageUp = () => {
        dispatch(swithPage(curPage + 1));
    }

    const handlePageDown = () => {
        dispatch(swithPage(curPage - 1));
    }

    return (
        <div className='book-list'>
            <InfoWindow 
                isOpen={isWindowOpen} 
                closeWindow={closeWindow} 
                bookInfo={detailInfo} 
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
                                        {book.volumeInfo.title?.trim()}
                                    </div>
                                </div>
                                <div className='book-author'>
                                    <div className='info-type'>Author</div>
                                    <div>
                                        {
                                            book.volumeInfo.authors ?
                                            book.volumeInfo.authors.map((author, index, arr) => (
                                                <span key={author}>
                                                    {author}{index < arr.length - 1 ? ', ' : ''}
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
                                    book.volumeInfo.industryIdentifiers 
                                        ? book.volumeInfo.industryIdentifiers.map((isbn) => (
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
                                {   
                                    resultType === 'search' 
                                        ? wishedBookIds.hasOwnProperty(book.id) 
                                            ? <button disabled>+</button> 
                                            : <button onClick={() => handleAdd(book)}>+</button> 
                                        : <button onClick={() => handleDelete(book.id)}>-</button>
                                }
                            </div>
                        </div>
                    ))
                : resultType === 'search' ? <h2>No books found.</h2> : <h2>You have not added any books to wishlist.</h2>
            }

            {
                resultType === 'search' 
                ? <div className='pagination'>
                    <button onClick={handlePageDown} disabled={curPage === 1 ? true : false}>prev</button>
                    <span>{curPage} / {totalPage}</span>
                    <button onClick={handlePageUp} disabled={curPage === totalPage ? true : false}>next</button>
                </div> 
                : null
            }
        </div>
    )
}

export default BookList;