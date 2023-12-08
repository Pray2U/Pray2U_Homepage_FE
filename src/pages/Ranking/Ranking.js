import React from "react";
import Title from "../../components/Title/Title";
import Footer from "../../components/Footer";

const data = [
  {
    number: "1.",
    img: "/testimg/typescript.png",
    name: "박병근",
    gitID: "Dejong1706",
    point: "10000pt",
  },
  {
    number: "2.",
    img: "/testimg/javascript.png",
    name: "최형순",
    gitID: "chlgudtns",
    point: "2000pt",
  },
  {
    number: "3.",
    img: "/testimg/github.png",
    name: "최재훈",
    gitID: "wogns",
    point: "1000pt",
  },
];

export default function Ranking() {
  return (
    <>
      <div className="w-[1080px] h-auto m-auto mt-10">
        <Title title="🏆 랭킹" />
        <div className="w-full min-h-[450px] pt-8 shadow-[1px_1px_3px_1px] shadow-gray-300 my-4">
          <div className="w-[750px] h-[50px] mx-auto flex text-center justify-center">
            <div className="w-[80px] font-bold">No.</div>
            <div className="w-[200px] font-bold">Name</div>
            <div className="w-[200px] font-bold">githubID</div>
            <div className="w-[250px] font-bold">Point</div>
          </div>
          {data.map((d) => (
            <div className="w-[750px] h-[50px] mx-auto flex text-center justify-center border-b-[1.75px] border-b-solid border-b-black mt-4">
              <div className="w-[80px] font-bold">{d.number}</div>
              <div className="w-[200px] flex">
                <img
                  src={`${d.img}`}
                  className="w-[40px] h-[40px]"
                  alt="profileImg"
                />
                <div className="w-[120px]">{d.name}</div>
              </div>
              <div className="w-[200px]">{d.gitID}</div>
              <div className="w-[250px]">{d.point}</div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}
