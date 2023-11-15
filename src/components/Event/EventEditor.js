import { useState, useEffect } from "react";

import CalendarModal from "./CalendarModal";
import dayjs from "dayjs";
import axios from "axios";
import Form from "react-bootstrap/Form";
import { getCookie } from "../../util/auth";
import { FcCalendar } from "react-icons/fc";

import "../../styles/Event/EventEditor.scss";

const EventEditor = ({
  canselAddEvent,
  isAddEventView,
  eventInfo,
  saveEvent,
}) => {
  const hourTime = Array(24).fill(0);
  const minuteTime = ["00", "15", "30", "45"];
  const regExp = /[:~]/g;
  const ss = eventInfo
    ? eventInfo?.eventStartDate.split(regExp)
    : ["00", "00", "00", "00"];

  const [title, setTitle] = useState(eventInfo?.title);
  const [startDate, setStartDate] = useState(eventInfo?.eventStartDate);
  const [endDate, setEndDate] = useState(eventInfo?.eventEndDate);
  const [startHourTime, setStartHourTime] = useState("00");
  const [startMinuteTime, setStartMinuteTime] = useState("00");
  const [endHourTime, setEndHourTime] = useState("00");
  const [endMinuteTime, setEndMinuteTime] = useState("00");
  const [contents, setContents] = useState(eventInfo?.contents);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  useEffect(() => {
    if (eventInfo) {
      setStartHourTime(dayjs(eventInfo?.eventStartDate).format("HH"));
      setStartMinuteTime(dayjs(eventInfo?.eventStartDate).format("mm"));
      setEndHourTime(dayjs(eventInfo?.eventEndDate).format("HH"));
      setEndMinuteTime(dayjs(eventInfo?.eventEndDate).format("mm"));
    }
  }, []);

  const onChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  const onChangeStartHourTime = (e) => {
    setStartHourTime(e.target.value);
    if (e.target.value >= endHourTime) {
      setEndHourTime(e.target.value);
    }
  };
  const onChangeStartMinuteTime = (e) => {
    setStartMinuteTime(e.target.value);
    if (e.target.value >= endMinuteTime) {
      setEndMinuteTime(e.target.value);
    }
  };

  const onChangeEndHourTime = (e) => {
    setEndHourTime(e.target.value);
  };
  const onChangeEndMinuteTime = (e) => {
    setEndMinuteTime(e.target.value);
  };

  const onChangeContents = (e) => {
    setContents(e.target.value);
  };

  const openCalendarModal = () => {
    setIsCalendarOpen(true);
  };

  const closeCalendarModal = () => {
    setIsCalendarOpen(false);
  };

  const post_Event = async (id) => {
    try {
      let start = dayjs(startDate).format("YYYY-MM-DD");
      let eventStartDate = `${start}T${startHourTime}:${startMinuteTime}:00`;
      let eventEndDate = `${start}T${endHourTime}:${endMinuteTime}:00`;
      if (title && eventStartDate && eventEndDate && contents) {
        const postData = {
          title: title,
          eventStartDate: eventStartDate,
          eventEndDate: eventEndDate,
          contents: contents,
        };
        let url = `${process.env.REACT_APP_API_SERVER}/api/events`;
        if (id) {
          // 수정
          postData.eventId = id;
          const response = await axios.put(url, postData, {
            headers: {
              Authorization: `Bearer ${getCookie("accessToken")}`,
            },
            withCredentials: true,
          });
          if (response.status === 200) {
            alert("이벤트가 등록되었습니다.");
            saveEvent(response.data.data);
            canselAddEvent();
          }
        } else {
          const response = await axios.post(url, postData, {
            headers: {
              Authorization: `Bearer ${getCookie("accessToken")}`,
            },
            withCredentials: true,
          });
          if (response.status === 200) {
            alert("이벤트가 등록되었습니다.");
            saveEvent(response.data.data);
            canselAddEvent();
          }
        }
      } else {
        console.log("입력칸 채워줘");
        //모달창 띄우기
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="w-full h-[77.5%]">
      <div className="flex w-[90%] h-[20%] items-center m-auto">
        <div className="flex w-[10%] h-[50%] items-center justify-center font-bold">
          Title :{" "}
        </div>
        <input
          className="w-[70%] h-[50%] ml-[2%] pl-[2%] rounded-[0.5em] shadow-sm shadow-[#c0c2c7] border-none text-[1rem] focus:outline-none focus:border-[2px] focus:border-solid focus:border-[#9A58EE]"
          value={title || ""}
          onChange={onChangeTitle}
        />
      </div>
      <div className="flex w-[90%] h-[15%] items-center m-auto">
        <div className="flex mr-[0.25rem] h-[50%] items-center justify-center font-bold">
          Date :{" "}
        </div>
        <FcCalendar
          className="w-[10%] h-[70%] cursor-pointer"
          onClick={openCalendarModal}
        />
        {startDate && !isCalendarOpen ? (
          <div className="flex items-center justify-center w-[25%] h-[60%] font-bold rounded-[0.5em] shadow-sm shadow-[#c0c2c7] ml-[2%]">
            {dayjs(startDate).format("YYYY-MM-DD")}
          </div>
        ) : isCalendarOpen ? (
          <CalendarModal
            setSelectedDay={setStartDate}
            closeCalendarModal={closeCalendarModal}
          />
        ) : (
          // : date ?
          // <div className='Date'>{dayjs(date).format("YYYY-MM-DD")}</div>
          <></>
        )}
      </div>
      <div className="flex w-[90%] h-[20%] items-center m-auto">
        <div className="flex items-center justify-center h-[50%] mr-[0.25rem] font-bold">
          Time :{" "}
        </div>
        <Form.Select
          className="ml-[2%] mr-[2%] w-[15%] h-[50%] text-[1rem]"
          onChange={onChangeStartHourTime}
          value={startHourTime}
        >
          {hourTime.map((_, idx) => {
            const value = idx < 10 ? `0${idx}` : idx.toString();
            return (
              <option key={idx * 10} value={value}>
                {value}
              </option>
            );
          })}
        </Form.Select>
        :
        <Form.Select
          className="ml-[2%] mr-[2%] w-[15%] h-[50%] text-[1rem]"
          onChange={onChangeStartMinuteTime}
          value={startMinuteTime}
        >
          {minuteTime.map((minute) => {
            return (
              <option key={minute * 10} value={minute}>
                {minute}
              </option>
            );
          })}
        </Form.Select>
        ~
        <Form.Select
          className="ml-[2%] mr-[2%] w-[15%] h-[50%] text-[1rem]"
          onChange={onChangeEndHourTime}
          value={endHourTime}
        >
          {hourTime.map((_, idx) => {
            if (parseInt(startHourTime) <= idx) {
              const value = idx < 10 ? `0${idx}` : idx.toString();
              return (
                <option key={idx * 100} value={value}>
                  {value}
                </option>
              );
              //idx*100 -> 시작 시간의 시간 리스트 끼리 key값을 다르게 나타내기 위해
            }
          })}
        </Form.Select>
        :
        <Form.Select
          className="ml-[2%] mr-[2%] w-[15%] h-[50%] text-[1rem]"
          onChange={onChangeEndMinuteTime}
          value={endMinuteTime}
        >
          {minuteTime.map((minute) => {
            if (startHourTime === endHourTime) {
              if (parseInt(startMinuteTime) <= parseInt(minute))
                return (
                  <option key={minute * 100} value={minute}>
                    {minute}
                  </option>
                );
            } else {
              return (
                <option key={minute * 100} value={minute}>
                  {minute}
                </option>
              );
              //minute*100 -> 시작 시간의 분 리스트 끼리 key값을 다르게 나타내기 위해
            }
          })}
        </Form.Select>
      </div>
      <div className="w-[90%] h-[30%] items-center m-auto">
        <div className="w-full mb-[1%] font-bold">Contents</div>
        <textarea
          className="w-full h-[60%] pl-[2%] pt-[1%] rounded-[0.5em] shadow-sm shadow-[#c0c2c7] border-none resize-none overflow-auto text-[1rem] focus:outline-none focus:border-[2ox] focus:border-solid focus:border-[#9A58EE]"
          value={contents || ""}
          onChange={onChangeContents}
        />
      </div>
      <div className="flex justify-end m-auto w-[90%] h-[10%]">
        <div
          className="flex w-[13%] h-[95%] items-center justify-center ml-[3%] ml-auto rounded-[0.5rem] bg-[#F34F50] text-white font-bold cursor-pointer hover:bg-[#dc3a3a]"
          onClick={() => canselAddEvent()}
        >
          취소
        </div>
        <div
          className="flex w-[13%] h-[95%] items-center justify-center ml-[3%] ml-auto rounded-[0.5rem] bg-[#0090F9] text-white font-bold cursor-pointer hover:bg-[#0B7FD3]"
          onClick={() => post_Event(eventInfo?.eventId)}
        >
          저장
        </div>
      </div>
    </div>
  );
};

export default EventEditor;
