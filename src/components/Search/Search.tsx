import React, { KeyboardEvent, useRef } from 'react';
import './Search.css';
import BookList from '../Shared/BookList/BookList';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../Redux/store';
import { RootState } from '../../utils/Types/reduxStateType';
import { setKeyWord, searchBook } from '../../Redux/searchSlice';

const Search:React.FC = () => {
    const inputRef = useRef<HTMLInputElement>(null);
    const bookList = useSelector((state: RootState) => state.search.searchedBooks);
    const loadState = useSelector((state: RootState) => state.search.isLoading);
    const dispatch = useAppDispatch();

    const handleSubmit: VoidFunction = ():void => {
        if (inputRef.current){
            const inputVal = inputRef.current.value.trim();
            if (inputVal.trim() === ''){
                alert('Please input title!');
                return;
            }
            dispatch(setKeyWord(inputVal));
            dispatch(searchBook());
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
                return <div className="lds-ripple"><div></div><div></div></div>;
            case 'error':
                return <h3 className='book-list'>Something went wrong when finding you books. Try again later.</h3>;
            default:
                return null;
        }
    }

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