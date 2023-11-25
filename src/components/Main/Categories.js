import { useEffect, useState } from "react";

import CategoryImage from "./CategoryImage";

import "../../styles/Main/Categories.scss";

const cate = [
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
    category: "TIL",
    title: "04/23 Project",
    day: "04/24 05:43",
    author: "최형순1",
  },
  {
    id: 2,
    category: "TIL",
    title: "04/24 Project",
    day: "04/24 05:43",
    author: "최형순2",
  },
  {
    id: 3,
    category: "TIL",
    title: "04/25 Project",
    day: "04/24 05:43",
    author: "최형순3",
  },
  {
    id: 4,
    category: "TIL",
    title: "04/26 Project",
    day: "04/24 05:43",
    author: "최형순4",
  },
];

const LoggedInPROJECT = [
  {
    id: 1,
    category: "TIL",
    title: "04/23 Project",
    day: "04/24 05:43",
    author: "최형순1",
  },
  {
    id: 2,
    category: "TIL",
    title: "04/24 Project",
    day: "04/24 05:43",
    author: "최형순2",
  },
  {
    id: 3,
    category: "TIL",
    title: "04/25 Project",
    day: "04/24 05:43",
    author: "최형순3",
  },
  {
    id: 4,
    category: "TIL",
    title: "04/26 Project",
    day: "04/24 05:43",
    author: "최형순4",
  },
  {
    id: 5,
    category: "TIL",
    title: "04/23 Project",
    day: "04/24 05:43",
    author: "최형순1",
  },
  {
    id: 6,
    category: "TIL",
    title: "04/24 Project",
    day: "04/24 05:43",
    author: "최형순2",
  },
  {
    id: 7,
    category: "TIL",
    title: "04/25 Project",
    day: "04/24 05:43",
    author: "최형순3",
  },
  {
    id: 8,
    category: "TIL",
    title: "04/26 Project",
    day: "04/24 05:43",
    author: "최형순4",
  },
];

const SEMINAR = [
  {
    id: 1,
    category: "TIL",
    title: "04/23 Seminar",
    day: "04/24 05:43",
    author: "최형순1",
  },
  {
    id: 2,
    category: "TIL",
    title: "04/24 Seminar",
    day: "04/24 05:43",
    author: "최형순2",
  },
  {
    id: 3,
    category: "TIL",
    title: "04/25 Seminar",
    day: "04/24 05:43",
    author: "최형순3",
  },
  {
    id: 4,
    category: "TIL",
    title: "04/26 Seminar",
    day: "04/24 05:43",
    author: "최형순4",
  },
];

const LoggedInSEMINAR = [
  {
    id: 1,
    category: "TIL",
    title: "04/23 Seminar",
    day: "04/24 05:43",
    author: "최형순1",
  },
  {
    id: 2,
    category: "TIL",
    title: "04/24 Seminar",
    day: "04/24 05:43",
    author: "최형순2",
  },
  {
    id: 3,
    category: "TIL",
    title: "04/25 Seminar",
    day: "04/24 05:43",
    author: "최형순3",
  },
  {
    id: 4,
    category: "TIL",
    title: "04/26 Seminar",
    day: "04/24 05:43",
    author: "최형순4",
  },
  {
    id: 5,
    category: "TIL",
    title: "04/23 Seminar",
    day: "04/24 05:43",
    author: "최형순1",
  },
  {
    id: 6,
    category: "TIL",
    title: "04/24 Seminar",
    day: "04/24 05:43",
    author: "최형순2",
  },
  {
    id: 7,
    category: "TIL",
    title: "04/25 Seminar",
    day: "04/24 05:43",
    author: "최형순3",
  },
  {
    id: 8,
    category: "TIL",
    title: "04/26 Seminar",
    day: "04/24 05:43",
    author: "최형순4",
  },
];

const Caterogies = ({ isLoggedIn }) => {
  const [categories, setCategories] = useState([...cate]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const [til, setTil] = useState(null);
  const [project, setProject] = useState(null);
  const [seminar, setSeminar] = useState(null);

  const setDatas = () => {
    if (isLoggedIn) {
      setTil([...LoggedInTIL]);
      setProject([...LoggedInPROJECT]);
      setSeminar([...LoggedInSEMINAR]);
      setSelectedCategory([...LoggedInTIL]);
    } else {
      setTil([...TIL]);
      setProject([...PROJECT]);
      setSeminar([...SEMINAR]);
      setSelectedCategory([...TIL]);
    }
  };

  useEffect(() => {
    setDatas();
  }, [isLoggedIn]);

  const changeCategory = (id) => {
    setCategories(
      categories.map((c) =>
        c.id === id ? { ...c, checked: true } : { ...c, checked: false }
      )
    );
    switch (id) {
      case 1:
        setSelectedCategory([...til]);
        break;
      case 2:
        setSelectedCategory([...project]);
        break;
      case 3:
        setSelectedCategory([...seminar]);
        break;
      default:
        break;
    }
  };

  return (
    <>
      <div className="flex w-full h-[15%] justify-center">
        <div className="flex w-[35%] h-full mx-0 my-auto justify-center">
          {categories.map((c) => (
            <div
              className={
                c.checked
                  ? "flex text-[1.5rem] cursor-pointer text-white mx-3 my-auto items-center justify-center hover:text-white"
                  : "flex text-[1.5rem] cursor-pointer text-[#887FA0] mx-3 my-auto items-center justify-center"
              }
              key={c.id}
              onClick={() => changeCategory(c.id)}
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
