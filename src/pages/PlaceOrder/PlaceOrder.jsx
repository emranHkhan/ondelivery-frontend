import './PlaceOrder.css';
import useData from '../../hooks/useData';
import useAuth from '../../hooks/useAuth';
import { useState } from 'react';
import api from '../../utils/axiosInstance';
import PaymentSuccess from '../../components/PaymentSuccess/PaymentSuccess';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';

const DELIVERY_FEE = 2;

const CARD_ELEMENT_OPTIONS = {
    style: {
        base: {
            color: '#32325d',
            fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
            fontSmoothing: 'antialiased',
            fontSize: '16px',
            '::placeholder': {
                color: '#aab7c4'
            },
        },
        invalid: {
            color: '#fa755a',
            iconColor: '#fa755a'
        }
    }
};


const PlaceOrder = () => {
    const { getTotalCartAmount, cartItems, foodItems, setCartItems } = useData();
    const { user } = useAuth();
    const [showSuccessMsg, setShowSuccessMsg] = useState(false);
    const [errors, setErrors] = useState({});
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [cardError, setCardError] = useState(null)

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

    const modifiedCart = Object.keys(cartItems).map(key => ({
        id: +key,
        quantity: cartItems[key]
    }));

    const payload = modifiedCart
        .map(cartItem => {
            const foodItem = foodItems.find(item => item.id === cartItem.id);
            return foodItem ? { ...foodItem, quantity: cartItem.quantity } : null;
        })
        .filter(item => item !== null);

    const total = payload.reduce((acc, product) => acc + product.price * product.quantity, 0);

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

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!validateForm()) {
            return;
        }
        if (!stripe || !elements) {
            setError('Stripe has not been initialized.');
            return;
        }
        setLoading(true);
        setError(null);

        const orderData = {
            total_amount: total,
            items: payload.map(product => ({
                food_item: product.id,
                quantity: product.quantity
            })),
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            phone: formData.phone,
            street: formData.street,
            city: formData.city,
            state: formData.state,
            zipCode: formData.zipCode,
            country: formData.country
        };

        try {
            const orderResponse = await api.post('/orders/create/', orderData);
            const { client_secret, order_id } = orderResponse.data;

            const cardElement = elements.getElement(CardElement);

            if (!cardElement) {
                setError('Card information is not properly entered.');
                setLoading(false);
                return;
            }

            const result = await stripe.confirmCardPayment(client_secret, {
                payment_method: {
                    card: cardElement,
                },
            });

            if (result.error) {
                setError(result.error.message);
                setLoading(false);
                return;
            }

            const confirmResponse = await api.post('/orders/confirm-payment/', {
                order_id: order_id,
                payment_intent_id: result.paymentIntent.id,
            });

            const confirmedOrder = confirmResponse.data;
            console.log('Order confirmed:', confirmedOrder);
            setShowSuccessMsg(true);
            setCartItems({});
            setFormData({
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
            setLoading(false);

        } catch (error) {
            setError(error.response?.data?.error || 'An error occurred during checkout');
            console.error('Checkout error:', error);
            setLoading(false);
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
                        ) :
                            <>
                                <div className="card-element-container">
                                    <CardElement
                                        options={CARD_ELEMENT_OPTIONS}
                                        onChange={(event) => {
                                            if (event.error) {
                                                setCardError(event.error.message);
                                            } else {
                                                setCardError(null);
                                            }
                                        }}
                                    />
                                    {cardError && (
                                        <div className="error-message">
                                            {cardError}
                                        </div>
                                    )}
                                </div>
                                <button
                                    type="submit"
                                    disabled={!stripe || !elements || loading}
                                    className="submit-button"
                                >
                                    {loading ? 'Processing...' : 'Place Order'}
                                </button>
                                {error && (
                                    <div className="error-message">
                                        {error}
                                    </div>
                                )}
                            </>
                        }
                    </form>
                </div>
            </div>
            {showSuccessMsg && (
                <PaymentSuccess />
            )}
        </>
    );
};

export default PlaceOrder;
