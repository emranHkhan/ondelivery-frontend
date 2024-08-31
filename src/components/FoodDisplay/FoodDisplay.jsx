/* eslint-disable react/prop-types */
import './FoodDisplay.css'
import FoodItem from '../FoodItem/FoodItem'
import useData from '../../hooks/useData'

const FoodDisplay = ({ category }) => {
    const { foodItems } = useData()

    return (
        <div className='food-display' id='food-display'>
            <h2>Top Dishes Near You</h2>
            <div className="food-display-list">
                {
                    foodItems
                        .filter(foodItem => category === "" || foodItem.category === category)
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
                            />
                        ))
                }
            </div>
        </div>
    )
}

export default FoodDisplay