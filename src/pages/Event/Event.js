import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import Calendar from "react-calendar";
import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";

import Title from "../../components/Title/Title";
import TodoList from "../../components/Event/TodoList";
import EventEditor from "../../components/Event/EventEditor";
import Footer from "../../components/Footer";

import "../../styles/Event/Event.scss";
import "../../styles/Event/Calendar.scss";
import { getCookie, isCheckAdmin, tokenDecode } from "../../util/auth";

dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

const Event = () => {
  const navigate = useNavigate();

  const dayOfWeek = {
    1: "Monday",
    2: "Tuesday",
    3: "Wednesday",
    4: "Thursday",
    5: "Friday",
    6: "Saturday",
    0: "Sunday",
  };
  
  const [isAdmin, setIsAdmin] = useState(null);
  const [userId, setUserId] = useState(null);
  const [eventApiData, setEventApiData] = useState([]);
  const [selectedDay, setSelectedDay] = useState(new Date());
  const [isAddEventView, setIsAddEventView] = useState(false);
  const [editEventData, setEditEventData] = useState(null);
  const [selectedYear, setSelectedYear] = useState(
    dayjs(new Date()).format("YYYY")
  );
  const [selectedMonth, setSelectedMonth] = useState(
    dayjs(new Date()).format("MM")
  );
  const [reRender, setReRender] = useState(false);

  const read_eventData = async () => {
    try {
      const url = `${process.env.REACT_APP_API_SERVER}/api/events/${selectedYear}/${selectedMonth}`;
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${getCookie("accessToken")}`,
        },
        withCredentials: true,
      });
      if (response.status === 200) {
        setEventApiData(response.data.data);
      } else {
        alert(response.data.message);
      }
    } catch (e) {
      alert(e.response.data.message);
      navigate("/error");
    }
  };

  const onRemove = async (id) => {
    try {
      const url = `${process.env.REACT_APP_API_SERVER}/api/events/${id}`;
      const response = await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${getCookie("accessToken")}`,
        },
        withCredentials: true,
      });
      if (response.status === 200) {
        setReRender(!reRender);
        alert("이벤트가 삭제되었습니다.");
      } else {
        alert(response.data.message);
      }
    } catch (e) {
      alert(e.response.data.message);
    }
  };

  const onToggle = (id) => {
    eventApiData.map((event) => {
      if (event.eventId === id) {
        setEditEventData(event);
      }
    });
    setIsAddEventView(true);
  };

  const addEvent = () => {
    setIsAddEventView(true);
    setEditEventData(null);
  };

  const canselAddEvent = () => {
    setIsAddEventView(false);
  };

  const saveEvent = (data) => {
    setReRender(!reRender);
  };

  const onChangeYearMonth = (props) => {
    if (props.action !== "drillUp") {
      setSelectedYear(dayjs(props.activeStartDate).format("YYYY"));
      setSelectedMonth(dayjs(props.activeStartDate).format("MM"));
    }
  };

  const addDot = ({ date }) => {
    // 해당 날짜(하루)에 추가할 컨텐츠의 배열
    const contents = [];
    // date(각 날짜)가  리스트의 날짜와 일치하면 해당 컨텐츠 추가
    date = dayjs(date).format("YYYY-MM-DD");
    for (let i = 0; i < eventApiData.length; i++) {
      let sd = dayjs(eventApiData[i].eventStartDate).format("YYYY-MM-DD");
      let ed = dayjs(eventApiData[i].eventEndDate).format("YYYY-MM-DD");
      if (dayjs(date).isSameOrAfter(sd) && dayjs(date).isSameOrBefore(ed)) {
        contents.push(<div key={eventApiData[i].eventId} className="dot" />);
        return (
          <div
            key={eventApiData[i].eventId}
            className="h-[7px] w-[7px] bg-[#F34F50] rounded-[50%] flex m-auto mt-[5px]"
          />
        );
      }
    }

    // return <div key={key}>{contents}</div>; // 각 날짜마다 해당 요소가 들어감
  };

  useEffect(()=>{
    const payload = tokenDecode(getCookie('accessToken'));
    setUserId(Number(payload.sub));
    setIsAdmin(isCheckAdmin());
  },[]);

  useEffect(() => {
    read_eventData();
  }, [selectedYear, selectedMonth, reRender]);

  return (
    <>
      <div className="w-[1080px] h-auto m-auto mt-10">
        <Title title="이벤트" />
        <div className="flex w-full h-[600px] my-[40px] bg-white shadow-[1px_1px_3px_1px_#dadce0] rounded-1">
          <div className="flex w-[49%] h-full justify-center">
            <Calendar
              locale="en"
              onChange={setSelectedDay}
              next2Label={null}
              prev2Label={null}
              value={selectedDay}
              minDate={new Date(2023, 1, 1)}
              maxDate={new Date(2025, 12, 31)}
              formatDay={(locale, date) => dayjs(date).format("D")}
              onActiveStartDateChange={(action) => onChangeYearMonth(action)}
              calendarType="gregory"
              tileContent={addDot}
            />
          </div>
          <div className="w-[2%] h-full bg-[#9A58EE]" />
          <div className="w-[49%] h-[100%] m-auto">
            <div className="flex justify-center items-center w-[90%] h-[20%] border-b-[2px] border-b-solid border-b-[#E2E2E2] pt-[2%] m-auto">
              <p className="flex items-center text-[#F34F50] font-bold text-[2.25rem]">
                {dayOfWeek[dayjs(selectedDay).day()]}
              </p>
              <p className="ml-[1%] text-gray font-bold text-[1.5rem]">
                {dayjs(selectedDay).format("D")}th
              </p>
            </div>
            {!isAddEventView ? (
              <>
                <TodoList
                  todos={eventApiData?.filter((event) =>
                    dayjs(
                      dayjs(event.eventStartDate).format("YYYY-MM-DD")
                    ).isSame(dayjs(selectedDay).format("YYYY-MM-DD"))
                  )}
                  isAdmin={isAdmin}
                  userId={userId}
                  onRemove={onRemove}
                  onToggle={onToggle}
                />
                <div
                  className="flex items-center justify-center ml-auto mr-4 mt-2 w-[170px] h-[50px] text-whtie bg-[#9A58EE] text-white font-bold rounded-[0.5em] cursor-pointer hover:bg-[#9048ef]"
                  onClick={addEvent}
                >
                  + Add a new Event
                </div>
              </>
            ) : (
              <EventEditor
                canselAddEvent={canselAddEvent}
                isAddEventView={isAddEventView}
                eventInfo={editEventData}
                saveEvent={saveEvent}
              />
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Event;
