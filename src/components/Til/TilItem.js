import { AiTwotoneEdit, AiFillDelete } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import parse from "html-react-parser";

import Reconfirm from "../../components/Reconfirm";

import "../../styles/Til/TilItem.scss";

const TilItem = ({ tilInfo, onRemove, myInfo }) => {
  const navigate = useNavigate();

  const [isClosed, setIsClosed] = useState(true);
  const [isOverContent, setIsOverContent] = useState(true);
  const [isModalView, setIsModalView] = useState(false);

  const onDeleteTIL = async (id) => {
    onRemove(id);
  };

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

  useEffect(() => {
    checkOverContents();
  }, []);

  return (
    <div
      className={
        isClosed
          ? "relative m-auto my-4 w-full h-[25rem] shadow-[1px_1px_3px_1px_#dadce0] rounded-[1rem] pt-2 bg-white"
          : "relative m-auto my-4 w-full h-auto shadow-[1px_1px_3px_1px_#dadce0] rounded-[1rem] pt-2 bg-white"
      }
    >
      <div className="flex items-center w-[95%] h-[5rem] m-auto border-b-[0.1rem] border-b-solid border-b-[#c7c9ce]">
        <img
          src={tilInfo?.user?.writerProfileImg}
          alt="프로필"
          className="w-[3rem] h-[3rem] rounded-[50%] bg-black items-center justify-center"
        />
        <div className="flex items-center justify-center h-full ml-1 font-bold text-[1.5vw]">
          {tilInfo?.title}
        </div>
        {tilInfo?.userId === myInfo?.user?.writerId ? (
          <div className="flex items-center ml-auto w-[10%] h-full">
            <div
              className="flex items-center justify-center w-[2.5rem] h-[60%] bg-[#E2E2E2] rounded-[0.5em] cursor-pointer"
              onClick={() => onEditTIL(tilInfo?.tilId)}
            >
              <AiTwotoneEdit />
            </div>
            <div
              className="flex items-center justify-center w-[2.5rem] h-[60%] ml-1 bg-[#FFB7B7] rounded-[0.5em] cursor-pointer"
              onClick={() => setIsModalView(true)}
            >
              <AiFillDelete />
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
      <div
        className={
          isClosed
            ? "w-[85%] h-[16rem] overflow-hidden m-auto pt-1"
            : "w-[85%] h-auto overflow-hidden m-auto pt-1 pb-[5%]"
        }
      >
        {/* <Viewer
                    initialEditType="markdown"
                    initialValue={tilInfo?.content}
                /> */}
        {parse(tilInfo?.content)}
      </div>
      {isOverContent ? (
        <div
          className="absolute bottom-0 w-full h-[3rem] m-auto text-center rounded-1 text-gray cursor-pointer hover:text-black"
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
          button1="취소"
          button2="삭제"
          onCancel={setIsModalView(false)}
          onCheck={() => onDeleteTIL(tilInfo?.tilId)}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default TilItem;
