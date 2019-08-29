import React from 'react';
import PropTypes from 'prop-types';
import './Navbar.css';


const Navbar = ({onNewGame}) => {
    return(
        <nav className='navbar'>
            <a value='' href='/home' className='logo'>Memory Game</a>
            <ul className='main-nav' id='js-menu'>
            
                <li>
                    <a onClick={onNewGame} className='nav-links'>New Game</a>
                </li>
            </ul>
        </nav>
    )
}

Navbar.propTypes = {
    onNewGame: PropTypes.func.isRequired
} 

export default Navbar;