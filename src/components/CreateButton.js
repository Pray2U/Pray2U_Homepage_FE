import { Link } from "react-router-dom";
import { BiSolidPencil } from "react-icons/bi";
import "../styles/Button/CreateButton.scss";

const CreateButton = ({ link }) => {
  return (
    <div className="flex items-center m-auto my-auto p-2 w-full h-[70px]">
      {link ? (
        <Link
          to={link}
          className="flex items-center justify-center p-2 no-underline text-white bg-[#6495ED] rounded-[0.5rem] ml-auto hover:bg-[#557DE1]"
        >
          <BiSolidPencil className="w-[1rem] h-[1rem] mr-[0.25rem]" />
          <p className="m-0 text-sm font-jua">작성하기</p>
        </Link>
      ) : (
        <></>
      )}
    </div>
  );
};

export default CreateButton;
