import { Link } from "react-router-dom";
import { AiFillGithub } from "react-icons/ai";

import "../styles/Footer/Footer.scss";

const Footer = () => {
  return (
    <div className="flex border-t-[1.75px] border-t-solid border-t-[#a5a7aa] h-[200px]">
      <div className="flex w-[1280px] h-full m-auto">
        <div className="flex items-center">
          <p className="font-bold ml-4 my-auto text-3xl drop-shadow-[0_0.8px_0.8px_rgba(0,0,0,0.5)]">
            <span className="text-[#84a3d4]">Pra</span>
            <span className="text-[#f27b7d]">y</span>
            <span className="bg-gradient-to-r from-[rgba(237,191,43,1)] via-[rgba(240,138,86,1)] to-[rgba(244,106,36,1)]/100 inline-block text-transparent bg-clip-text">
              2U
            </span>
          </p>
        </div>
        <div className="text-black w-[75%] h-full flex items-center ml-12">
          <p className="font-nanumgothic font-semibold text-true-gray-400">
            We are "Pray2U". <br></br>
            As a Closed non-profit developer community based at Hannam
            University in Deajeon South Korea,
            <br></br>
            we are working to network with developers and improve personal
            skills
          </p>
          <ul className="ml-8 ">
            <li className="font-nanumgothic font-semibold text-true-gray-400">
              Contact Email : choihs980924@gmail.com{" "}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
