import axios from "axios";
import { useState } from "react";

import '../../styles/Modal/ApprovalModal.scss';
import { getCookie } from "../../util/auth";

const ApprovalModal = ({closeModal,post_NewUserInfo}) =>{

    const [userName, setUserName] = useState(null);
    const [githubId, setGithubId] = useState(null);

    const onChangeUserName = (e) =>{
        setUserName(e.target.value);
    };
    
    const onChangeGithubId = (e) =>{
        setGithubId(e.target.value);
    };


    return(
        <div className="ApprovalModalContainer">
            <div className="ApprovalModalBox">
                <div className="NameBox">
                    <div className="NameTitle">이름</div>
                    <input
                        className="NameInput"
                        onChange={onChangeUserName}/>
                </div>
                <div className="GithubBox">
                    <div className="GithubTitle">GithubId</div>
                    <input
                        className="GithubInput"
                        onChange={onChangeGithubId}/>
                </div>
                <div className="ApprovalButtonBox">
                    <div className="ApprovalCancelButton" onClick={()=>closeModal()}>취소</div>
                    <div className="ApprovalSaveButton" onClick={()=>post_NewUserInfo(userName,githubId)}>저장</div>
                </div>
            </div>
        </div>
    );
}
export default ApprovalModal;