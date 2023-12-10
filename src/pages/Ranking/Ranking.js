import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getCookie, isCheckAdmin } from "../../util/auth";

import Title from "../../components/Title/Title";
import Paging from "../../components/Paging";
import Footer from "../../components/Footer";

const data = [
  {
    number: "1",
    profileimgUrl: "/testimg/typescript.png",
    username: "박병근",
    githubId: "Dejong1706",
    point: "10000",
  },
  {
    number: "2",
    profileimgUrl: "/testimg/javascript.png",
    username: "최형순",
    githubId: "chlgudtns",
    point: "2000",
  },
  {
    number: "3",
    profileimgUrl: "/testimg/github.png",
    username: "최재훈",
    githubId: "wogns",
    point: "1000",
  },
  {
    number: "4",
    profileimgUrl: "/testimg/typescript.png",
    username: "박병근",
    githubId: "Dejong1706",
    point: "1000",
  },
  {
    number: "5",
    profileimgUrl: "/testimg/javascript.png",
    username: "최형순",
    githubId: "chlgudtns",
    point: "2000",
  },
  {
    number: "6",
    profileimgUrl: "/testimg/github.png",
    username: "최재훈",
    githubId: "wogns",
    point: "1000",
  },
  {
    number: "7",
    profileimgUrl: "/testimg/typescript.png",
    username: "박병근",
    githubId: "Dejong1706",
    point: "10000",
  },
  {
    number: "8",
    profileimgUrl: "/testimg/javascript.png",
    username: "최형순",
    githubId: "chlgudtns",
    point: "2000",
  },
  {
    number: "9",
    profileimgUrl: "/testimg/github.png",
    username: "최재훈",
    githubId: "wogns",
    point: "1000",
  }, {
    number: "10",
    profileimgUrl: "/testimg/github.png",
    username: "최재훈",
    githubId: "wogns",
    point: "1000",
  },
];

const Ranking = () => {

  const navigate = useNavigate();
  const pageSize = 10;

  const [ selectedPage, setSelectedPage ] = useState(1);
  const [ rankingList, setRankingList ] = useState(data);
  const [ totalItemCnt, setTotalItemCnt ] = useState(1);

  const read_Ranking = async () => {
    try {
      const url = `${process.env.REACT_APP_API_SERVER}/api/ranks?page=${selectedPage-1}&size=${pageSize}&sort=id,desc`;
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${getCookie("accessToken")}`,
        },
        withCredentials: true,
      });
      if (response.status === 200) {
        // setRankingList(response.data.data.content);
        // setTotalItemCnt(response.data.data.totalElements);
      } else {
        alert(response.data.message);
      }
    } catch (e) {
      alert(e.response.data.message);
      navigate("/error");
    }
  };

  
  useEffect(() => {
    read_Ranking();
  }, [selectedPage]);

  return (
    <>
      <div className="w-[1080px] h-auto m-auto mt-10">
        <Title title="🏆 랭킹" />
        {/* <div className="w-full min-h-[450px] pt-8 shadow-[1px_1px_3px_1px] shadow-gray-300 my-4"> */}
        <div className="w-full min-h-[450px] pt-8 my-4">
          <div className="w-full h-[50px] mx-auto flex justify-center items-center font-bold">
            <div className="flex justify-center items-center w-[15%]">No.</div>
            <div className="flex justify-center items-center w-[40%]">Name</div>
            <div className="flex justify-center items-center w-[20%]">githubID</div>
            <div className="flex justify-center items-center w-[25%]">Point</div>
          </div>
          {
            rankingList?.map((d) => (
              // <div className="w-[750px] h-[50px] mx-auto flex text-center justify-center border-b-[1.75px] border-b-solid border-b-black mt-4">
              <div className="w-full mx-auto flex text-center justify-center my-10 font-bold text-xl">
                <div className="flex justify-center items-center w-[15%]">{d.number}</div>
                <div className="flex justify-center items-center w-[40%]">
                  <img
                    src={`${d.profileimgUrl}`}
                    className="w-[50px] h-[50px]"
                    alt="profileImg"
                  />
                  <div className="flex justify-center items-center w-[300px]">{d.username}</div>
                </div>
                <div className="flex justify-center items-center w-[20%]">{d.githubId}</div>
                <div className="flex justify-center items-center w-[25%]">{d.point}pt</div>
              </div>
            ))
          }
          {
            totalItemCnt ? 
            <Paging
              pageNum={selectedPage}
              countPerPage={pageSize}
              totalItems={totalItemCnt ? totalItemCnt : 0}
              handlePage={setSelectedPage}
            /> : <></>
          }
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Ranking;