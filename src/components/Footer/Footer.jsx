import './Footer.css'
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <div className='footer' id='footer'>
            <div className="footer-content">
                <div className="footer-content-left">
                    <img className='logo' src={assets.logo2} alt="" />
                    <p>Choose from a diverse menu featuring a delectable array of dishes carfted with the finest ingredients and culinary expertise. Our mission is to satisfy your cravings and elevate your dining experience, one delicious meal at a time.</p>
                    <div className="footer-social-icons">
                        <img src={assets.facebook_icon} alt="facebook-icon" />
                        <img src={assets.twitter_icon} alt="twitter-icon" />
                        <img src={assets.linkedin_icon} alt="linkedin-icon" />
                    </div>
                </div>
                <div className="footer-content-center">
                    <h2>COMPANY</h2>
                    <ul>
                        <li>
                            <Link to={'/'}>Home</Link>
                        </li>
                        <li>
                            <Link to={'/about'}>About Us</Link>
                        </li>
                        <li>
                            <Link to={'/contact'}>Contact Us</Link>
                        </li>
                    </ul>
                </div>
                <div className="footer-content-right">
                    <h2>GET IN TOUCH</h2>
                    <ul>
                        <li>+4232323232</li>
                        <li>onedelivery@mail.com</li>
                    </ul>
                </div>
            </div>
            <hr />
            <p className='footer-copyright'>Copyright {(new Date).getFullYear()} &copy; Onedelivery.com - All Rights Reserved.</p>
        </div>
    )
}

export default Footer