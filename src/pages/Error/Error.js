import { Link } from "react-router-dom";

import "../../styles/Error/Error.scss";

const Error = () => {
  const errorData = {
    code: 404,
    message: "Oops Error Page..! Something went Wrong!",
  };

  return (
    <div className="flex-wrap flex-col items-center justify-center w-full h-[80vh] mx-0 my-auto">
      <img
        className="flex justify-center w-[10rem] h-[10rem] m-auto mt-[2.5rem]"
        src="img/logo.png"
        alt="Img"
      />
      <p className="flex items-center justify-center w-[50%] h-[40%] m-auto text-[15rem] font-bold text-[#110042]">
        {errorData.code}
      </p>
      <p className="w-[70%] h-[20%] m-auto text-center text-[2vw] font-bold text-[#110042]">
        {errorData.message}
      </p>
      <button className="flex items-center justify-center w-[40%] h-[10%] m-auto border-none rounded-[3em] bg-[#260093] cursor-pointer">
        <Link to="/" className="text-[1.5vw] text-white text no-underline">
          Go to the Page
        </Link>
      </button>
    </div>
  );
};

export default Error;
