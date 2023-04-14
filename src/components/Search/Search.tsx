import React, { useState, KeyboardEvent, useEffect, useRef } from 'react';
import './Search.css';
import BookList from '../Shared/BookList/BookList';
import useFetchBooks from '../../utils/Hooks/useFetchBooks';

const Search:React.FC = () => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [inputValue, setInputValue] = useState<string>('');
    const [triggerFetch, setTriggerFetch] = useState<boolean>(false);
    const { bookList, loadState } = useFetchBooks(inputValue, triggerFetch);

    const handleSubmit: VoidFunction = ():void => {
        if (inputRef.current){
            const inputVal = inputRef.current.value.trim();
            if (inputVal.trim() === ''){
                alert('Please input title!');
                return;
            }
            setInputValue(inputVal);
            setTriggerFetch(true);
        }
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

    useEffect(() => {
        console.log(loadState);
    }, [loadState])

    return (
        <div className='search-page'>
            <div className='search-area'>
                <input ref={inputRef} name="book-search" onKeyDown={handleKeyDown} />    
                <button onClick={handleSubmit}>GO</button>
            </div>
            {contentRender()}
        </div>
    )
}

export default Search;