import { useSelector, useDispatch } from "react-redux";
import { addBook, deleteBook } from '../../Redux/store';
import { RootState } from "../Types/reduxStateType";
import { Book } from "../Types/bookType";

interface UseWishListReturnType {
    wishedBookIds: { [key: string]: boolean };
    handleAdd: (book: Book) => void;
    handleDelete: (id: string) => void;
}

const useWishList = (): UseWishListReturnType => {
    const wishedBookIds = useSelector((state: RootState) => state.wishlist.bookIds);
    const dispatch = useDispatch();

    const handleAdd = (book: Book) => {
        dispatch(addBook(book));
    }

    const handleDelete = (id: string) => {
        dispatch(deleteBook(id));
    }

    return { wishedBookIds, handleAdd, handleDelete };
}

export default useWishList;