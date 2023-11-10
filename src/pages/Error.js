import { Link } from 'react-router-dom';

import '../styles/Error/Error.scss';

const Error = () => {

    const errorData = {
        code: 404,
        message: "Oops Error Page..! Something went Wrong!"
    };

    return(
        <div className='ErrorBox'>
            <img className='ImageBox' src='img/logo.png' alt='Img'/>
            <p className='StatusCode'>{errorData.code}</p>
            <p className='ErrorMessage'>{errorData.message}</p>
            <button className='Button'>
                <Link to='/' className='ButtonText'>
                    Go to the Page
                </Link>
            </button>
        </div>
    );
}

export default Error;
