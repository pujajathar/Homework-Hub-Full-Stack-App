import './Footer.css';
import facebook from "../../assets/images/facebook.png";
import linkedin from "../../assets/images/linkedin.png";
function Footer() {
    const year = new Date().getFullYear();
    return (
        <footer className="site-footer">
            <div className='footer-inner'>
                <p>
                    &copy; {year} <span>AaruEdu Homework Hub. All rights reserved. </span> 🌱 Learn. Grow. Achieve.📚
                </p>
                <nav className='footer-links'>
                    <a 
                    href={facebook}
                    target='_blank'
                    rel='noopener noreferrer'
                    >
                    Facebook
                    </a>  
                    |
                    <a 
                    href={linkedin}
                    target='_blank'
                    rel='noopener noreferrer'
                    >
                    LinkedIn 
                    </a> 
                </nav>   
                <div className='contact'>
                    <h4> Contact </h4>
                    <p>📍 AaruEdu HQ</p>
                    <p>123 Future Path</p>
                    <p>St. Louis, MO 63456</p>
                    <p>💙 Support: support@aaruedu.com</p>          
                </div>
            </div>  
        </footer>
    );
};
export default Footer;