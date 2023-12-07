import dayjs from "dayjs";

import "../../styles/Admin/AdminApprovalItem.scss";

const AdminApprovalItem = ({ userInfo, onRemove }) => {
  return (
    <div className="flex items-center w-full py-[0.5rem] border-t-[0.1rem] border-t-solid border-t-[#D2D4D9]">
      <div className="mr-[2%] w-[30%] pl-[1rem]">
        <p className="text-[1.2rem] h-[60%] mb-[0.5rem] text-[#6495ED] font-bold">
          {userInfo?.username}
        </p>
        <p className="h-[40%] m-0">{userInfo?.githubId}</p>
      </div>
      <div className="w-[30%] text-[1.2rem] pl-[0.5rem]">
        {dayjs(userInfo?.createdDate).format("YYYY-MM-DD")}
      </div>
      <div className="w-[30%] text-[1.1rem] pl-[0.5rem] font-bold">
        {userInfo?.status === "APPROVED" ? "승인 완료 ✅" : "승인 진행 중 ❌"}
      </div>
      <div
        className="w-[5%] text-[1.1rem] pl-[0.5rem] font-bold cursor-pointer hover:text-[#dc3a3a]"
        onClick={() => onRemove(userInfo?.githubId)}
      >
        삭제
      </div>
    </div>
  );
};

export default AdminApprovalItem;
