import React, { ChangeEvent, useState, KeyboardEvent } from 'react';
import './Search.css';
import BookList from '../Shared/BookList/BookList';
import useFetchBooks from '../../utils/Hooks/useFetchBooks';

const Search:React.FC = () => {
    const [inputValue, setInputValue] = useState('');
    const [triggerFetch, setTriggerFetch] = useState(false)
    const { bookList, loadState } = useFetchBooks(inputValue.trim(), triggerFetch);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>):void => {
        setTriggerFetch(false);
        setInputValue(e.target.value);
    }

    const handleSubmit: VoidFunction = ():void => {
        if (inputValue.trim() === ''){
            alert('Please input title!');
            return;
        }
        setTriggerFetch(true);
    }

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>):void => {
        if (e.key === 'Enter') handleSubmit(); 
    }

    const contentRender = ():React.ReactNode => {
        switch(loadState){
            case 'loaded':
                return <BookList bookList={bookList} resultType='search'/>;
            case 'loading':
                return <h3 className='book-list'>Finding your book...</h3>;
            case 'error':
                return <h3 className='book-list'>Something went wrong when finding you books. Try again later.</h3>;
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

export default Search;