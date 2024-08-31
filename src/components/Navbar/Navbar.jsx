/* eslint-disable react/prop-types */
import './Navbar.css'
import { assets } from '../../assets/assets'
import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { RiMenu2Fill } from "react-icons/ri";
import useAuth from '../../hooks/useAuth'
import api from '../../utils/axiosInstance'
import useData from '../../hooks/useData'

const Navbar = ({ setShowLogin, setExpand }) => {
    const [scrollToTop, setScrollToTop] = useState(false)
    const { getTotalCartAmount } = useData()
    const { user, logout } = useAuth()

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [scrollToTop]);

    const handleLogin = () => {
        setShowLogin(true)
        setScrollToTop(prev => !prev)
    }

    const handleLogout = async () => {
        try {
            await api.post('logout/')
            logout()
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className="navbar">
            <NavLink to={'/'} className={({ isActive }) => (isActive ? '' : '')}>
                <img src={assets.logo2} className="logo" alt="logo" />
            </NavLink>
            <nav className="navbar-menu">
                <NavLink
                    to="/"
                    className={({ isActive }) => (isActive ? 'active' : '')}
                >
                    Home
                </NavLink>
                <NavLink
                    to="/menu"
                    className={({ isActive }) => (isActive ? 'active' : '')}
                >
                    Menu
                </NavLink>
                <NavLink
                    to="/about"
                    className={({ isActive }) => (isActive ? 'active' : '')}
                >
                    About
                </NavLink>
                <NavLink
                    to="/contact"
                    className={({ isActive }) => (isActive ? 'active' : '')}
                >
                    Contact
                </NavLink>
            </nav>
            <div className="navbar-right">
                <div className="navbar-search-icon">
                    <NavLink
                        to="/cart"
                        className={({ isActive }) => (isActive ? '' : '')}
                    >
                        <img src={assets.basket_icon} alt="" />
                        <div className={getTotalCartAmount() && 'dot'}></div>
                    </NavLink>
                </div>
                {user ? (
                    <button onClick={handleLogout}>Log Out</button>
                ) : (
                    <button onClick={handleLogin}>Sign In</button>
                )}
                <RiMenu2Fill className="small-nav-btn" onClick={() => setExpand(true)} />
            </div>
        </div>
    )
}

export default Navbar