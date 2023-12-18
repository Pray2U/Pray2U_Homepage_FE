import { React, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
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
  },
  {
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

  const [selectedPage, setSelectedPage] = useState(1);
  const [rankingList, setRankingList] = useState([]);
  const [totalItemCnt, setTotalItemCnt] = useState(1);
  const [dateRange, setDataRange] = useState(null);

  const read_Ranking = async () => {
    try {
      const url = `${process.env.REACT_APP_API_SERVER}/api/ranks?page=${
        selectedPage - 1
      }&size=${pageSize}&sort=id,asc`;
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${getCookie("accessToken")}`,
        },
        withCredentials: true,
      });
      if (response.status === 200) {
        const ranking = response.data.data.content;
        setDataRange(
          ranking[0].startDate.split("T")[0] +
            " ~ " +
            ranking[0].endDate.split("T")[0]
        );
        const resultList = await Promise.all(
          ranking.map(async (rank) => {
            const result = await read_userInfo(rank?.userId);
            return Object.assign(rank, result);
          })
        );
        setRankingList(resultList);
        setTotalItemCnt(response.data.data.totalElements);
        console.log(resultList);
      } else {
        alert(response.data.message);
      }
    } catch (e) {
      alert(e.response.data.message);
      navigate("/error");
    }
  };

  const read_userInfo = async (userId) => {
    try {
      const url = `${process.env.REACT_APP_API_SERVER}/api/users/${userId}`;
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${getCookie("accessToken")}`,
        },
        withCredentials: true,
      });
      if (response.status === 200) {
        return response.data.data;
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
        <Title title="🏆 랭킹" subTitle={dateRange} />
        <div className="w-full min-h-[450px] pt-8">
          <div className="w-[90%] h-[50px] m-auto flex justify-center items-center font-bold text-gray-700 text-xl mb-5">
            <div className="flex justify-center items-center w-[15%] font-jua">
              No.
            </div>
            <div className="flex justify-center items-center w-[30%] font-jua">
              <div className="flex justify-center items-center w-[70px] font-jua">
                Profile
              </div>
              <div className="flex justify-center items-center w-[300px] font-jua">
                Name
              </div>
            </div>
            <div className="flex justify-center items-center w-[30%] font-jua">
              githubID
            </div>
            <div className="flex justify-center items-center w-[25%] font-jua">
              Point
            </div>
          </div>
          {rankingList?.map((rank) => (
            <div
              key={rank?.userId}
              className="w-[90%] h-[80px] mx-auto flex justify-center items-center font-semibold text-xl my-10"
            >
              <div className="flex justify-center items-center w-[15%] text-2xl font-jua">
                {rank?.ranking}
              </div>
              <div className="flex justify-center items-center w-[30%]">
                <img
                  src={`${rank?.profileImgUrl}`}
                  className="min-w-[70px] h-[70px] rounded-full border-solid border-1 border-gray-500"
                  alt="profile"
                />
                <div className="flex justify-center items-center w-[300px] font-rubik">
                  {rank?.username}
                </div>
              </div>
              <Link
                to={`https://github.com/${rank?.githubId}`}
                target="_blank"
                className="flex justify-center items-center w-[30%] no-underline font-rubik"
              >
                {rank?.githubId}
              </Link>
              <div className="flex justify-center items-center w-[25%] font-rubik">
                {rank?.weekPoint}pt
              </div>
            </div>
          ))}
          {totalItemCnt ? (
            <Paging
              pageNum={selectedPage}
              countPerPage={pageSize}
              totalItems={totalItemCnt ? totalItemCnt : 0}
              handlePage={setSelectedPage}
            />
          ) : (
            <></>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Ranking;
