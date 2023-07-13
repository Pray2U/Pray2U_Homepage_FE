import axios from "axios";
import Calendar from 'react-calendar';
import dayjs from 'dayjs';
import { useState, useEffect } from "react";

import Header from "../components/Header/Header";
import TodoList from "../components/Event/TodoList";

// import 'react-calendar/dist/Calendar.css';
import '../styles/Event/Eventpage.scss';
import '../styles/Event/Calender.scss';


const Eventpage = () => {

    const dayOfWeek = {
        1:'Monday',
        2:'Tuesday',
        3:'Wednesday',
        4:'Thursday',
        5:'Friday',
        6:'Saturday',
        0:'Sunday',
    }

    const dummyData = [
        {
            "eventsId" : 1,
            "title": "Work Time",
            "date": "2023-07-20",
            "time": "06:00",
            "contents": "이벤트",
            "createDate": "2023-06-31",
            "modifiedDate": "2023-07-01"
        },
        {
            "eventsId" : 2,
            "title": "Work Time",
            "date": "2023-07-22",
            "time": "06:00",
            "contents": "이벤트",
            "createDate": "2023-06-31",
            "modifiedDate": "2023-07-01"
        },
        {
            "eventsId" : 3,
            "title": "Work Time",
            "date": "2023-07-22",
            "time": "06:00",
            "contents": "이벤트",
            "createDate": "2023-06-31",
            "modifiedDate": "2023-07-01"
        },
        {
            "eventsId" : 4,
            "title": "Work Time",
            "date": "2023-07-22",
            "time": "06:00",
            "contents": "이벤트",
            "createDate": "2023-06-31",
            "modifiedDate": "2023-07-01"
        },
        {
            "eventsId" : 5,
            "title": "Work Time",
            "date": "2023-07-22",
            "time": "06:00",
            "contents": "이벤트",
            "createDate": "2023-06-31",
            "modifiedDate": "2023-07-01"
        },
        {
            "eventsId" : 12,
            "title": "Work Time",
            "date": "2023-07-22",
            "time": "06:00",
            "contents": "이벤트",
            "createDate": "2023-06-31",
            "modifiedDate": "2023-07-01"
        }
    ]

    const [ isLoggedIn, setIsLoggedIn ] = useState(true);
    const [ eventApiData, setEventApiData ] = useState(dummyData);
    const [ selectedDay, setSelectedDay ] = useState(new Date());
    const [ todos, setTodos ] = useState(null);
    
    const read_eventData = async() =>{
        try{
            const url = `url`;
            const response = await axios.get(url);
            setEventApiData(response.data.content);
        }catch(e){
            console.log(e);
        }
    }

    const onClickDay = () => {
        const formatDate = dayjs(selectedDay).format('YYYY-MM-DD');
        console.log(formatDate);
        setSelectedDay(formatDate);
        setTodos(eventApiData.filter((event) => dayjs(event.date).isSame(selectedDay)));
        console.log(todos);
    }

    const onRemove = async(id) => {
        try{
            //모달창 띄우고
            // const url = `${id}`;
            // const response = await axios.post(url);
            // if(response.status === 200){

            // }
        }catch(e){
            console.log(e);
        }
    }

    const onToggle = (id) =>{

    }

    const addEvent = () =>{

    }

    const addDot = ({ date }) => {
        // 해당 날짜(하루)에 추가할 컨텐츠의 배열
        const contents = [];
    
        // date(각 날짜)가  리스트의 날짜와 일치하면 해당 컨텐츠(이모티콘) 추가
        if (eventApiData.find((day) => day.date === dayjs(date).format('YYYY-MM-DD'))){
            contents.push(
                <>
                    <div className="dot"/>
                </>
            );
        }
        return <div>{contents}</div>; // 각 날짜마다 해당 요소가 들어감
    };

    useEffect(()=>{
        // read_eventData();
        onClickDay();
    },[selectedDay])


    return(
        <div className="EventContainer">
            <Header isLoggedIn={isLoggedIn}/>
            <div className="EventTitleBox">
                <div className="Title">Event</div>
                <div className="Month">{dayjs(selectedDay).format('MMMM')}</div>
                <div className="Year">{dayjs(selectedDay).format('YYYY')}</div>
            </div>
            <div className="EventMainBox">
                <div className="EventCalendarBox">
                    <Calendar
                        locale="en"
                        className="Calender"
                        onChange={setSelectedDay}
                        next2Label={null}
                        prev2Label={null}
                        value={selectedDay}
                        formatDay={(locale, date) => dayjs(date).format('D')}
                        calendarType='US'
                        tileContent={addDot}
                    />
                </div>
                <div className="MiddleLine"/>
                <div className="EventDetailBox">
                    <div className="EventDetailTitle">
                        <p className="EventDetailDayOfWeek">{dayOfWeek[dayjs(selectedDay).day()]}</p>
                        <p className="EventDetailDay">{dayjs(selectedDay).format('D')}th</p>
                    </div>
                    <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle}/>
                    <div className="AddEventButton" onClick={()=>addEvent()}> + Add a new Event</div>
                </div>
            </div>
        </div>
    );
}

export default Eventpage;