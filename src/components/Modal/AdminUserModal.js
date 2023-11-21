import "../../styles/Modal/AdminUserModal.scss";

const AdminUserModal = ({ onToggle }) => {
  return (
    <div className="w-[6rem] ml-auto relative left-[0.5rem] box-border border-[0.15rem] border-solid border-[#e5e7eb] rounded-[0.725rem] bg-white py-[1rem] font-bold">
      <div
        className="flex items-center justify-center w-full h-[20%] text-black no-underline cursor-pointer hover:text-[#0090F9]"
        onClick={onToggle}
      >
        직책 변경
      </div>
      {/* <div className='AdminUserModalDeleteButton'>회원 삭제</div> */}
    </div>
  );
};

export default AdminUserModal;
