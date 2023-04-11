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

    const contentRender = () => {
        switch(loadState){
            case 'loaded':
                return <BookList bookList={bookList} resultType='search'/>;
            case 'loading':
                return <h3 className='book-list'>Finding your book...</h3>;
            case 'error':
                return <h3 className='book-list'>Something went wrong when finding you books.</h3>;
            default:
                return null;
        }
    }

    return (
        <div className='search-page'>
            <div className='search-area'>
                <input name="book-search" value={inputValue} onKeyDown={handleKeyDown} onChange={handleInputChange}/>    
                <button onClick={handleSubmit}>GO</button>
            </div>
            {contentRender()}
        </div>
    )
}