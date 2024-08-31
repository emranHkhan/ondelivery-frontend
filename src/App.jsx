import { Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar/Navbar"
import Home from "./pages/Home/Home"
import Cart from "./pages/Cart/Cart"
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder"
import Footer from "./components/Footer/Footer"
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

const App = () => {
  const [showLogin, setShowLogin] = useState(false)
  const [expand, setExpand] = useState(false)

  return (
    <>
      <DataProvider>
        <AuthProvider>
          {showLogin && <LoginPopUp setShowLogin={setShowLogin} />}
          {<Sidebar setExpand={setExpand} setShowLogin={setShowLogin} expand={expand} />}
          <div className="app">
            <Navbar setShowLogin={setShowLogin} setExpand={setExpand} />
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/order" element={<PlaceOrder />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/item/:id" element={<FoodDetails />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </div>
          <Footer />
        </AuthProvider>
      </DataProvider>
    </>
  )
}

export default App