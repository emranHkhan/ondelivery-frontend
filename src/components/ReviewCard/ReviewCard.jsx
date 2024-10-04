/* eslint-disable react/prop-types */
import { FaStar } from 'react-icons/fa6'
import './ReviewCard.css'

const ReviewCard = ({ review }) => {
    return (
        <div className="review-card">
            <div className="user-info">
                <img src="https://i.imgur.com/MK3eW3As.jpg" alt="User Avatar" className="avatar" />
                <div className="user-details">
                    <p className="user-name">{review.user}</p>
                    <p className="review-date">{review.created_at}</p>
                </div>
            </div>
            <div className="rating">
                {[...Array(5)].map((_, index) => (
                    <FaStar
                        key={index}
                        className={index < review.rating ? 'starFilled' : 'starEmpty'}
                    />
                ))}
            </div>
            <p className="review-text">
                {review.comment}
            </p>
        </div>
    )
}

export default ReviewCard