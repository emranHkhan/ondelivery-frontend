/* eslint-disable react/prop-types */
import { FaStar } from "react-icons/fa";
import styles from './ReviewDisplay.module.css';

const ReviewDisplay = ({ reviews }) => {
    return (
        <div className={styles.reviewContainer}>
            <h3 className={styles.reviewsTitle}>Customer Reviews</h3>
            {reviews.map((review) => (
                <div key={review.id} className={styles.reviewCard}>
                    <div className={styles.reviewHeader}>
                        <span className={styles.username}>{review.user}</span>
                        <div className={styles.rating}>
                            {[...Array(5)].map((_, index) => (
                                <FaStar
                                    key={index}
                                    className={index < review.rating ? styles.starFilled : styles.starEmpty}
                                />
                            ))}
                        </div>
                    </div>
                    <p className={styles.comment}>{review.comment}</p>
                    <span className={styles.date}>
                        {new Date(review.created_at).toLocaleDateString()}
                    </span>
                </div>
            ))}
        </div>
    );
};

export default ReviewDisplay;