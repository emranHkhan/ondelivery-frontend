import { useState } from "react";
import FoodItem from '../../components/FoodItem/FoodItem';
import './Menu.css';
import useData from "../../hooks/useData";

const Menu = () => {
    const { foodItems } = useData();
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredFoodList = foodItems.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className='menu' id='menu'>
            <input
                type='text'
                className="search-icon"
                placeholder='Search Your Favourite Food'
                value={searchTerm}
                onChange={handleSearchChange}
                required
                autoFocus
            />
            <div className="menu-items">
                {filteredFoodList.length > 0 ? (
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
                        />
                    ))
                ) : (
                    <h2 className="no-food-found">
                        No Food Found
                    </h2>
                )}
            </div>
        </div>
    );
};

export default Menu;
