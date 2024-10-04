import { Link } from "react-router-dom"
import useData from "../../hooks/useData"
import RestaurantCard from "../RestaurantCard/RestaurantCard"
import './PopularRetaurants.css'
import { IoIosArrowRoundForward } from "react-icons/io"

const PopularRestaurants = () => {
    const { restaurants } = useData()

    return (
        <div className='popular-restaurants'>
            <h2>Top Restaurants</h2>
            <div className="popular-restaurants-list">
                {
                    restaurants.map(r => <RestaurantCard key={r.name} {...r} />)
                }
            </div>
            <div className="view-all-container">
                <Link to="/restaurants" className="view-all-link">
                    <span>View All Restaurants</span>
                    <IoIosArrowRoundForward className="arrow" />
                </Link>
            </div>
            <hr />
        </div>
    )
}

export default PopularRestaurants