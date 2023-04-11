import React, { useState } from 'react';
import './Search.css';
import BookList from '../Shared/BookList/BookList';
import useFetchBooks from '../../utils/Hooks/useFetchBooks';

export default function Search() {
    const [inputValue, setInputValue] = useState('');
    const [triggerFetch, setTriggerFetch] = useState(false)
    const { bookList, loadState } = useFetchBooks(inputValue.trim(), triggerFetch);

    const handleInputChange = (e) => {
        setTriggerFetch(false);
        setInputValue(e.target.value);
    }

    const handleSubmit = () => {
        if (inputValue.trim() === ''){
            alert('Please input title!');
            return;
        }
        setTriggerFetch(true);
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') handleSubmit(); 
    }

    return (
        <div className='search-page'>
            <div className='search-area'>
                <input name="book-search" value={inputValue} onKeyDown={handleKeyDown} onChange={handleInputChange}/>    
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