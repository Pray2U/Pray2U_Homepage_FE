import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import Calendar from 'react-calendar';
import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';

import Title from "../components/Title/Title";
import TodoList from "../components/Event/TodoList";
import EventEditor from "../components/Event/EventEditor";
import Footer from "../components/Footer";

import '../styles/Event/Event.scss';
import '../styles/Event/Calendar.scss';
import { getCookie } from "../util/auth";

dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

const Event = () => {

    const navigate = useNavigate();

    const dayOfWeek = {
        1:'Monday',
        2:'Tuesday',
        3:'Wednesday',
        4:'Thursday',
        5:'Friday',
        6:'Saturday',
        0:'Sunday',
    }

    const [ isLoggedIn, setIsLoggedIn ] = useState(true);
    const [ eventApiData, setEventApiData ] = useState([]);
    const [ selectedDay, setSelectedDay ] = useState(new Date());
    const [ isAddEventView, setIsAddEventView ] = useState(false);
    const [ editEventData, setEditEventData ] = useState(null);
    const [ selectedYear, setSelectedYear ] = useState(dayjs(new Date()).format('YYYY'));
    const [ selectedMonth, setSelectedMonth ] = useState(dayjs(new Date()).format('MM'));
    
    const read_eventData = async() =>{
        try{
            const url = `${process.env.REACT_APP_API_SERVER}/api/events/${selectedYear}/${selectedMonth}`;
            const response = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${getCookie('accessToken')}`
                },
                withCredentials:true
            });
            if(response.status === 200){
                setEventApiData(response.data.data);
            }else{
                alert(response.data.message);
            }
        }catch(e){
            alert(e.response.data.message);
            // alert(e.response.data.error);
            navigate('/error');
        }
    }

    const onClickDay = () => {
        const formatDate = dayjs(selectedDay).format('YYYY-MM-DD');
        // console.log(formatDate);
        setSelectedDay(formatDate);
        if(isAddEventView){
            setIsAddEventView(false);
        }
    }

    const onRemove = async(id) => {
        try{
            // 모달창 띄우고
            const url = `${process.env.REACT_APP_API_SERVER}/api/events/${id}`;
            const response = await axios.delete(url,{
                headers: {
                    Authorization: `Bearer ${getCookie('accessToken')}`
                },
                withCredentials:true
            });
            if(response.status === 200){
                // setTodos(todos.filter(event => event.eventId !== id));
                setEventApiData(eventApiData => eventApiData.filter(event => event.eventId !== id));
                alert('이벤트가 삭제되었습니다.');
            }else{
                alert(response.data.message);
            }
        }catch(e){
            alert(e.response.data.message);
        }
    }

    const onToggle = (id) =>{
        eventApiData.map(event => {
            if (event.eventId === id){
                setEditEventData(event);
            }
        });
        setIsAddEventView(true);
    }

    const addEvent = () =>{
        setIsAddEventView(true);
        setEditEventData(null);
    }

    const canselAddEvent = () => {
        setIsAddEventView(false);
    }

    const saveEvent = (data) =>{
        const isExist = eventApiData.some((event) => event.eventId === data.eventId);
        if(isExist){
            setEventApiData(eventApiData => 
                eventApiData.map(event => event.eventId === data.eventId ? {...data}: event));
        }
        else{
            setEventApiData(eventApiData => eventApiData.concat(data));
        }   
    }
    
    const onChangeYearMonth = (props) => {
        if(props.action !== 'drillUp'){
            setSelectedYear(dayjs(props.activeStartDate).format('YYYY'));
            setSelectedMonth(dayjs(props.activeStartDate).format('MM'));
        }
    }

    const addDot = ({ date }) => {
        // 해당 날짜(하루)에 추가할 컨텐츠의 배열
        const contents = [];
        // date(각 날짜)가  리스트의 날짜와 일치하면 해당 컨텐츠 추가
        date = dayjs(date).format('YYYY-MM-DD');
        for(let i=0; i < eventApiData.length; i++){
            let sd = dayjs(eventApiData[i].eventStartDate).format('YYYY-MM-DD');
            let ed = dayjs(eventApiData[i].eventEndDate).format('YYYY-MM-DD');
            if(dayjs(date).isSameOrAfter(sd) && dayjs(date).isSameOrBefore(ed)){
                contents.push(
                    <div key={eventApiData[i].eventId} className="dot"/>
                );
                return <div key={eventApiData[i].eventId} className="dot"/>
            }
        }
        
        // return <div key={key}>{contents}</div>; // 각 날짜마다 해당 요소가 들어감
    };

    useEffect(()=>{
        read_eventData();
        // onClickDay();
    },[selectedYear, selectedMonth]);


    return(
        <>
            <div className="EventContainer">
                <Title title='이벤트'/> 
                <div className="EventMainBox">
                    <div className="EventCalendarBox">
                        <Calendar
                            locale="en"
                            onChange={setSelectedDay}
                            next2Label={null}
                            prev2Label={null}
                            value={selectedDay}
                            minDate={new Date(2023,1,1)}
                            maxDate={new Date(2025,12,31)}
                            formatDay={(locale, date) => dayjs(date).format('D')}
                            onActiveStartDateChange={(action) => onChangeYearMonth(action)}
                            calendarType='gregory'
                            tileContent={addDot}
                        />
                    </div>
                    <div className="MiddleLine"/>
                    <div className="EventDetailBox">
                        <div className="EventDetailTitle">
                            <p className="EventDetailDayOfWeek">{dayOfWeek[dayjs(selectedDay).day()]}</p>
                            <p className="EventDetailDay">{dayjs(selectedDay).format('D')}th</p>
                        </div>
                        {
                            !isAddEventView ?
                                <>
                                    <TodoList 
                                        todos={eventApiData?.filter((event) => dayjs(dayjs(event.eventStartDate).format('YYYY-MM-DD')).isSame(selectedDay))} 
                                        onRemove={onRemove} 
                                        onToggle={onToggle}/>
                                    <div className="AddEventButton" onClick={addEvent}>+ Add a new Event</div>
                                </>
                            :  <EventEditor 
                                canselAddEvent={canselAddEvent} 
                                isAddEventView={isAddEventView} 
                                eventInfo={editEventData} 
                                saveEvent={saveEvent}
                                />
                        }
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    )
};

export default Event;