import React, { useEffect, useState } from 'react';
import useWishList from '../../../utils/Hooks/useWishList';
import './InfoWindow.css';
import { Book } from '../../../utils/Types/bookType';

interface InfoWindowProps {
    isOpen: boolean;
    closeWindow: VoidFunction;
    bookInfo: {
        book?: Book;
    };
};

interface BookDetail {
    title: string;
    imgLink?: string;
    publisher: string;
    publishDate: string;
    industryIdentifiers: any[];
    pageCount: string | number;
    previewLink?: string;
  }

const InfoWindow: React.FC<InfoWindowProps> = ({isOpen, closeWindow, bookInfo}) => {
    const { wishedBookIds, handleAdd } = useWishList();

    const [bookDetail, setBookDetail] = useState<BookDetail>({
        title: '',
        imgLink: undefined,
        publisher: 'No publisher info.',
        publishDate: 'No publish date.',
        industryIdentifiers: [],
        pageCount: 'No page count info.',
        previewLink: undefined,
    });

    useEffect (() => {
        if (!bookInfo.book || !bookInfo.book.volumeInfo) {
            return;
        }
        const tempInfo = {
            title: bookInfo.book.volumeInfo.title.trim(),
            imgLink: bookInfo.book.volumeInfo.imageLinks?.thumbnail || undefined,
            publisher: bookInfo.book.volumeInfo.publisher || 'No publisher info.',
            publishDate: bookInfo.book.volumeInfo.publishedDate || 'No publish date.',
            industryIdentifiers: bookInfo.book.volumeInfo.industryIdentifiers || [],
            pageCount: bookInfo.book.volumeInfo.pageCount || 'No page count info.',
            previewLink: bookInfo.book.volumeInfo.previewLink || undefined,
        }
        setBookDetail(tempInfo);
    }, [bookInfo]);

    const handleAddWindow = () => {
        if (bookInfo.book) handleAdd(bookInfo.book);
    }

    return (
        !isOpen ? null :
        <div className='window-overlay'>
            <div className='window-content'>
                <button className='close-btn' onClick={closeWindow}>X</button>
                <div className='info-img info-sec'>
                    <img src={bookDetail.imgLink} alt="" />
                </div>
                <div className='info-publisher info-sec'>
                    <span className='info-type-detail'>Publisher: </span>
                    <span>{bookDetail.publisher}</span>
                </div>
                <div className='info-publishdate info-sec'>
                    <span className='info-type-detail'>Publish Date: </span>
                    <span> {bookDetail.publishDate} </span>
                </div>
                <div className='info-pagecount info-sec'>
                    <span className='info-type-detail'>Page Count: </span>
                    <span>{bookDetail.pageCount}</span>
                </div>
                {
                    bookDetail.industryIdentifiers.map((id) => (
                        <div className='info-industryid info-sec' key={id.identifier}>
                            <span className='info-type-detail'> {id.type} </span>
                            <span> {id.identifier} </span>
                        </div>
                    ))
                }
                <div className='info-preview info-sec'>
                    <span className='info-type-detail'>Preview: </span>
                    <a href={bookDetail.previewLink} target="_blank" rel="noopener noreferrer">Click to preview</a>
                </div>
                {
                    wishedBookIds.hasOwnProperty(bookInfo.book?.id || '') 
                        ? <button className='wl-btn' disabled>Already in wish list</button> 
                        : <button className='wl-btn' onClick={handleAddWindow}>Add to WishList</button>
                }
            </div>
        </div>
    )
}

export default InfoWindow;