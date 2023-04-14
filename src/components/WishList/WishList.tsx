import { useSelector } from 'react-redux';
import BookList from '../Shared/BookList/BookList';
import { RootState } from '../../utils/Types/reduxStateType';

const WishList = () => {
    const wishedBooks = useSelector((state: RootState) => state.wishlist.books);
    return (
        <BookList bookList={Object.values(wishedBooks)} resultType='wishlist'/>
    )
}

export default WishList
