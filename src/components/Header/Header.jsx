import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header () {
    const [isNavOpen, setIsNavOpen] = useState(false);
    const toggleNav = () => {
        setIsNavOpen(!isNavOpen);
    };
    const hideNav = () => {
        setIsNavOpen(false);
    }

    return (
        <header>
            <button className="nav-btn" onClick={toggleNav} >
                ☰
            </button>
            <div className={`nav-bar-wrapper ${isNavOpen ? 'open' : 'close'}`} onBlur={hideNav}>
                <div className='nav-bar'>
                    <li><Link to='/search' onClick={hideNav}>Search</Link></li>
                    <li><Link to='/wishlist' onClick={hideNav}>WishList</Link></li>
                </div>
            </div>
        </header>
    );
}

export default Header;