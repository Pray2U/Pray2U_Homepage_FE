import { Link } from "react-router-dom";
import { AiFillGithub } from "react-icons/ai";

import "../styles/Footer/Footer.scss";

const Footer = () => {
  return (
    <div className="flex border-t-[1.75px] border-t-solid border-t-[#a5a7aa]">
      <div className="flex w-[1280px] h-full m-auto bottom-0">
        <div className="w-[15%] h-full m-auto">
          <img
            className="flex w-full h-[30%]"
            alt="Logo_Image"
            src="img/logo_title.png"
          />
          <Link
            to="https://github.com/Pray2U"
            target="_blank"
            rel="noopener noreferrer"
            className="w-[15%] h-[90%] no-underline ml-auto text-black"
          >
            <AiFillGithub className="flex m-auto w-[20%] h-[20%] cursor-pointer hover:text-[#0090F9]" />
          </Link>
        </div>
        <div className="pt-[1%] px-[1%] text-black font-bold w-[85%] h-full">
          <p>
            We are "Pray2U". <br></br>
            As a Closed non-profit developer community based at Hannam
            University in Deajeon South Korea,
            <br></br>
            we are working to network with developers and improve personal
            skills
          </p>
          <ul>
            <li>Contact Email : choihs980924@gmail.com </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
