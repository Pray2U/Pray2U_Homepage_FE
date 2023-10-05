
import '../../styles/Admin/UserInfo.scss';

const UserInfo = ({userInfo}) =>{
    return(
        <div className="UserInfoBox">
            <div className="UserInfoName">{userInfo?.userName}</div>
            <div className="UserInfoCreated">{userInfo?.createDate}</div>
            <div className="UserInfoEmail">{userInfo?.Email}</div>
            <div className="UserInfoGithub">{userInfo?.githubId}</div>
        </div>
    );
}

export default UserInfo;
