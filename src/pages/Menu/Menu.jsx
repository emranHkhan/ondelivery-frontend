import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import FoodItem from '../../components/FoodItem/FoodItem';
import './Menu.css';
import useData from '../../hooks/useData';

const Menu = () => {
    const { foodItems, categories } = useData();
    const [searchTerm, setSearchTerm] = useState('');
    const { category } = useParams();
    const [isAsideVisible, setIsAsideVisible] = useState(false);

    useEffect(() => {
        setSearchTerm(category ?? '')
    }, [category]);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const filterFoodItems = (searchTerm) => {
        return foodItems.filter(foodItem =>
            foodItem.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            foodItem.restaurants.some(restaurant =>
                restaurant.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
    };

    let filteredFoodList = filterFoodItems(searchTerm);

    const toggleAside = () => {
        setIsAsideVisible(!isAsideVisible);
    };

    const handleCategoryClick = (catName) => {
        setSearchTerm(prev => prev === catName ? '' : catName);
        setIsAsideVisible(false);
    };

    console.log(filteredFoodList)


    return (
        <div className='menu' id='menu'>
            <input
                type='text'
                className="search-icon"
                placeholder='Enter food or restaurant name to search...'
                value={searchTerm}
                onChange={handleSearchChange}
                required
                autoFocus
            />
            <button className="toggle-aside" onClick={toggleAside}>
                {isAsideVisible ? 'Hide Categories' : 'Show Categories'}
            </button>
            <div className='menu-container-inner'>
                <aside className={isAsideVisible ? 'visible' : ''}>
                    <button className="close-aside" onClick={() => setIsAsideVisible(false)}>
                        &times;
                    </button>
                    <div>
                        {categories.map(cat => (
                            <div
                                onClick={() => handleCategoryClick(cat.name)}
                                key={cat.id}
                                className={`menu-categories ${cat.name === searchTerm ? 'selected-category' : ''}`}
                            >
                                <img src={cat.image_url} alt={cat.name} />
                                <p>{cat.name}</p>
                            </div>
                        ))}
                    </div>
                </aside>
                <div className="menu-items">
                    {filteredFoodList.length ? (
                        filteredFoodList.map((f) => (
                            <FoodItem
                                key={f.id}
                                id={f.id}
                                name={f.name}
                                description={f.description}
                                price={f.price}
                                image={f.image_url}
                                ingredients={f.ingredients}
                                tags={f.tags}
                                ratings={f.ratings}
                                dietaryInfo={f.dietary_info}
                                restaurants={f.restaurants}
                            />
                        ))
                    ) : (
                        <h2 className="no-food-found">
                            No Food Found
                        </h2>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Menu;