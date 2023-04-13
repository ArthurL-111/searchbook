export interface Book {
    id: string,
    volumeInfo: {
        title: string;
        imageLinks?: {
            thumbnail?: string,
        };
        authors?: string[];
        publisher?: string;
        publishedDate?: string,
        industryIdentifiers?: {
            type: string;
            identifier: string;
        }[];
        pageCount?: string;
        previewLink?: string;
        
    };
}