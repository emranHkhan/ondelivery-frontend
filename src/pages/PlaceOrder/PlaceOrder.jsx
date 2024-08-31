import './PlaceOrder.css';
import useData from '../../hooks/useData';
import useAuth from '../../hooks/useAuth';
import { useState } from 'react';
import api from '../../utils/axiosInstance';
import PaymentSuccess from '../../components/PaymentSuccess/PaymentSuccess';

const DELIVERY_FEE = 2;

const PlaceOrder = () => {
    const { getTotalCartAmount, cartItems, foodItems, setCartItems } = useData();
    const { user } = useAuth();
    const [showSuccessMsg, setShowSuccessMsg] = useState(false);
    const [errors, setErrors] = useState({});

    const cartDetails = Object.keys(cartItems).map(id => {
        const item = foodItems.find(food => food.id === parseInt(id));
        return {
            id: item.id,
            name: item.name,
            price: item.price,
            image_url: item.image_url,
            quantity: cartItems[id]
        };
    });

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        street: '',
        city: '',
        state: '',
        zipCode: '',
        country: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.firstName) newErrors.firstName = 'First name is required';
        if (!formData.lastName) newErrors.lastName = 'Last name is required';
        if (!formData.email) newErrors.email = 'Email is required';
        if (!formData.street) newErrors.street = 'Street is required';
        if (!formData.city) newErrors.city = 'City is required';
        if (!formData.state) newErrors.state = 'State is required';
        if (!formData.zipCode) newErrors.zipCode = 'Zip code is required';
        if (!formData.country) newErrors.country = 'Country is required';
        if (!formData.phone) newErrors.phone = 'Phone number is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        const address = {
            street: formData.street,
            city: formData.city,
            state: formData.state,
            zip_code: formData.zipCode,
            country: formData.country
        };

        const order = {
            first_name: formData.firstName,
            last_name: formData.lastName,
            email: formData.email,
            phone: formData.phone,
            address: address,
            subtotal: getTotalCartAmount(),
            delivery_amount: DELIVERY_FEE,
            items: cartDetails,
        };

        try {
            await api.post('orders/', order);
            setShowSuccessMsg(true);
            setCartItems({})
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <>
            <div className="place-order">
                <div className="place-order-left">
                    <div className="cart-total">
                        <h2>Cart Total</h2>
                        <div>
                            <div className="cart-total-details">
                                <p>Subtotal</p>
                                <p>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount()}</p>
                            </div>
                            <hr />
                            <div className="cart-total-details">
                                <p>Delivery Fee</p>
                                <p>${DELIVERY_FEE}</p>
                            </div>
                            <hr />
                            <div className="cart-total-details">
                                <b>Total</b>
                                <b>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + DELIVERY_FEE}</b>
                            </div>

                        </div>
                    </div>
                </div>
                <div className="place-order-right">
                    <h2>Delivery Information</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="multi-fields">
                            <div>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    placeholder="First Name"
                                />
                                {errors.firstName && <p className="error">{errors.firstName}</p>}
                            </div>
                            <div>
                                <input
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    placeholder="Last Name"
                                />
                                {errors.lastName && <p className="error">{errors.lastName}</p>}
                            </div>
                        </div>
                        <div>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Email Address"
                            />
                            {errors.email && <p className="error">{errors.email}</p>}
                        </div>
                        <div>
                            <input
                                type="text"
                                name="street"
                                value={formData.street}
                                onChange={handleChange}
                                placeholder="Street"
                            />
                            {errors.street && <p className="error">{errors.street}</p>}
                        </div>
                        <div className="multi-fields">
                            <div>
                                <input
                                    type="text"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                    placeholder="City"
                                />
                                {errors.city && <p className="error">{errors.city}</p>}
                            </div>
                            <div>
                                <input
                                    type="text"
                                    name="state"
                                    value={formData.state}
                                    onChange={handleChange}
                                    placeholder="State"
                                />
                                {errors.state && <p className="error">{errors.state}</p>}
                            </div>
                        </div>
                        <div className="multi-fields">
                            <div>
                                <input
                                    type="text"
                                    name="zipCode"
                                    value={formData.zipCode}
                                    onChange={handleChange}
                                    placeholder="Zip Code"
                                />
                                {errors.zipCode && <p className="error">{errors.zipCode}</p>}
                            </div>
                            <div>
                                <input
                                    type="text"
                                    name="country"
                                    value={formData.country}
                                    onChange={handleChange}
                                    placeholder="Country"
                                />
                                {errors.country && <p className="error">{errors.country}</p>}
                            </div>
                        </div>
                        <div>
                            <input
                                type="text"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="Phone"
                            />
                            {errors.phone && <p className="error">{errors.phone}</p>}
                        </div>
                        {!user ? (
                            <strong style={{ fontSize: '1.5rem', textAlign: 'center', display: 'block', marginTop: '30px', color: 'red' }}>
                                Please Sign In To Pay
                            </strong>
                        ) : <button type="submit">PROCEED TO PAYMENT</button>}
                    </form>
                </div>
            </div>
            {showSuccessMsg && <PaymentSuccess />}
        </>
    );
}

export default PlaceOrder;
