import axios from "axios";
import { useState } from "react";

import '../../styles/Admin/UserCreateModal.scss';

const UserCreateModal = ({closeModal}) =>{

    const [userName, setUserName] = useState(null);
    const [githubId, setGithubId] = useState(null);

    const onChangeUserName = (e) =>{
        setUserName(e.target.value);
    };
    
    const onChangeGithubId = (e) =>{
        setGithubId(e.target.value);
    };

    const post_NewUserInfo = async() =>{
        try{
            const url = ``;
            const data = {

            }
            const response = await axios.post(url,data);

        }catch(e){

        }
    }

    return(
        <div className="UserModalContainer">
            <div className="UserModalBox">
                <div className="NameBox">
                    <div className="NameTitle">이름</div>
                    <input
                        className="NameInput"
                        onChange={onChangeUserName}/>
                </div>
                <div className="GithubBox">
                    <div className="GithubTitle">Github</div>
                    <input
                        className="GithubInput"
                        onChange={onChangeGithubId}/>
                </div>
                <div className="UserButtonBox">
                    <div className="UserCancelButton" onClick={()=>closeModal()}>취소</div>
                    <div className="UserSaveButton" onClick={()=>closeModal()}>저장</div>
                </div>
            </div>
        </div>
    );
}
export default UserCreateModal;