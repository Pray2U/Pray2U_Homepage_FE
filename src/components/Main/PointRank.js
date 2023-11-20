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

  // 실제 사용할 코드
  // const [ usersRank, setUsersRank ] = useState(null);
  // const [ myCurrentPoint, setMyCurrentPoint ] = useState(null);
  // const [ myLastWeekPoint, setMyLastWeekPoint ] = useState(null);

  // 더미 데이터
  const [usersRank, setUsersRank] = useState(rankDummyData);
  const [myCurrentPoint, setMyCurrentPoint] = useState(2000);
  const [myLastWeekPoint, setMyLastWeekPoint] = useState(2500);

  const read_usersRank = async () => {
    try {
      const url = `${process.env.REACT_APP_API_SERVER}/api/rank`;
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${getCookie("accessToken")}`,
        },
        withCredentials: true,
      });
      setUsersRank(response.data.rankList);
    } catch (e) {
      console.log(e);
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
        setMyCurrentPoint(response.data.data);
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
        setMyLastWeekPoint(response.data.weekPoint);
      } else {
        alert("내 포인트를 가져오는데 실패했습니다.");
      }
    } catch (e) {
      alert(e.message);
    }
  };

  useEffect(() => {
    // read_usersRank();
    // read_myCurrentPoint();
    // read_myLastWeekPoint();
  }, []);

  return (
    <div className="ContainerBox">
      <div className="Icon">
        <img src="./img/Leader Board Icon.png" alt="Img" />
        <p className="IconText">LEADER BOARD</p>
      </div>
      {usersRank ? (
        <div className="RankListBox">
          <Point user={usersRank[0]} />
          <Point user={usersRank[1]} />
          <Point user={usersRank[2]} />
          <div className="MyPointBox">My Point : {myCurrentPoint}</div>
          <div className="WeeklyScoreBox">Weekly Score : {myLastWeekPoint}</div>
          <Point user={usersRank[3]} />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default PointRank;
