import { Link } from 'react-router-dom';
import '../styles/Header.scss'

const Header = () => {
    return (
        <div className="HeaderBox">
            <img className="Logo" alt='img' src="/Logo.png"></img>
            <Link to ='/' className='LogoName'>PARY<span className="RedColor">2</span>U</Link>
            <Link to='/signin' className='SignIn'>Sign-In</Link>
        </div>
    );
}

export default Header;