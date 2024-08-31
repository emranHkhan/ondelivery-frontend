import './About.css'
import { assets } from '../../assets/assets'

const About = () => {
    return (
        <div className='about'>
            <div className="image-container">
                <img src={assets.header_img} alt="" />
                <div className="overlay">
                    <div className="image-text">About Us</div>
                </div>
            </div>
            <div className='para'>
                <p>
                    At OneDelivery, we believe that great food should be just a click away. Our mission is to make delicious meals accessible to everyone, no matter where you are or what you are craving. Whether it’s your favorite local cuisine, a fast-food fix, or an indulgent gourmet experience, we’ve partnered with a wide array of restaurants to bring an incredible selection of food directly to your doorstep. From comfort food to healthy options, each meal is prepared with care and delivered with speed.
                </p>
                <p>
                    Our service isn’t just about convenience—it’s about creating connections through food. We’ve designed a seamless and intuitive platform that allows you to browse through an extensive range of restaurants, explore diverse menus, and place your order effortlessly. With our real-time order tracking feature, you can monitor your meal&aposs journey from the restaurant’s kitchen to your home, ensuring it arrives hot and fresh. We take pride in offering a reliable, fast, and user-friendly experience that makes food delivery more enjoyable.
                </p>
                <p>
                    At OneDelivery, customer satisfaction is our top priority. We strive to offer not only delicious food but also exceptional service. Our dedicated support team is available to assist you at every step of the way, and our delivery partners work diligently to bring your food directly to you, exactly as you want it. Whether you’re dining solo, feeding your family, or hosting a gathering, OneDelivery is committed to making every meal a memorable experience. Your cravings, our delivery—anytime, anywhere.
                </p>
            </div>
        </div>
    )
}

export default About