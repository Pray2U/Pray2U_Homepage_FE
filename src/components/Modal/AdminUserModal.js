import "../../styles/Modal/AdminUserModal.scss";

const AdminUserModal = ({ onToggle, userrole }) => {
  return (
    <>
      {userrole === "ROLE_ADMIN" ? (
        <div className="w-[100px] h-[50px] ml-auto left-[0.5rem] box-border border-[0.15rem] border-solid border-[#e5e7eb] rounded-[0.725rem] bg-white font-bold hover:border-red-300">
          <div
            className="w-full h-full flex justify-center items-center text-slate-950 no-underline cursor-pointer hover:text-red-400"
            onClick={onToggle}
          >
            <p className="text-sm m-0">관리자 해지</p>
          </div>
        </div>
      ) : (
        <div className="w-[100px] h-[50px] ml-auto left-[0.5rem] box-border border-[0.15rem] border-solid border-[#e5e7eb] rounded-[0.725rem] bg-white font-bold hover:border-green-300">
          <div
            className="w-full h-full flex justify-center items-center text-slate-950 no-underline cursor-pointer hover:text-green-400"
            onClick={onToggle}
          >
            <p className="text-sm m-0">관리자 승인</p>
          </div>
        </div>
      )}

      {/* <div className='AdminUserModalDeleteButton'>회원 삭제</div> */}
    </>
  );
};

export default AdminUserModal;
