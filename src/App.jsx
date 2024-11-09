import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home/Home"
import Cart from "./pages/Cart/Cart"
import { useState } from "react"
import LoginPopUp from "./components/LoginPopUp/LoginPopUp"
import Menu from "./pages/Menu/Menu"
import Contact from './pages/Contact/Contact'
import FoodDetails from "./pages/FoodDetails/FoodDetails"
import About from "./pages/About/About"
import Sidebar from "./components/Sidebar/Sidebar"
import { AuthProvider } from "./context/AuthContext"
import { DataProvider } from "./context/DataContext"
import ScrollToTop from "./components/ScrollToTop/ScrollToTop"
import Restaurant from "./pages/Restaurant/Restaurant"
import PublicLayout from "./components/Layouts/PublicLayout/PublicLayout"
import DashboardLayout from "./components/Layouts/DashboardLayout/DashboardLayout"
import Categories from "./pages/Dashboard/Categories/Categories"
import DashboardSummary from "./pages/Dashboard/DashboardSummary/DashboardSummary"
import CategoryCreate from "./pages/Dashboard/CategoryCreate/CategoryCreate"
import FoodItems from "./pages/Dashboard/FoodItems/FoodItems"
import Restaurants from "./pages/Dashboard/Restaurants/Restaurants"
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder"

const stripePromise = loadStripe('pk_test_51Ie8TMEsYXQrLzkYabVjvvNXN0QPDQ005C1kLJ8vH2UvasT3lpBFV1indNxdiAWnlAC5JoESnH1bT7ukRMDvPwqw00JY8S5Q5c');


const App = () => {
  const [showLogin, setShowLogin] = useState(false)
  const [expand, setExpand] = useState(false)
  const [category, setCategory] = useState("")

  return (
    <>
      <ScrollToTop />
      <DataProvider>
        <AuthProvider>
          {showLogin && <LoginPopUp setShowLogin={setShowLogin} />}
          {<Sidebar setExpand={setExpand} setShowLogin={setShowLogin} expand={expand} />}
          <div className="">
            <Routes>
              {/* Public Routes */}
              <Route element={<PublicLayout setShowLogin={setShowLogin} setExpand={setExpand} expand={expand} />}>
                <Route path="/" element={<Home category={category} setCategory={setCategory} />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/order" element={<Elements stripe={stripePromise}><PlaceOrder /></Elements>} />
                <Route path="/menu/:category?" element={<Menu category={category} />} />
                <Route path="/restaurants" element={<Restaurant />} />
                <Route path="/item/:id" element={<FoodDetails />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/about" element={<About />} />
              </Route>

              {/* Admin Dashboard Routes */}
              <Route path="/admin" element={<DashboardLayout />}>
                <Route index element={<DashboardSummary />} />

                {/* Category Routes */}
                <Route path="categories">
                  <Route index element={<Categories />} />
                  <Route path="create" element={<CategoryCreate />} />
                  {/* <Route path=":id/edit" element={<CategoryEdit />} /> */}
                </Route>

                {/* Food Item Routes */}
                <Route path="food-items">
                  <Route index element={<FoodItems />} />
                  {/* <Route path="create" element={<FoodItemCreate />} />
                  <Route path=":id/edit" element={<FoodItemEdit />} /> */}
                </Route>

                {/* Restaurant Routes */}
                <Route path="restaurants">
                  <Route index element={<Restaurants />} />
                  {/* <Route path="create" element={<RestaurantCreate />} />
                  <Route path=":id/edit" element={<RestaurantEdit />} /> */}
                </Route>
              </Route>
            </Routes>
          </div>
          {/* <Footer /> */}
        </AuthProvider>
      </DataProvider>
    </>
  )
}

export default App