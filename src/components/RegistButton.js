import "../styles/Button/RegistButton.scss";

const RegistButton = ({ onHandleCancel, onHandleSave }) => {
  return (
    <div className="flex items-center w-full h-[3rem] mb-2">
      <div
        className="flex items-center justify-center w-[5rem] h-[70%] ml-auto rounded-[0.5rem] border-[1px] border-solid border-[#c7c9ce] cursor-pointer hover:bg-[#f1f3f6] font-jua"
        onClick={() => onHandleCancel()}
      >
        취소
      </div>
      <div
        className="flex items-center justify-center w-[5rem] h-[70%] ml-[1rem] rounded-[0.5rem] border-[1px] border-solid border-[#6495ED] text-white bg-[#6495ED] cursor-pointer hover:bg-[#557DE1] font-jua"
        onClick={() => onHandleSave()}
      >
        등록
      </div>
    </div>
  );
};

export default RegistButton;
