import './FoodDisplay.css'
import FoodItem from '../FoodItem/FoodItem'
import useData from '../../hooks/useData'
import { Link } from 'react-router-dom'
import { IoIosArrowRoundForward } from "react-icons/io";

const FoodDisplay = () => {
    const { foodItems } = useData()

    return (
        <div className='food-display' id='food-display'>
            <h2>Top Dishes Near You</h2>
            <div className="food-display-list">
                {
                    foodItems
                        .map(f => (
                            <FoodItem
                                key={f.id}
                                id={f.id}
                                name={f.name}
                                description={f.description}
                                price={f.price}
                                image={f.image_url}
                                ingredients={f.ingredients}
                                tags={f.tags}
                                ratings={f.ratings}
                                dietaryInfo={f.dietary_info}
                                restaurants={f.restaurants}
                            />
                        ))
                }
            </div>
            <div className="view-all-container">
                <Link to="/menu" className="view-all-link">
                    <span>View All Dishes</span>
                    <IoIosArrowRoundForward className="arrow" />
                </Link>
            </div>
            <hr />
        </div>
    )
}

export default FoodDisplay