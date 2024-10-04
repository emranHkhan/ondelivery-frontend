/* eslint-disable react/prop-types */
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
import Header from '../../components/Header/Header'
import './Home.css'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay'
import PopularRestaurants from '../../components/PopularRestaurants/PopularRestaurants'
import Review from '../../components/Review/Review'

const Home = ({ category, setCategory }) => {
    return (
        <div>
            <Header />
            <ExploreMenu setCategory={setCategory} />
            <FoodDisplay category={category} />
            <PopularRestaurants />
            <Review />
        </div>
    )
}

export default Home