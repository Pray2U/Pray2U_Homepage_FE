import { useState, useEffect } from "react";
import axios from "axios";
import { getCookie } from "../../util/auth";
import Point from "./Point";

import "../../styles/Main/PointRank.scss";

const PointRank = () => {

  const rankDummyData = [
    {
      rank: 1,
      username: "최재훈",
      weekPoint: 7555,
    },
    {
      rank: 2,
      username: "이동복",
      weekPoint: 7555,
    },
    {
      rank: 3,
      username: "김민성",
      weekPoint: 7555,
    },
    {
      rank: 4,
      username: "최형순",
      weekPoint: 7555,
    },
  ];

  const [usersRank, setUsersRank] = useState(null);
  const [myCurrentPoint, setMyCurrentPoint] = useState(null);
  const [myLastWeekPoint, setMyLastWeekPoint] = useState(null);

  const read_usersRank = async () => {
    try {
      const url = `${process.env.REACT_APP_API_SERVER}/api/ranks?page=${0}&size=${4}&sort=id,desc`;
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${getCookie("accessToken")}`,
        },
        withCredentials: true,
      });
      if(response.status === 200){
        setUsersRank(response.data.data.content);
      }else{
        alert("랭킹 정보를 가져오는데 실패했습니다");
      }
    } catch (e) {
      alert(e.response.data.message);
    }
  };

  const read_myCurrentPoint = async () => {
    try {
      const url = `${process.env.REACT_APP_API_SERVER}/api/points/me`;
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${getCookie("accessToken")}`,
        },
        withCredentials: true,
      });
      if (response.status === 200) {
        setMyCurrentPoint(response.data.data.currentPoint);
      } else {
        alert("내 포인트를 가져오는데 실패했습니다.");
      }
    } catch (e) {
      alert(e.response.data.message);
    }
  };

  const read_myLastWeekPoint = async () => {
    try {
      const url = `${process.env.REACT_APP_API_SERVER}/api/ranks/lastweek/me`;
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${getCookie("accessToken")}`,
        },
        withCredentials: true,
      });
      if (response.status === 200) {
        setMyLastWeekPoint(response.data.data.content);
      } else {
        alert("내 포인트를 가져오는데 실패했습니다.");
      }
    } catch (e) {
      alert(e.response.data.message);
    }
  };

  useEffect(() => {
    read_usersRank();
    read_myCurrentPoint();
    // read_myLastWeekPoint();
  }, []);

  return (
    <div className="ContainerBox">
      <div className="Icon">
        <img className="IconImg" src="./img/Leader Board Icon.png" alt="Img" />
        <p className="IconText">LEADER BOARD</p>
      </div>
      <div className="RankListBox">
        {
          usersRank?.map(user => <Point user={user}/>)
        }
        <div className="MyPointBox">My Point : {myCurrentPoint}</div>
        {/* <div className="WeeklyScoreBox">Weekly Score : {myLastWeekPoint}</div> */}
      </div>
    </div>
  );
};

export default PointRank;
