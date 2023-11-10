import dayjs from "dayjs";

import '../../styles/Admin/AdminApprovalItem.scss';

const AdminApprovalItem = ({userInfo}) => {
    return(
        <div className="AdminApprovalItemContainer">
            <div className="AdminApprovalItemName">
                <p className="AdminApprovalItemUserName">{userInfo?.username}</p>
                <p className="AdminApprovalItemGithubName">{userInfo?.githubId}</p>
            </div>
            <div className="AdminApprovalItemCreateDate">{dayjs(userInfo?.createdDate).format('YYYY-MM-DD')}</div>
            <div className={userInfo?.status === "APPROVED" ? "ApprovedStatus" : "NotApprovedStatus"}>
                {userInfo?.status === "APPROVED" ? "승인 완료" : "승인 진행 중"}
            </div>
        </div>
    );
}

export default AdminApprovalItem;