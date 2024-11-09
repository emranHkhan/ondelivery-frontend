import useData from "../../hooks/useData"
import ReviewCard from "../ReviewCard/ReviewCard"
import './Review.css'

const Review = () => {
    const { reviews } = useData()

    return (
        <div className="reviews">
            <h2>Reviews</h2>
            <div className="review-list">
                {
                    reviews.map((review) => <ReviewCard key={review.id} review={review} />)
                }
            </div>
        </div>
    )
}

export default Review