import { useSelector, useDispatch } from "react-redux";
import { addBook, deleteBook } from '../../Redux/store';


const useWishList = () => {
    const wishedBookIds = useSelector(state => state.wishlist.bookIds);
    const dispatch = useDispatch();

    const handleAdd = (book) => {
        dispatch(addBook(book));
    }

    const handleDelete = (id) => {
        dispatch(deleteBook(id));
    }

    return { wishedBookIds, handleAdd, handleDelete };
}

export default useWishList;