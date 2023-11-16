import { useState, useEffect } from "react";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { getCookie } from "../../util/auth";
import { useNavigate } from "react-router-dom";
import Calendar from "react-calendar";
import dayjs from "dayjs";
import axios from "axios";

import MypageHeader from "../../components/Header/MypageHeader";
import Title from "../../components/Title/Title";
import Footer from "../../components/Footer";

import "../../styles/MyPage/MyAttend.scss";

const MyAttend = () => {
  const navigate = useNavigate();

  const [today, setToday] = useState(dayjs(new Date()).format("YYYY-MM-DD"));
  const [year, setYear] = useState(dayjs(new Date()).format("YYYY"));
  const [selectedMonth, setSelectedMonth] = useState(
    dayjs(new Date()).format("MM")
  );
  const [myAttendDayList, setMyAttendDayList] = useState([]);
  const [checkedToday, setCheckedToday] = useState(false);

  const onChangeSelectedMonth = (e) => {
    setSelectedMonth(dayjs(e).format("MM"));
  };

  const post_MyAttendDay = async () => {
    try {
      const url = `${process.env.REACT_APP_API_SERVER}/api/attendance`;
      const response = await axios.post(url, null, {
        headers: {
          Authorization: `Bearer ${getCookie("accessToken")}`,
        },
        withCredentials: true,
      });
      if (response.status === 200) {
        setMyAttendDayList((myAttendDayList) =>
          myAttendDayList?.concat(response.data)
        );
        setCheckedToday(true);
      } else {
        alert("출석 오류가 발생했습니다.");
        // location.reload();
      }
    } catch (e) {
      alert(e.response.data.message);
      navigate("/");
    }
  };

  const read_MyAttendDay = async () => {
    try {
      const url = `${process.env.REACT_APP_API_SERVER}/api/attendance/${year}/${selectedMonth}`;
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${getCookie("accessToken")}`,
        },
        withCredentials: true,
      });
      if (response.status === 200) {
        let attend_list = response.data.data;
        setMyAttendDayList(attend_list);
        for (let i = 0; i < attend_list.length; i++) {
          let formatDate = dayjs(attend_list[i].createDate).format(
            "YYYY-MM-DD"
          );
          if (dayjs(formatDate).isSame(today)) {
            setCheckedToday(true);
            break;
          }
        }
      }
    } catch (e) {
      alert(e.response.data.message);
      navigate("/");
    }
  };

  const addDot = ({ date }) => {
    // 해당 날짜(하루)에 추가할 컨텐츠의 배열
    // const contents = [];
    // // date(각 날짜)가  리스트의 날짜와 일치하면 해당 컨텐츠 추가
    // myAttendDayList?.map((day) =>{
    //     let formatDate = dayjs(day.createDate).format('YYYY-MM-DD');
    //     if(dayjs(formatDate).isSame(date)){
    //         contents.push(
    //             <BsFillCheckCircleFill key={day.attendanceId} className="check"/>
    //         );
    //         return <BsFillCheckCircleFill key={day.attendanceId} className="check"/>
    //     }
    // });
    date = dayjs(date).format("YYYY-MM-DD");
    for (let i = 0; i < myAttendDayList.length; i++) {
      let formatDate = dayjs(myAttendDayList[i].createDate).format(
        "YYYY-MM-DD"
      );
      if (dayjs(formatDate).isSame(date)) {
        return (
          <BsFillCheckCircleFill
            key={myAttendDayList[i].attendanceId}
            className="check"
          />
        );
      }
    }
    // return <div>{contents}</div>; // 각 날짜마다 해당 요소가 들어감
  };

  useEffect(() => {
    read_MyAttendDay();
  }, [selectedMonth]);

  return (
    <>
      <div className="w-[1080px] h-auto m-auto">
        <Title title={"Mypage"} />
        <MypageHeader />
        <div className="w-full h-[35rem] m-auto my-4 py-8 rounded-[0.5rem] border-[0.1rem] border-solid border-[#dadce0] shadow-[1px_1px_3px_1px_#dadce0]">
          <Calendar
            locale="en"
            className="m-auto mt-[2.5%] checked:mt-[6px] checked:bg-red"
            onChange={(value, event) => onChangeSelectedMonth(value)}
            nextLabel={null}
            next2Label={null}
            prevLabel={null}
            prev2Label={null}
            value={new Date()}
            minDate={new Date(2023, 5, 1)}
            maxDate={new Date(today)}
            formatDay={(locale, date) => dayjs(date).format("D")}
            calendarType="gregory"
            tileContent={addDot}
          />
          {checkedToday ? (
            <div className="flex items-center justify-center w-[35%] h-[3rem] m-auto mt-4 bg-[rgb(91,88,88)] text-white rounded-[1rem]">
              출석 완료
            </div>
          ) : (
            <div
              className="flex w-[35%] h-[3rem] m-auto mt-4 mb-[2.5%] items-center justify-center bg-[#0090F9] rounded-[1rem] text-white cursor-pointer hover:bg-[#0B7FD3]"
              onClick={() => post_MyAttendDay()}
            >
              출석하기
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MyAttend;
