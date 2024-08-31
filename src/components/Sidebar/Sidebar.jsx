/* eslint-disable react/prop-types */
import { NavLink } from 'react-router-dom';
import './Sidebar.css'
import { RiCloseLine } from "react-icons/ri";

const Sidebar = ({ expand, setExpand, setShowLogin }) => {
    return (

        <nav className={`sidebar ${expand ? 'show-sidebar' : 'hide-sidebar'}`}>
            <RiCloseLine className='close-btn' onClick={() => setExpand(false)} />
            <ul onClick={() => setExpand(false)}>
                <li>
                    <NavLink
                        to="/"
                        className={({ isActive }) => (isActive ? 'active-link' : '')}
                    >
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/about"
                        className={({ isActive }) => (isActive ? 'active-link' : '')}
                    >
                        About
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/menu"
                        className={({ isActive }) => (isActive ? 'active-link' : '')}
                    >
                        Menu
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/contact"
                        className={({ isActive }) => (isActive ? 'active-link' : '')}
                    >
                        Contact
                    </NavLink>
                </li>
                <li onClick={() => setShowLogin(true)}>sign in</li>
            </ul>
        </nav>
    )
}

export default Sidebar