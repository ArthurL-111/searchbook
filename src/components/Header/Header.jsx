import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header () {
    return (
        <header>
            <div className='nav-bar'>
                <li><Link to='/search'>Search</Link></li>
                <li><Link to='/wishlist'>WishList</Link></li>
            </div>
        </header>
    );
}

export default Header;