import { Link } from 'react-router-dom';

import { FaCamera } from "react-icons/fa";
import { FaLightbulb } from "react-icons/fa";
import { FaCalendarAlt } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";

import './NavBar.css'

function NavBar ({ pageTitle }) {
    return (
        <div className = 'nav'>
            <h2>JamPage</h2>
            <h1>{ pageTitle }</h1>
            <div className='nav-links'>
                <Link to='/media' className='nav-link'><FaCamera />Media</Link>
                <Link to='/ideas' className='nav-link'><FaLightbulb />Ideas</Link>
                <Link to='/schedule' className='nav-link'><FaCalendarAlt />Schedule</Link>
                <Link to='/join' className='nav-link'><FaPlus />Join</Link>
            </div>
        </div>
    );
}

export default NavBar;