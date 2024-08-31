import './FoodDetails.css'
import rating from '../../assets/rating_starts.png'
import { useLocation } from 'react-router-dom'
import useData from '../../hooks/useData'
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

const FoodDetails = () => {
    const { addToCart } = useData()
    const { state } = useLocation()
    const { id, name, price, description, image, ingredients, ratings, tags, dietaryInfo } = state

    return (
        <div className=''>
            <div className="image-container">
                <img src={image} alt="" />
                <div className="overlay">
                    <div className="image-text">{name}</div>
                </div>
            </div>
            <div className="item-details">
                <div className='item-image'>
                    <img src={image} alt="" />
                </div>
                <div className='item-info'>
                    <h3 className='item-name'>{name}</h3>
                    <p className='item-dietary-info'>{dietaryInfo.join(', ')}</p>
                    <p className='item-price'>${price}</p>
                    <div className='item-rating'>
                        <img src={rating} alt="" />
                        <span>({ratings})</span>
                    </div>
                    <div className='item-description'>
                        {description}
                    </div>
                    <div className='item-tags'>
                        <b>Tags: </b> {tags.join(', ')}
                    </div>
                    <div>
                        <b style={{ display: 'block', marginBottom: '5px' }}>Ingredients</b>
                        {
                            ingredients.map((i, index) => <p key={i}>{index + 1}. {i}</p>)
                        }
                    </div>
                    <div className='social'>
                        <FaFacebook className='icon' />
                        <FaTwitter className='icon' />
                        <FaInstagram className='icon' />
                    </div>
                    <button className='add-to-cart' onClick={() => addToCart(id)}>
                        Add To Cart
                    </button>
                </div>
            </div>
        </div>
    )
}

export default FoodDetails