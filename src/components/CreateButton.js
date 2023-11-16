import { Link } from "react-router-dom";
import { BiSolidPencil } from "react-icons/bi";
import "../styles/Button/CreateButton.scss";

const CreateButton = ({ link }) => {
  return (
    <div className="flex items-center m-auto my-[1%] w-full h-[6vh]">
      {link ? (
        <Link
          to={link}
          className="flex items-center justify-center w-[10%] h-[80%] no-underline text-white bg-[#0090F9] rounded-[0.5rem] ml-auto hover:bg-[#0B7FD3]"
        >
          <BiSolidPencil className="w-[1rem] h-[1rem] mr-[0.25rem]" />
          <p className="m-0 text-[15px]">작성하기</p>
        </Link>
      ) : (
        <></>
      )}
    </div>
  );
};

export default CreateButton;
