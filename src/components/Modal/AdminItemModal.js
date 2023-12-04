import "../../styles/Modal/AdminItemModal.scss";

const AdminItemModal = ({ onToggle, onRemove }) => {
  return (
    <div className="w-[6rem] m-auto relative box-border border-[0.15rem] border-solid border-[#e5e7eb] rounded-[0.725rem] bg-white py-[1rem] font-bold">
      <div
        className="flex items-center justify-center w-full h-[20%] no-underline cursor-pointer hover:text-[#0090F9]"
        onClick={onToggle}
      >
        수정하기
      </div>
      <div
        className="flex items-center justify-center w-full h-[20%] no-underline cursor-pointer hover:text-[red]"
        onClick={onRemove}
      >
        삭제하기
      </div>
    </div>
  );
};

export default AdminItemModal;
