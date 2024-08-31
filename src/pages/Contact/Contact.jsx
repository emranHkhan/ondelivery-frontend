import "./Contact.css"

const Contact = () => {
    const map = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3689.4290034229093!2d91.83218937589872!3d22.375179140176154!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30ad27f8024d5501%3A0xb226fa7719072195!2sOxygen%2C%20Chattogram!5e0!3m2!1sen!2sbd!4v1720974433202!5m2!1sen!2sbd" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"'
    return (
        <section className='contacts'>
            <div className='left row'>
                <iframe src={map}></iframe>
            </div>
            <div className='right'>
                <h1>Contact Us</h1>
                <p>We&apos;re open for any suggestion or just to have a chat</p>

                <div className='box-conatiner'>
                    <div className='box'>
                        <h4>ADDRESS:</h4>
                        <p>198 West 21th Street, Suite 721 New York NY 10016</p>
                    </div>
                    <div className='box'>
                        <h4>EMAIL:</h4>
                        <p> info@yoursite.com</p>
                    </div>
                    <div className='box'>
                        <h4>PHONE:</h4>
                        <p> + 1235 2355 98</p>
                    </div>
                </div>

                <form action='form-container'>
                    <div className=''>
                        <input type='text' placeholder='Name' />
                        <input type='email' placeholder='Email' />
                    </div>
                    <input type='text' placeholder='Subject' />
                    <textarea cols='30' rows='10' placeholder="Type Your Message">
                    </textarea>
                    <button className='contact'>SEND MESSAGE</button>
                </form>

                <h3>Follow us here</h3>
                <span>FACEBOOK TWITTER INSTAGRAM DRIBBBLE</span>
            </div>
        </section>
    )
}

export default Contact
