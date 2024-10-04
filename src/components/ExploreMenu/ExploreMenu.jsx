/* eslint-disable react/prop-types */
import './ExploreMenu.css'
import useData from '../../hooks/useData'
import { Link } from 'react-router-dom'
import { IoIosArrowRoundForward } from 'react-icons/io'

const ExploreMenu = ({ setCategory }) => {
    const { categories } = useData()

    return (
        <div className='explore-menu' id='explore-menu'>
            <h2>Explore Our Menu</h2>
            <p className='explore-menu-text'>
                Choose from a diverse menu featuring a delectable array of dishes. Our mission is to satisfy your cravings and elevate your dining experience, one delicious meal at a time
            </p>
            <div className="explore-menu-list">
                {
                    categories.map((cat) => {
                        return (
                            <Link to={`/menu/${cat.name}`} key={cat.name} className='explore-menu-list-item' onClick={() => setCategory(cat.name)}>
                                <img src={cat.image_url} alt={cat.name} />
                                <p>{cat.name}</p>
                            </Link>
                        )
                    })
                }
            </div>
            <div className="view-all-container">
                <Link to="/menu" className="view-all-link">
                    <span>View All Categories</span>
                    <IoIosArrowRoundForward className="arrow" />
                </Link>
            </div>
            <hr />
        </div>
    )
}

export default ExploreMenu