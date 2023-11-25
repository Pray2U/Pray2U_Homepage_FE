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
          <p className="CategoryTitleBox">{i.title}</p>
          <div className="flex w-full h-[70%] font-bold items-end">
            <p className="w-[50%] h-[20%] text-right text-[110%]">{i.day}</p>
            <p className="flex justify-center w-[50%] h-[20%] text-[110%]">
              {i.author}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CategoryImage;
