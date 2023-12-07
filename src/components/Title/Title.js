import "../../styles/Title/Title.scss";

const Title = ({ title, subTitle }) => {
  return (
    <div className="flex items-center w-full h-[10vh] m-auto mt-2 rounded-[1rem] bg-[#6495ED] text-white text-[2rem]">
      <div className="flex items-center h-[50%] pl-[3%] font-jua">{title}</div>
      {subTitle ? (
        <div className="flex items-center h-[40%] pl-[3%] pr-[3%] text-[1.25rem]">
          {subTitle}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Title;
