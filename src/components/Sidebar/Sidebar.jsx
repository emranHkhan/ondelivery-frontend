/* eslint-disable react/prop-types */
import { useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';
import { RiCloseLine } from "react-icons/ri";

const Sidebar = ({ expand, setExpand, setShowLogin }) => {
    const sidebarRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
                setExpand(false);
            }
        };

        if (expand) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [expand, setExpand]);

    return (
        <nav ref={sidebarRef} className={`sidebar ${expand ? 'show-sidebar' : 'hide-sidebar'}`}>
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
                <li onClick={() => setShowLogin(true)}>Sign in</li>
            </ul>
        </nav>
    );
};

export default Sidebar;
