import { useState, useEffect } from "react";

const useFetchBooks = (query:string, trigger:boolean) => {
    const [bookList, setBookList] = useState([]);
    const [loadState, setLoadState] = useState('init'); // [init, loading, loaded, error]

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