/* eslint-disable react/prop-types */
import { useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';
import { RiCloseLine } from "react-icons/ri";
import api from '../../utils/axiosInstance';
import useAuth from '../../hooks/useAuth';

const Sidebar = ({ expand, setExpand, setShowLogin }) => {
    const sidebarRef = useRef(null);
    const { user, logout } = useAuth()

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

    const handleLogout = async () => {
        try {
            await api.post('logout/')
            logout()
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <nav ref={sidebarRef} className={`sidebar ${expand ? 'show-sidebar' : 'hide-sidebar'}`}>
            <div className='close-btn' onClick={() => setExpand(false)}>
                <RiCloseLine />
            </div>
            <ul className='nav-link-container'>
                <li>
                    <NavLink
                        to="/"
                        className={({ isActive }) => (isActive ? 'nav-link active-link' : 'nav-link')}
                        onClick={() => setExpand(false)}
                    >
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/about"
                        className={({ isActive }) => (isActive ? 'nav-link active-link' : 'nav-link')}
                        onClick={() => setExpand(false)}
                    >
                        About
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/menu"
                        className={({ isActive }) => (isActive ? 'nav-link active-link' : 'nav-link')}
                        onClick={() => setExpand(false)}
                    >
                        Menu
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/contact"
                        className={({ isActive }) => (isActive ? 'nav-link active-link' : 'nav-link')}
                        onClick={() => setExpand(false)}
                    >
                        Contact
                    </NavLink>
                </li>

                {
                    user ? <li className='log-out-link' onClick={() => { setExpand(false); handleLogout() }}>Log Out</li> : <li className='sign-in-link' onClick={() => { setExpand(false); setShowLogin(true); }}>Sign In</li>
                }


            </ul>
        </nav>
    );
};

export default Sidebar;
