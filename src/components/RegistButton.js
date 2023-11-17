import "../styles/Button/RegistButton.scss";

const RegistButton = ({ onHandleCancel, onHandleSave }) => {
  return (
    <div className="flex items-center w-full h-[3rem] mb-2">
      <div
        className="flex items-center justify-center w-[5rem] h-[70%] ml-auto rounded-[0.5rem] border-[1px] border-solid border-[#0090F9] text-white bg-[#0090F9] cursor-pointer hover:bg-[#0B7FD3]"
        onClick={() => onHandleCancel()}
      >
        등록
      </div>
      <div
        className="flex items-center justify-center w-[5rem] h-[70%] ml-[1rem] rounded-[0.5rem] border-[1px] border-solid border-[#c7c9ce] cursor-pointer hover:bg-[#f1f3f6]"
        onClick={() => onHandleSave()}
      >
        취소
      </div>
    </div>
  );
};

export default RegistButton;
