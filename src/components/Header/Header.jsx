import { Link } from 'react-router-dom'
import './Header.css'

const Header = () => {
    return (
        <div className='header'>
            <div className="header-contents">
                <h2>Order Your Favourit Food Here</h2>
                <p>Choose from a diverse menu featuring a delectable array of dishes carfted with the finest ingredients and culinary expertise. Our mission is to satisfy your cravings and elevate your dining experience, one delicious meal at a time.</p>
                <Link to={'/menu'}>
                    <button>View Menu</button>
                </Link>
            </div>
        </div>
    )
}

export default Header