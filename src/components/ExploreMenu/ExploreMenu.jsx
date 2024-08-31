/* eslint-disable react/prop-types */
import './ExploreMenu.css'
import useData from '../../hooks/useData'

const ExploreMenu = ({ category, setCategory }) => {
    const { foodItems } = useData()

    const categories = Array.from(new Set(foodItems.map(item => item.category))).slice(0, 8).map(category => {
        const item = foodItems.find(item => item.category === category);
        return { category: item.category, image_url: item.image_url };
    });

    return (
        <div className='explore-menu' id='explore-menu'>
            <h1>Explore Our Menu</h1>
            <p className='explore-menu-text'>
                Choose from a diverse menu featuring a delectable array of dishes. Our mission is to satisfy your cravings and elevate your dining experience, one delicious meal at a time
            </p>
            <div className="explore-menu-list">
                {
                    categories.map((cat) => {
                        return (
                            <div key={cat.category} onClick={() => setCategory(prev => prev === cat.category ? "" : cat.category)} className='explore-menu-list-item'>
                                <img src={cat.image_url} alt={cat.name} className={category === cat.category ? "active" : ""} />
                                <p>{cat.category}</p>
                            </div>
                        )
                    })
                }
            </div>
            <hr />
        </div>
    )
}

export default ExploreMenu