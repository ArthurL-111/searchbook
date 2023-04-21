/*
**********************************************
    This file is not being used anymore
**********************************************
*/

import { useState, useEffect } from "react";
import { Book } from "../Types/bookType";

interface UseFetchBooksReturnType {
    bookList: Book[];
    loadState: string;
}

const useFetchBooks = (query:string, trigger:boolean): UseFetchBooksReturnType => {
    const [bookList, setBookList] = useState<Book[]>([]);
    const [loadState, setLoadState] = useState<string>('init'); // [init, loading, loaded, error]

    useEffect(() => {
        if (!query) return;
        if (trigger) {
            setLoadState('loading');
            const queryVal = encodeURIComponent(query);
            const queryURL = `https://www.googleapis.com/books/v1/volumes?q=${queryVal}&startIndex=0&maxResults=20`;
            fetch(queryURL)
                .then((res) => res.json())
                .then((data) => {
                    setBookList(data.items);
                    setLoadState('loaded');
                })
                .catch((err) => {
                    console.log(`Query err: ${err}`)
                    setLoadState('error')
                });
        }

        return () => {        // cleanup function, called when unmounted or dependicies updated
            setBookList([]);
            setLoadState("init");
        };
    }, [query, trigger]);

    return { bookList, loadState }
}

export default useFetchBooks;