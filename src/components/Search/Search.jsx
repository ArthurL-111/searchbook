import React, { useState } from 'react';
import './Search.css';
import BookList from '../Shared/BookList/BookList';

export default function Search(props) {
    const [inputValue, setInputValue] = useState('');
    const [bookList, setBookList] = useState([]);
    const [loadState, setLoadState] = useState('init'); // [init, loading, loaded]
    
    const handleInputChange = (e) => {
        e.preventDefault();
        setInputValue(e.target.value);
    }

    const handleSubmit = () => {
        if (inputValue.trim() === ''){
            alert('Please input title!');
            setLoadState('init');
            return;
        }
        setLoadState('loading');
        const query = encodeURIComponent(inputValue);
        const queryURL = `https://www.googleapis.com/books/v1/volumes?q=${query}&startIndex=0&maxResults=20`;
        fetch(queryURL)
            .then((res) => res.json())
            .then((data) => {
                setBookList(data.items);
                setLoadState('loaded');
            })
            .catch((err) => console.log(`Query err: ${err}`));
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') handleSubmit(); 
    }

    return (
        <div className='search-page'>
            <div className='search-area'>
                <input name="book-search" value={inputValue} onChange={handleInputChange} onKeyDown={handleKeyDown}/>    
                <button onClick={handleSubmit}>GO</button>
            </div>
            {
                loadState === 'loaded' 
                    ? <BookList bookList={bookList} resultType='search'/> 
                    : loadState === 'loading' 
                        ? <div>Finding your book...</div>
                        : null
            }
        </div>
    )
}