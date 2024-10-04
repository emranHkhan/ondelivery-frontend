/* eslint-disable react/prop-types */
import { assets } from '../../assets/assets'
import './FoodItem.css'
import { FaArrowRight } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import useData from '../../hooks/useData';

const FoodItem = ({ id, name, price, description, image, ingredients, ratings, tags, dietaryInfo, restaurants }) => {
    const { cartItems, addToCart, removeFromCart } = useData()
    const navigate = useNavigate()

    const handleNavigate = () => {
        navigate(`/item/${id}`, { state: { id, name, price, description, image, ingredients, ratings, tags, dietaryInfo, restaurants } });
    }

    return (
        <div className='food-item'>
            <div className='food-item-img-container'>
                <div className="card">
                    <img src={image} alt={name} />
                </div>
                {
                    !cartItems[id] ? <img src={assets.add_icon_white} alt="add-item-to-cart" className='add' onClick={() => addToCart(id)} /> :
                        <div className='food-item-counter'>
                            <img onClick={() => removeFromCart(id)} src={assets.remove_icon_red} alt="" />
                            <p>{cartItems[id]}</p>
                            <img onClick={() => addToCart(id)} src={assets.add_icon_green} alt="" />
                        </div>
                }
            </div>
            <div className="food-item-info">
                <div className="food-item-name-rating">
                    <p>{name}</p>
                    <img src={assets.rating_starts} alt="ratings" />
                </div>
                <p className="food-item-description">
                    {description.slice(0, 90)}
                </p>
                <div className='food-item-details'>
                    <p className='food-item-price'>$ {price}</p>
                    <div className="right-arrow" onClick={handleNavigate}>
                        <FaArrowRight style={{ color: 'tomato' }} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FoodItem