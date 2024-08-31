import { Link } from 'react-router-dom';
import './PaymentSuccess.css'
import { IoCheckmark } from "react-icons/io5";

const PaymentSuccess = () => {
    return (
        <div className='pay-success'>
            <div className="pay-success-container">
                <div>
                    <div className='check-icon'>
                        <IoCheckmark />
                    </div>
                    <p className='success'>Payment Succsessfull!</p>
                </div>
                <Link to={'/'} className='home-btn'>Home</Link>
            </div>
        </div>
    )
}

export default PaymentSuccess