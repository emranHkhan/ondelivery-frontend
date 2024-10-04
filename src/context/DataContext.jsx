import { createContext, useState, useEffect } from 'react';
import api from '../utils/axiosInstance';

const DataContext = createContext();

// eslint-disable-next-line react/prop-types
export const DataProvider = ({ children }) => {
    const [foodItems, setFoodItems] = useState([]);
    const [cartItems, setCartItems] = useState({});
    const [restaurants, setRestaruants] = useState([])
    const [categories, setCategories] = useState([])
    const [reviews, setReviews] = useState([])

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const [foodData, restaurantsData, categoryData, reviewsData] = await Promise.all([
                    api.get('fooditems/'),
                    api.get('restaurants/'),
                    api.get('categories/'),
                    api.get('reviews/'),
                ]);

                setFoodItems(foodData.data);
                setRestaruants(restaurantsData.data);
                setCategories(categoryData.data)
                setReviews(reviewsData.data)

            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const addToCart = (itemId) => {
        setCartItems((prev) => ({
            ...prev,
            [itemId]: (prev[itemId] || 0) + 1
        }));
    };

    const removeFromCart = (itemId) => {
        setCartItems((prev) => {
            const updatedCart = { ...prev };
            if (updatedCart[itemId] > 1) {
                updatedCart[itemId] -= 1;
            } else {
                delete updatedCart[itemId];
            }
            return updatedCart;
        });
    };

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                const itemInfo = foodItems.find(product => product.id === +item);
                if (itemInfo) {
                    totalAmount += itemInfo.price * cartItems[item];
                }
            }
        }
        return totalAmount;
    };

    const contextValue = {
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        foodItems,
        restaurants,
        categories,
        reviews,
        loading,
        error
    }

    return <DataContext.Provider value={contextValue}>{children}</DataContext.Provider>;
};

export default DataContext;