import { AiTwotoneEdit, AiFillDelete } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import parse from "html-react-parser";
import dayjs from "dayjs";

import Reconfirm from "../../components/Reconfirm";

import "../../styles/Til/TilItem.scss";

const TilItem = ({ tilInfo, onRemove, isAdmin, userId }) => {
  const navigate = useNavigate();

  const [isClosed, setIsClosed] = useState(true);
  const [isOverContent, setIsOverContent] = useState(true);
  const [isModalView, setIsModalView] = useState(false);
  const [tag, setTag ] = useState(null);

  const onEditTIL = (id) => {
    navigate(`/til/edit/${id}`);
  };

  const onChangeIsClosed = () => {
    setIsClosed(!isClosed);
  };

  const checkOverContents = () => {
    const contentLine = tilInfo?.content.split("/");
    const length = contentLine.length;
    if (length >= 8) {
      setIsOverContent(true);
    } else {
      setIsOverContent(false);
    }
  };

  const setTagOject = () => {
    if(tilInfo?.tag){
      let removedDuplicateValue = new Set(tilInfo?.tag.split(", "));
      setTag([...removedDuplicateValue]);
    }
  }

  useEffect(() => {
    checkOverContents();
    setTagOject();
  }, []);

  return (
    <div
      className={
        isClosed
          ? "relative m-auto w-full h-[25rem] shadow-[1px_1px_3px_1px_#dadce0] rounded-[1em] my-3 pt-2 bg-[white] text-black"
          : "relative m-auto w-full h-auto shadow-[1px_1px_3px_1px_#dadce0] rounded-[1em] my-3 pt-2 bg-[white] text-black"
      }
    >
      <div className="flex justify-end text-sm mr-4 text-slate-600">
        {dayjs(tilInfo?.modifiedDate).format("YYYY-MM-DD HH:mm")}
      </div>
      <div className="flex items-center w-[95%] h-[5rem] m-auto border-b-[0.1rem] border-b-solid border-b-[#c7c9ce]">
        <div className="w-[120px] text-center">
          <img
            src={tilInfo?.user?.writerProfileImg}
            alt="프로필"
            className="w-[3rem] h-[3rem] rounded-[50%] border-1 border-[#c7c9ce] mx-auto"
          />
          <div className="text-[12px] font-semibold">
            {tilInfo?.user?.writerName}
          </div>
        </div>
        <div className="flex-col justify-center mt-2">
          <div className="flex items-center justify-center h-full ml-[15px] font-bold text-[20px]">
            {tilInfo?.title}
          </div>

          <div className="flex ml-[5px] text-sm text-gray-400">
            {tag?.map((e) => (
              <p className="px-2" key={e}>#{e}</p>
            ))}
          </div>
        </div>

        <div className="flex items-center ml-auto w-[10%] h-full pl-3">
          {tilInfo?.user?.writerId === userId ? (
            <div
              className="flex justify-center items-center w-[40px] h-[40px] bg-[#E2E2E2] rounded-[0.5rem] cursor-pointer text-[20px]"
              onClick={() => onEditTIL(tilInfo?.tilId)}
            >
              <AiTwotoneEdit />
            </div>
          ) : (
            <div className="w-[2.5rem] h-[60%]" />
          )}
          {tilInfo?.user?.writerId === userId || isAdmin ? (
            <div
              className="flex items-center justify-center w-[40px] h-[40px] ml-[0.5rem] bg-[#FFB7B7] rounded-[0.5rem] cursor-pointer text-[20px]"
              onClick={() => setIsModalView(true)}
            >
              <AiFillDelete />
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
      <div
        className={
          isClosed
            ? "w-[85%] h-[250px] m-auto pt-[1rem] text-[20px] overflow-hidden"
            : "w-[85%] h-auto m-auto pt-[1rem] pb-[5%] text-[20px] overflow-hidden"
        }
      >
        {parse(tilInfo?.content)}
      </div>
      {isOverContent ? (
        <div
          className="flex justify-center items-center w-full h-[3rem] m-auto text-center rounded-[1em] cursor-pointer font-semibold text-slate-500 text-[17px] hover:text-black"
          onClick={() => onChangeIsClosed()}
        >
          {isClosed ? "더보기" : "접기"}
        </div>
      ) : (
        <></>
      )}
      {isModalView ? (
        <Reconfirm
          message="삭제하시겠습니까?"
          cancleButton="취소"
          OkButton="삭제"
          onCancel={() => setIsModalView(false)}
          onCheck={() => onRemove(tilInfo?.tilId)}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default TilItem;
