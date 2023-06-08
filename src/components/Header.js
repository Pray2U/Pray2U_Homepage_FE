import { Link } from 'react-router-dom';

import '../styles/Header.scss'

const Header = ({isLoggedIn, profile_url}) => {

    if(isLoggedIn){
        return (
            <div className="HeaderBox">
                <img className="Logo" alt='img' src="/Logo.png"></img>
                <Link to ='/' className='LogoName'>PARY<span className="RedColor">2</span>U</Link>
                <div className='MenuBox'>
                    <Link to='/notice' className='Notice'>Notice</Link>
                    <Link to='/event' className='Event'>Event</Link>
                    <Link to='/til' className='TIL'>TIL</Link>
                    <Link to='/shop' className='Shop'>Shop</Link>
                    <Link to='/mypage' className='Profile'>
                        <img src={profile_url}/>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="HeaderBox">
            <img className="Logo" alt='img' src="/Logo.png"></img>
            <Link to ='/' className='LogoName'>PARY<span className="RedColor">2</span>U</Link>
            <Link to='/signin' className='SignIn'>Sign-In</Link>
        </div>
    );
}

export default Header;