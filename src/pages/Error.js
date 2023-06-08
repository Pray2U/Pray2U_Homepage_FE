import { Link } from 'react-router-dom';

import '../styles/Error.scss';

const Error = () => {

    const errorData = {
        code: 404,
        message: "Oops Error Page..! Something went Wrong!" 
    };

    return(
            <div className='ScreenBox'>
                <div className='ErrorBox'>
                    <img className='ImageBox' src='/logo.png' alt='Img'/>
                    <p className='StatusCode'>{errorData.code}</p>
                    <p className='ErrorMessage'>{errorData.message}</p>
                    <button className='Button'>
                        <Link to='/' className='ButtonText'>
                            Go to the Page
                        </Link>
                    </button>
                </div>
                <div className='ErrorFooter'>
                    If you want to contact this page administrator, More See
                </div>
            </div>
    );
}

export default Error;
