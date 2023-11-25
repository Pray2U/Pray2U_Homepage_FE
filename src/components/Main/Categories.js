import { useEffect, useState } from "react";
import axios from "axios";

import { getCookie } from "../../util/auth";
import CategoryImage from "./CategoryImage";

import "../../styles/Main/Categories.scss";
import dayjs from "dayjs";

const cate = [
  {
    id: 2,
    name: "Project",
    checked: true,
  },
  {
    id: 3,
    name: "Seminar",
    checked: false,
  },
];

const LoggedIncate = [
  {
    id: 1,
    name: "TIL",
    checked: true,
  },
  {
    id: 2,
    name: "Project",
    checked: false,
  },
  {
    id: 3,
    name: "Seminar",
    checked: false,
  },
];

const TIL = [
  {
    id: 1,
    category: "TIL",
    title: "04/23 TIL",
    day: "04/24",
    author: "최형순1",
  },
  {
    id: 2,
    category: "TIL",
    title: "04/24 TIL",
    day: "04/24",
    author: "최형순2",
  },
  {
    id: 3,
    category: "TIL",
    title: "04/25 TIL",
    day: "04/24",
    author: "최형순3",
  },
  {
    id: 4,
    category: "TIL",
    title: "04/26 TIL",
    day: "04/24",
    author: "최형순4",
  },
];

const LoggedInTIL = [
  {
    id: 1,
    category: "TIL",
    title: "04/23 TIL",
    day: "04/24 05:43",
    author: "최형순1",
  },
  {
    id: 2,
    category: "TIL",
    title: "04/24 TIL",
    day: "04/24 05:43",
    author: "최형순2",
  },
  {
    id: 3,
    category: "TIL",
    title: "04/25 TIL",
    day: "04/24 05:43",
    author: "최형순3",
  },
  {
    id: 4,
    category: "TIL",
    title: "04/26 TIL",
    day: "04/24 05:43",
    author: "최형순4",
  },
  {
    id: 5,
    category: "TIL",
    title: "04/23 TIL",
    day: "04/24 05:43",
    author: "최형순1",
  },
  {
    id: 6,
    category: "TIL",
    title: "04/24 TIL",
    day: "04/24 05:43",
    author: "최형순2",
  },
  {
    id: 7,
    category: "TIL",
    title: "04/25 TIL",
    day: "04/24 05:43",
    author: "최형순3",
  },
  {
    id: 8,
    category: "TIL",
    title: "04/26 TIL",
    day: "04/24 05:43",
    author: "최형순4",
  },
];

const PROJECT = [
  {
    id: 1,
    category: "Project",
    title: "JAVA_BlackJack",
    day: "11/22",
    link: "https://github.com/Pray2U/Java_Study_BlackJackProject",
    author: "Pray2U",
  },
  {
    id: 2,
    category: "Project",
    title: "JAVA_SnackLadder",
    day: "11/22",
    link: "https://github.com/Pray2U/Java_Study_SnakeLadderProject",
    author: "Pray2U",
  },
  {
    id: 3,
    category: "Project",
    title: "Pray2U HomePage FE",
    day: "11/25",
    link: "https://github.com/Pray2U/Pray2U_Homepage_FE",
    author: "Pray2U",
  },
  {
    id: 4,
    category: "Project",
    title: "Pray2U HomePage BE",
    day: "11/25",
    link: "https://github.com/Pray2U/Pray2U_Homepage_BE",
    author: "Pray2U",
  },
];

const LoggedInPROJECT = [
  {
    id: 1,
    category: "Project",
    title: "JAVA_BlackJack",
    day: "11/22",
    link: "https://github.com/Pray2U/Java_Study_BlackJackProject",
    author: "Pray2U",
  },
  {
    id: 2,
    category: "Project",
    title: "JAVA_SnackLadder",
    day: "11/22",
    link: "https://github.com/Pray2U/Java_Study_SnakeLadderProject",
    author: "Pray2U",
  },
  {
    id: 3,
    category: "Project",
    title: "Pray2U HomePage FE",
    day: "11/25",
    link: "https://github.com/Pray2U/Pray2U_Homepage_FE",
    author: "Pray2U",
  },
  {
    id: 4,
    category: "Project",
    title: "Pray2U HomePage BE",
    day: "11/25",
    link: "https://github.com/Pray2U/Pray2U_Homepage_BE",
    author: "Pray2U",
  },
];

const SEMINAR = [
  {
    id: 1,
    category: "Seminar",
    title: "데이터베이스 기초",
    day: "10/29",
    author: "김채하",
  },
  {
    id: 2,
    category: "Seminar",
    title: "데이터베이스 기초",
    day: "10/29",
    author: "김채하",
  },
  {
    id: 3,
    category: "Seminar",
    title: "데이터베이스 기초",
    day: "10/29",
    author: "김채하",
  },
  {
    id: 4,
    category: "Seminar",
    title: "데이터베이스 기초",
    day: "10/29",
    author: "김채하",
  },
];

const LoggedInSEMINAR = [
  {
    id: 1,
    category: "Seminar",
    title: "데이터베이스 기초",
    day: "10/29",
    author: "김채하",
  },
  {
    id: 2,
    category: "Seminar",
    title: "데이터베이스 기초",
    day: "10/29",
    author: "김채하",
  },
  {
    id: 3,
    category: "Seminar",
    title: "데이터베이스 기초",
    day: "10/29",
    author: "김채하",
  },
  {
    id: 4,
    category: "Seminar",
    title: "데이터베이스 기초",
    day: "10/29",
    author: "김채하",
  },
  {
    id: 5,
    category: "Seminar",
    title: "데이터베이스 기초",
    day: "10/29",
    author: "김채하",
  },
  {
    id: 6,
    category: "Seminar",
    title: "데이터베이스 기초",
    day: "10/29",
    author: "김채하",
  },
  {
    id: 7,
    category: "Seminar",
    title: "데이터베이스 기초",
    day: "10/29",
    author: "김채하",
  },
  {
    id: 8,
    category: "Seminar",
    title: "데이터베이스 기초",
    day: "10/29",
    author: "김채하",
  },
];

const Caterogies = ({ isLoggedIn }) => {

  const [categories, setCategories] = useState([...cate]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [til, setTil] = useState(null);
  const [project, setProject] = useState(null);
  const [seminar, setSeminar] = useState(null);
  const [pageSize, setPageSize] = useState(8);

  const setDatas = () => {
    if (isLoggedIn) {
      setProject([...LoggedInPROJECT]);
      setSeminar([...LoggedInSEMINAR]);
      setCategories([...LoggedIncate]);
      read_tilDataAPi();
    } else {
      setProject([...PROJECT]);
      setSeminar([...SEMINAR]);
      setSelectedCategory([...PROJECT]);
    }
  };

  const read_tilDataAPi = async () => {
    try {
      const url = `${process.env.REACT_APP_API_SERVER}/api/tils?page=${0}&size=${pageSize}&sort=id,desc`;
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${getCookie("accessToken")}`,
        },
        withCredentials: true,
      });
      if (response.status === 200) {
        console.log(response);
        let newTilList = response.data.data.content.map((data) => {
          let newOject = {
            id : data.id,
            category: "TIL",
            title: data.title,
            day: dayjs(data.createdDate).format("MM/DD"),
            author: data.user.writerName,
          }
          return newOject;
        })
        setTil([...newTilList]);
        setSelectedCategory([...newTilList]);
      } else {
        // 모달창 데이터 전송 오류
        alert("TIL 데이터를 불러오는데 실패했습니다.");
      }
    } catch (e) {
      console.log(e);
      alert(e.response.data.message);
    }
  };

  useEffect(() => {
    setDatas();
  }, [isLoggedIn]);

  const changeCategory = (categoryName) => {
    setCategories(
      categories.map((c) =>
        c.name === categoryName ? { ...c, checked: true } : { ...c, checked: false }
      )
    );
    if(categoryName === "TIL"){
      setSelectedCategory([...til]);
    }
    else if(categoryName === "Project"){
      setSelectedCategory([...project]);
    } else{
      setSelectedCategory([...seminar]);
    }
  };

  return (
    <>
      <div className="flex w-full h-[10%] justify-center">
        <div className="flex w-[35%] h-full mx-0 my-auto justify-center">
          {categories.map((c) => (
            <div
              className={
                c.checked
                  ? "flex text-[1.5rem] cursor-pointer text-white mx-3 my-auto items-center justify-center hover:text-white"
                  : "flex text-[1.5rem] cursor-pointer text-[#887FA0] mx-3 my-auto items-center justify-center"
              }
              key={c.id}
              onClick={() => changeCategory(c.name)}
            >
              {c.name}
            </div>
          ))}
        </div>
      </div>
      {selectedCategory &&
        categories.map(
          (c) =>
            c.checked && (
              <CategoryImage
                key={c.id}
                isLoggedIn={isLoggedIn}
                category={c.name}
                info={selectedCategory}
              />
            )
        )}
    </>
  );
};

export default Caterogies;
