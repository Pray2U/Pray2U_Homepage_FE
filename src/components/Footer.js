
import { Link } from 'react-router-dom';
import { AiFillGithub } from "react-icons/ai";

import '../styles/Footer/Footer.scss';

const Footer = () => {
    return(
        <div className="FooterContaier">
            <div className='FooterBox'>
                <div className='FooterTitleBox'>    
                    <img className='FooterLogo' alt='Logo_Image' src='img/logo_title.png'/>
                    <Link to='https://github.com/Pray2U' target="_blank" rel="noopener noreferrer" className='GithubLink'>
                        <AiFillGithub className='FooterGithubLogo'/>
                    </Link>
                </div>
                <div className='FooterContent'>
                    <p>We are "Pray2U". <br></br>
                        As a Closed non-profit developer community based at Hannam University in Deajeon South Korea,
                        <br></br>
                        we are working to network with developers and improve personal skills</p>
                    <ul>
                        <li>Contact Email : choihs980924@gmail.com </li>
                        <li>Lorem ipsum : ~~ </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Footer;