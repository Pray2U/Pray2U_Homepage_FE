import React from "react";

export default function About() {
  return (
    <div className="container mx-auto mt-16 text-center flex">
      <div className="w-1/2 pr-2">
        <img
          id="mainImage"
          src="/testimg/main.jpg"
          alt="Image Description"
          className="w-[80%] h-[90%]"
        />
      </div>
      <div className="w-1/2 pl-2">
        <h1 className="text-4xl font-bold text-gray-800 font-poorstory">
          About PRAY
          <span className="text-[rgba(237,191,43,1)] font-poorstory">2</span>
          <span className="text-[rgba(240,138,86,1)] font-poorstory">U</span>
        </h1>
        <div className="bg-blue-100 mt-8">
          <p className="text-gray-900 font-semibold p-8 inline-block text-left">
            PRAY 2U는 코딩에 푹 빠진 친구들의 모임입니다. <br />
            새로운 기술과 재미있는 프로젝트에 항상 열정 넘치게 참여하고
            있습니다. 함께 코딩 대회에 도전하고, 멋진 앱이나 웹을 만들면서
            끊임없이 배우고 성장하고 있습니다.
            <br /> 동아리는 물론이고, 친목을 다지며 같이 웃고 떠들면서 개발하는
            것도 우리의 매력 중 하나입니다. 함께 코딩하는 것을 좋아하고, 기술에
            대한 열정이 넘치면 누구든지 환영입니다.
          </p>
        </div>
      </div>
    </div>
  );
}
