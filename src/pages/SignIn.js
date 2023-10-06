import '../styles/SignIn/SignIn.scss';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import SignInForm from '../components/SignIn/SignInForm';

const SignIn = () =>{
    const navigate = useNavigate();

    useEffect(()=>{
        let token = localStorage.getItem('accessToken');
        if(!token){
            navigate('/error');
        }
    },[]);

    return(
        <div className="SignInContainer">
            <div className="LeftBox">
                <div className='LogoBox'>
                    <img src='./logo.png' alt='img'/>
                </div>
                <SignInForm/>
                <div className="BottomColor"/>
            </div>
            <div className="RightBox"/>
        </div>
    );   

}

export default SignIn;