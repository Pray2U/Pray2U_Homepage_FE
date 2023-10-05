
import '../../styles/Admin/UserRole.scss';

const UserRole = ({userInfo, post_UserRole}) =>{
    return(
        <div className="UserRoleBox">
            <div className="UserRoleName">{userInfo?.userName}</div>
            <div className="UserRoleCreated">{userInfo?.createDate}</div>
            <div className="UserRoleGithubId">{userInfo?.githubId}</div>
            <div className="UserRoleRole">{userInfo?.Role === "ADMIN" ? "관리자" : "일반멤버"}</div>
            <div className="UserRoleEditButton" onClick={()=>post_UserRole(userInfo)}>직책변경</div>
        </div>
    );
}

export default UserRole;
