import { AiFillGithub } from "react-icons/ai";
import { MdOutlineCancel } from "react-icons/md";

import '../../styles/Modal/LoginModal.scss';

const LoginModal = ({onCancel}) => {

    const onLogin = () => {
        window.location.replace(`${process.env.REACT_APP_API_SERVER}/api/login/oauth2/code/github?redirect_uri=${process.env.REACT_APP_REDIRECT_URL}`);
    }
    
    return(
        <div className="LoginContainer">
            <div className="LoginModalBox">
                <div className="LoginModalHeader">
                    <MdOutlineCancel className="LoginModalCancel" onClick={()=>onCancel()}/>
                </div>
                <div className="LoginModalTitle">로그인</div>
                <div className="LoginModalButton" onClick={()=>onLogin()}>
                    <AiFillGithub className="LoginGithubIcon"/>
                    <div className="LoginModalContent">github으로 로그인하기</div>
                </div>
            </div>
        </div>
    )
}

export default LoginModal;