import { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getCookie, isCheckAdmin, tokenDecode } from "../../util/auth";

import Title from "../../components/Title/Title";
import CreateButton from "../../components/CreateButton";
import TilItem from "../../components/Til/TilItem";
// import Reconfirm from '../components/Reconfirm';

import "../../styles/Til/Til.scss";

const defaultOption = {
  root: null,
  threshold: 0.5,
  rootMargin: "0px",
};

const Til = () => {
  const navigate = useNavigate();
  const pageSize = 10;

  const [isLoaded, setIsLoaded] = useState(true);
  const [target, setTarget] = useState(null);
  const [pageNumber, setPageNumber] = useState(0);
  const [totalPageNum, setTotalPageNum] = useState(null);
  const [apiTilDataList, setApiTilDataList] = useState([]);
  const [search, setSearch] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userId, setUserId] = useState(null);
  const [isSearch, setIsSearch] = useState(false);

  const onHandleSearch = (e) => {
    setSearch(e.target.value);
  };

  const searchClick = () => {
    setPageNumber(0);
    setApiTilDataList([]);
    setIsSearch(!isSearch);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setPageNumber(0);
      setApiTilDataList([]);
      setIsSearch(!isSearch);
    }
  };

  const read_tilDataAPi = async () => {
    try {
      const url = `${process.env.REACT_APP_API_SERVER}/api/tils?page=${pageNumber}&size=${pageSize}&sort=id,desc`;
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${getCookie("accessToken")}`,
        },
        withCredentials: true,
      });
      if (response.status === 200) {
        setApiTilDataList((apiTilDataList) =>
          apiTilDataList.concat(response.data.data.content)
        );
        setPageNumber((pageNumber) => pageNumber + 1);
        setIsLoaded(false);
        setTotalPageNum(response.data.totalPages);
      } else {
        // 모달창 데이터 전송 오류
        alert("TIL 데이터를 불러오는데 실패했습니다.");
        navigate("/error");
      }
    } catch (e) {
      alert(e.response.data.message);
      navigate("/error");
    }
  };

  const read_tilSearchAPi = async () => {
    try {
      const url = `${process.env.REACT_APP_API_SERVER}/api/tils?keyword=${search}&${pageNumber}&size=${pageSize}&sort=id,desc`;
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${getCookie("accessToken")}`,
        },
        withCredentials: true,
      });
      if (response.status === 200) {
        setApiTilDataList((apiTilDataList) =>
          apiTilDataList.concat(response.data.data.content)
        );
        setPageNumber((pageNumber) => pageNumber + 1);
        setIsLoaded(false);
        setTotalPageNum(response.data.totalPages);
      } else {
        // 모달창 데이터 전송 오류
        alert("TIL 데이터를 불러오는데 실패했습니다.");
        navigate("/error");
      }
    } catch (e) {
      alert(e.response.data.message);
      navigate("/error");
    }
  };

  const onRemove = async (id) => {
    try {
      const url = `${process.env.REACT_APP_API_SERVER}/api/tils/${id}`;
      const response = await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${getCookie("accessToken")}`,
        },
        withCredentials: true,
      });
      if (response.status === 200) {
        alert("TIL를 삭제했습니다.");
        setApiTilDataList((apiTilDataList) =>
          apiTilDataList.filter((til) => til.tilId !== id)
        );
      } else {
        alert("TIL 삭제를 실패했습니다.");
      }
    } catch (e) {
      alert(e.response.data.message);
    }
  };

  const onIntersect = async ([entry], observer) => {
    if (entry.isIntersecting && !isLoaded) {
      observer.unobserve(entry.target);
      if (search) {
        await read_tilSearchAPi();
      } else {
        await read_tilDataAPi();
      }
      observer.observe(entry.target);
    }
  };

  useEffect(() => {
    if (!search) {
      read_tilDataAPi();
    } else {
      read_tilSearchAPi();
    }
    const payload = tokenDecode(getCookie("accessToken"));
    if (payload) {
      setUserId(Number(payload.sub));
    }
    setIsAdmin(isCheckAdmin());
  }, [isSearch]);

  useEffect(() => {
    let observer; // (1)observer 변수를 선언해주고
    if (target) {
      // (2) 관찰대상이 존재하는지 체크한다.
      observer = new IntersectionObserver(onIntersect, {
        ...defaultOption,
      }); // (3) 관찰대상이 존재한다면 관찰자를 생성한다.
      observer.observe(target); // (4) 관찰자에게 타겟을 지정한다.
    }
    return () => observer && observer.disconnect(); // 의존성에 포함된 값이 바뀔때 관찰을 중지한다.
  }, [target]);

  return (
    <div className="w-[1080px] h-auto m-auto">
      <Title title="TIL" subTitle="Today I Learned" />
      <CreateButton link={"/til/create"} />
      <div className="flex items-center w-full h-[5vh] m-auto mt-[1rem] bg-[#6495ED] rounded-[0.5em]">
        <div className="flex items-center w-[30%] h-[80%] rounded-[4em] ml-[3rem] bg-white">
          <AiOutlineSearch
            className="ml-[1rem] w-[7%] h-[80%] bg-white"
            onClick={() => searchClick()}
          />
          <input
            className="pl-[2%] w-[80%] h-[90%] border-none outline-none"
            onChange={onHandleSearch}
            onKeyDown={handleKeyDown}
          />
        </div>
      </div>

      <div className="flex flex-col items-center w-full h-[10vh] m-auto mt-2 rounded-[1rem]">
        {apiTilDataList?.map((til) => (
          <TilItem
            key={til.tilId}
            tilInfo={til}
            onRemove={onRemove}
            isAdmin={isAdmin}
            userId={userId}
          />
        ))}
        {apiTilDataList.length === 0 && (
          <div className="w-full h-[300px] bg-gray-100 flex justify-center items-center">
            <div className="font-bold text-2xl">
              😮TIL이 존재하지 않습니다😮
            </div>
          </div>
        )}
        {totalPageNum > pageNumber ? (
          <div ref={setTarget}>{isLoaded && <p>Loading...</p>}</div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Til;
