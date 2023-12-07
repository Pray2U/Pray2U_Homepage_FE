import axios from "axios";
import { useState } from "react";

import "../../styles/Modal/ApprovalModal.scss";
import { getCookie } from "../../util/auth";

const ApprovalModal = ({ closeModal, post_NewUserInfo }) => {
  const [userName, setUserName] = useState(null);
  const [githubId, setGithubId] = useState(null);

  const onChangeUserName = (e) => {
    setUserName(e.target.value);
  };

  const onChangeGithubId = (e) => {
    setGithubId(e.target.value);
  };

  return (
    <div className="flex fixed top-0 right-0 left-0 bottom-0 w-[100vw] h-[100vh] z-99 bg-[rgba(0,0,0,0.6)] items-center">
      <div className="w-[30%] h-[30%] bg-white rounded-[1em] m-auto py-[2%]">
        <div className="flex items-center w-[70%] h-[35%] font-bold text-md m-auto">
          <div className="flex w-[25%] h-[90%] items-center justify-center">
            이름
          </div>
          <input
            className="flex w-[75%] h-[45%] items-center justify-center pl-2 border-2 border-solid border-slate-300 rounded-md"
            onChange={onChangeUserName}
          />
        </div>
        <div className="flex items-center w-[70%] h-[35%] font-bold text-md m-auto">
          <div className="flex w-[25%] h-[90%] items-center justify-center">
            GithubId
          </div>
          <input
            className="flex w-[75%] h-[45%] items-center justify-center pl-2 border-2 border-solid border-slate-300 rounded-md"
            onChange={onChangeGithubId}
          />
        </div>
        <div className="flex w-[90%] h-[30%] m-auto items-center justify-end mt-2">
          <div
            className="flex justify-center items-center w-[70px] h-[30px] mr-2 rounded-[0.5em] bg-[#6495ED] text-white font-bold cursor-pointer hover:bg-[#557DE1]"
            onClick={() => post_NewUserInfo(userName, githubId)}
          >
            저장
          </div>
          <div
            className="flex justify-center items-center w-[70px] h-[30px] rounded-[0.5em] bg-[#F34F50] text-white font-bold cursor-pointer hover:bg-[#dc3a3a]"
            onClick={() => closeModal()}
          >
            취소
          </div>
        </div>
      </div>
    </div>
  );
};
export default ApprovalModal;
