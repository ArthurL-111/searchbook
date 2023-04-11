import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header () {
    const [isNavOpen, setIsNavOpen] = useState(false);
    const toggleNav = () => {
        setIsNavOpen(!isNavOpen);
    };

    return (
        <header>
            <button className="nav-btn" onClick={toggleNav}>
                ☰
            </button>
            <div className={`nav-bar ${isNavOpen ? 'open' : 'close'}`}>
                <li><Link to='/search'>Search</Link></li>
                <li><Link to='/wishlist'>WishList</Link></li>
            </div>
        </header>
    );
}

export default Header;