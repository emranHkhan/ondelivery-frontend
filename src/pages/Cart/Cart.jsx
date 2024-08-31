import './Cart.css'
import { useNavigate } from 'react-router-dom'
import useData from '../../hooks/useData'
import { useEffect } from 'react'

const Cart = () => {
    const { cartItems, foodItems, removeFromCart, getTotalCartAmount } = useData()
    const navigate = useNavigate()

    useEffect(() => {
        if (Object.keys(cartItems).length === 0) {
            navigate('/');
        }
    }, [cartItems, navigate])

    return (
        <div className='cart'>
            <div className="cart-items">
                <div className="cart-items-title">
                    <p>Items</p>
                    <p>Title</p>
                    <p>Price</p>
                    <p>Quantity</p>
                    <p>Total</p>
                    <p>Remove</p>
                </div>
                <br />
                <hr />
                {
                    foodItems.map((item) => {
                        if (cartItems[item.id] > 0) {
                            return (
                                <div key={item.id}>
                                    <div className="cart-items-title cart-items-item">
                                        <img src={item.image_url} alt="" />
                                        <p>{item.name}</p>
                                        <p>{item.price}</p>
                                        <p>{cartItems[item.id]}</p>
                                        <p>{item.price * cartItems[item.id]}</p>
                                        <p className='cross' onClick={() => removeFromCart(item.id)}>-</p>
                                    </div>
                                    <hr />
                                </div>
                            )
                        }
                    })
                }
            </div>
            <div className="cart-bottom">
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
                            <p>${2}</p>
                        </div>
                        <hr />
                        <div className="cart-total-details">
                            <b>Total</b>
                            <b>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</b>
                        </div>
                        <button onClick={() => navigate('/order')}>PROCEED TO CHECKOUT</button>
                    </div>
                </div>
                <div className="cart-promocode">
                    <div>
                        <p>If you have a promo code, Enter it here</p>
                        <div className="cart-promocode-input">
                            <input type="text" placeholder='promo code' />
                            <button>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart