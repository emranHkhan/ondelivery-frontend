import './FoodDetails.css'
import rating from '../../assets/rating_starts.png'
import { useLocation } from 'react-router-dom'
import useData from '../../hooks/useData'
import useAuth from '../../hooks/useAuth'
import { FaFacebook, FaTwitter, FaInstagram, FaStar } from "react-icons/fa";
import { useEffect, useState } from 'react';
import api from '../../utils/axiosInstance'
import ReviewDisplay from '../../components/ReviewDisplay/ReviewDisplay'


const FoodDetails = () => {
    const { addToCart } = useData()
    const { user } = useAuth()
    const { state } = useLocation()
    const { id, name, price, description, image, ingredients, ratings, tags, dietaryInfo, restaurants } = state

    const [reviewText, setReviewText] = useState('');
    const [userRating, setUserRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [error, setError] = useState('');
    const [success, setsuccess] = useState('');
    const [reviews, setReviews] = useState([])


    const handleSubmitReview = async (e) => {
        e.preventDefault();

        try {
            const res = await api.post('reviews/', {
                comment: reviewText,
                rating: userRating,
                food_item: id
            })

            console.log(res)

            setsuccess('Review successfully submitted.')

        } catch (error) {
            if (error.response.data?.non_field_errors) {
                setError(error.response.data.non_field_errors[0])
            }
        }

        setReviewText('');
        setUserRating(0);
    };

    const availableRestaurants = restaurants.map(rs => rs.name)

    useEffect(() => {
        const getReviews = async () => {
            const res = await api.get('reviews/')
            setReviews(res.data)
        }

        getReviews()
    }, [success])


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
                    <div className='restaurants-item'>
                        <b>Available in: </b> {availableRestaurants.join(', ')}
                    </div>
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
            <div className="review-section">
                <h3>Reviews</h3>
                {user ? (
                    <form onSubmit={handleSubmitReview} className="review-form">
                        <div className="star-rating">
                            {[...Array(5)].map((star, index) => {
                                index += 1;
                                return (
                                    <button
                                        type="button"
                                        key={index}
                                        className={index <= (hover || userRating) ? "on" : "off"}
                                        onClick={() => setUserRating(index)}
                                        onMouseEnter={() => setHover(index)}
                                        onMouseLeave={() => setHover(userRating)}
                                    >
                                        <FaStar />
                                    </button>
                                );
                            })}
                        </div>
                        <textarea
                            value={reviewText}
                            onChange={(e) => setReviewText(e.target.value)}
                            placeholder="Write your review here..."
                            required
                        />
                        {error && <small style={{ color: 'red' }}>{error}</small>}
                        {success && <small style={{ color: 'green' }}>{success}</small>}
                        <button type="submit" className="submit-review">Submit Review</button>
                    </form>
                ) : (
                    <p>Please log in to leave a review.</p>
                )}
                {/* Here you would typically map through existing reviews and display them */}
                <ReviewDisplay reviews={reviews} />
            </div>
        </div>
    )
}

export default FoodDetails