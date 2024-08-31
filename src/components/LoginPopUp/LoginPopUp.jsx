/* eslint-disable react/prop-types */
import { useState } from 'react'
import './LoginPopUp.css'
import { assets } from '../../assets/assets'
import api from '../../utils/axiosInstance'
import useAuth from '../../hooks/useAuth'

const LoginPopUp = ({ setShowLogin }) => {
    const [currState, setCurrState] = useState('login')
    const [username, setUsername] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState('user')
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const { login } = useAuth()

    const handleSubmit = async (e) => {
        e.preventDefault()

        const endpoint = currState === 'login' ? 'login/' : 'register/'
        const data = {
            username,
            first_name: firstName,
            last_name: lastName,
            email,
            password,
            role,
        }

        try {
            const response = await api.post(endpoint, data)

            console.log(response)
            login(response.data)

            setSuccess(currState === 'login' ? 'Login successful' : 'Signup successful')
            if (currState === 'login') {
                setShowLogin(false)
            }
            setError('')
        } catch (err) {
            setError(err.response?.data?.detail || 'Failed to authenticate')
            setSuccess('')
        }
    }

    return (
        <div className='login-popup'>
            <form onSubmit={handleSubmit} className="login-popup-container">
                <div className="login-popup-title">
                    <h2>{currState === 'login' ? 'Login' : 'Sign Up'}</h2>
                    <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />
                </div>
                <div>
                    {error && <p className="error-message">{error}</p>}
                    {success && <p className="success-message">{success}</p>}
                </div>
                <div className="login-popup-inputs">
                    {currState === 'signup' && (
                        <>
                            <input
                                type='text'
                                placeholder='Username'
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                            <input
                                type='text'
                                placeholder='First Name'
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                required
                            />
                            <input
                                type='text'
                                placeholder='Last Name'
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                required
                            />
                        </>
                    )}
                    <input
                        type="email"
                        placeholder='Your Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder='Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {currState === 'signup' && (
                    <div className="login-popup-condition">
                        <input
                            type="radio"
                            id="user"
                            name="role"
                            value="user"
                            checked={role === 'user'}
                            onChange={() => setRole('user')}
                        />
                        <label htmlFor="user">User</label>
                        <input
                            type="radio"
                            id="admin"
                            name="role"
                            value="admin"
                            checked={role === 'admin'}
                            onChange={() => setRole('admin')}
                        />
                        <label htmlFor="admin">Admin</label>
                    </div>
                )}
                <button type="submit">{currState === 'login' ? 'Login' : 'Sign Up'}</button>

                {currState === 'login' ? (
                    <p>Don&apos;t have an account? <span onClick={() => setCurrState('signup')}>Click Here</span></p>
                ) : (
                    <p>Already Have An Account? <span onClick={() => setCurrState('login')}>Login</span></p>
                )}
            </form>
        </div>
    )
}

export default LoginPopUp
