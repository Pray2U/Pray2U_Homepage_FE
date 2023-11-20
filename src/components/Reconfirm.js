import "../styles/Modal/Reconfirm.scss";

const Reconfirm = ({ message, cancleButton, OkButton, onCancel, onCheck }) => {
  return (
    <div className="flex items-center fixed top-0 right-0 bottom-0 left-0 w-[100vw] h-[100vh] z-50 bg-[rgba(0,0,0,0.6)]">
      <div className="w-[30%] h-[20%] bg-white rounded-1 m-auto">
        <p className="flex items-center justify-center text-[1.5rem] font-bold m-0 w-full h-[65%]">
          {message}
        </p>
        <div className="flex items-center">
          <div
            className="flex items-center justify-center w-[30%] h-[80%] ml-auto mr-1 border-[0.1rem] border-solid border-[#D2D4D9] rounded-1 cursor-pointer hover:bg-[#D2D4D9]"
            onClick={() => onCancel()}
          >
            {cancleButton}
          </div>
          <div
            className="flex items-center justify-center bg-[#0090F9] w-[30%] h-[80%] mr-auto border-[0.1rem] border-solid border-[#0090F9] text-white rounded-1 cursor-pointer hover:bg-[#0B7FD3]"
            onClick={() => onCheck()}
          >
            {OkButton}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reconfirm;
