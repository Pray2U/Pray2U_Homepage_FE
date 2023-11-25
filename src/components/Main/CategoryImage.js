import { Link } from "react-router-dom";
import "../../styles/Main/CategoryImage.scss";

const CategoryImage = ({ isLoggedIn, category, info }) => {
  return (
    <div
      className={
        isLoggedIn
          ? "grid grid-rows-2 grid-cols-4 w-[90%] h-[60%] my-[1%] mx-[5%] justify-around items-stretch justify-items-stretch"
          : "grid grid-rows-1 grid-cols-4 w-[90%] h-[30%] my-[1%] mx-[5%] justify-around"
      }
    >
      {info.map((i) => (
        <div key={i.id} className={category + "Image"}>
          {
            i?.link ?
            <Link to={i?.link} 
              target="_blank"
              className="CategoryClickTitleBox">{i.title}</Link>
            : <p className="CategoryTitleBox">{i.title}</p>
          }
          
          <div className="flex w-full h-[50%] font-bold items-end">
            <p className="w-[30%] h-[20%] text-left pl-6 text-[110%]">{i.day}</p>
            <p className="w-[80%] h-[20%] text-right pr-6 text-[110%]">
              {i.author}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CategoryImage;
