/* eslint-disable react/prop-types */
import { FaMapMarkerAlt } from "react-icons/fa"
import { FaStar } from "react-icons/fa6"
import './RestaurantCard.css'

const RestaurantCard = ({ name, address, phone, is_active }) => {
    return (
        <div className="restaurant-card">
            <div className="restaurant-card-content">
                <h3 className="restaurant-name">{name}</h3>
                <p className="info">
                    <i className="fas fa-map-marker-alt"></i>
                    <span>{address}</span>
                </p>
                <p className="info"><FaMapMarkerAlt />{phone}</p>
                {/* will implement ratings later */}
                <div className="rating">
                    <div className="stars">
                        <FaStar />
                        <FaStar />
                        <FaStar />
                        <FaStar />
                        <FaStar />
                    </div>
                    <span className="rating-value">(4.5)</span>
                </div>
                <div>
                    <span className={`status ${is_active ? 'rs-active' : 'rs-inactive'}`}>{is_active ? 'Active' : 'Inactive'}</span>
                </div>
            </div>
        </div>
    )
}

export default RestaurantCard