/* eslint-disable react/prop-types */
import { Outlet } from "react-router-dom"
import Navbar from "../../Navbar/Navbar"
import Footer from "../../Footer/Footer"

const PublicLayout = ({ setShowLogin, setExpand, expand }) => {
    return (
        <>
            <div className="app">
                <Navbar setShowLogin={setShowLogin} setExpand={setExpand} expand={expand} />
                <Outlet />
            </div>
            <Footer />
        </>
    )
}

export default PublicLayout