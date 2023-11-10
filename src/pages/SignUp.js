import { useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import SignUpForm from '../components/SignUp/SignUpForm';
import Footer from '../components/Footer';

import '../styles/SignUp/SignUp.scss';
import { getCookie, tokenDecode } from '../util/auth';

const SignUp = () =>{
    
    const navigate = useNavigate();
    const [ isGuest, setIsGuest ] = useState(false);

    useEffect(()=>{
        const payload = tokenDecode(getCookie('accessToken'));
        if(payload){
            if(payload.role === 'ROLE_GUEST'){
                setIsGuest(true);
            }
        }
    },[]);

    if(!isGuest){
        navigate('/error');
    }
    return(
        <>
            <div className="SignInContainer">
                <div className="LeftBox">
                    <div className='LogoBox'>
                        <img src='./img/logo.png' alt='img'/>
                    </div>
                    <SignUpForm/>
                    <div className="BottomColor"/>
                </div>
                <img src='./img/signup_illustration.png' className='RightBox'/>
            </div>
            <Footer/>
        </>
    );   

}

export default SignUp;