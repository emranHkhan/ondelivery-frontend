import RestaurantCard from "../../components/RestaurantCard/RestaurantCard";
import useData from "../../hooks/useData"

const Restaurant = () => {
    const { restaurants } = useData()

    return (
        <>
            <h2 style={{ margin: '20px 0', color: 'tomato' }}>Restaurants</h2>
            <div className="restaurants">
                {
                    restaurants.map(r => <RestaurantCard key={r.id} {...r} />)
                }
            </div>
        </>
    )
}

export default Restaurant