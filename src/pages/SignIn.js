import '../styles/SignIn/SignIn.scss';

import SignInForm from '../components/SignIn/SignInForm';

const SignIn = () =>{
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