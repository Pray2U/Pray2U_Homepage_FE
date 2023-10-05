import { useState } from 'react';

import CalendarModal from './CalendarModal';
import dayjs from 'dayjs';

import Form from 'react-bootstrap/Form';
import { FcCalendar } from "react-icons/fc";

import '../../styles/Event/EventEditor.scss';
import axios from 'axios';

const EventEditor = ({canselAddEvent, isAddEventView, eventInfo, saveEvent}) =>{

    const hourTime = Array(24).fill(0);
    const minuteTime = ['00','15', '30', '45'];
    const regExp = /[:~]/g;
    const ss = eventInfo ? eventInfo?.time.split(regExp) : ["00","00","00","00"];

    const [title, setTitle] = useState(eventInfo?.title);
    const [date, setDate] = useState(eventInfo?.date);
    const [startHourTime, setStartHourTime] = useState(ss[0]);
    const [startMinuteTime, setStartMinuteTime] = useState(ss[1]);
    const [endHourTime, setEndHourTime] = useState(ss[2]);
    const [endMinuteTime, setEndMinuteTime] = useState(ss[3]);
    const [contents, setContents] = useState(eventInfo?.contents);
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);

    const onChangeTitle = (e) =>{
        setTitle(e.target.value);
    }

    const onChangeStartHourTime = (e) =>{
        setStartHourTime(e.target.value);
        if(e.target.value >= endHourTime){
            setEndHourTime(e.target.value);
        }
    }
    const onChangeStartMinuteTime = (e) => {
        setStartMinuteTime(e.target.value);
        if(e.target.value >= endMinuteTime){
            setEndMinuteTime(e.target.value);
        }
    }
    
    const onChangeEndHourTime = (e) =>{
        setEndHourTime(e.target.value);
    }
    const onChangeEndMinuteTime = (e) => {
        setEndMinuteTime(e.target.value);
    }

    const onChangeContents = (e) =>{
        setContents(e.target.value);
    }

    const openCalendarModal = () =>{
        setIsCalendarOpen(true);
    }
    
    const closeCalendarModal = () =>{
        setIsCalendarOpen(false);
    }

    const post_Event = async(id) => {
        try{
            let time = `${startHourTime}:${startMinuteTime} ~ ${endHourTime}:${endMinuteTime}`;
            console.log(title, date, time, contents);
            if(title && date && time && contents){
                const postData = {
                    title:title,
                    date:dayjs(date).format("YYYY-MM-DD"),
                    time:time,
                    contents:contents
                };
                let url;
                if(id){
                    url = ``        // 수정
                    postData.eventsId = id;
                    // 위의 데이터는 임시 삭제해도 됨
                }else{
                    url = ``        // 생성
                    postData.eventsId = parseInt(startHourTime + startMinuteTime);
                    // 위의 데이터는 임시 삭제해도 됨
                }
                // const response = await axios.post(url, postData);
                // if (response.status == 201 && response.status == 200){
                //     // 데이터 추가
                //     saveEvent(response.data.contents);
                // }
                console.log(postData);
                saveEvent(postData);
                canselAddEvent();
            }
            else{
                console.log("입력칸 채워줘");
            }
        }catch(e){
            console.log(e);
        }
    }


    return(
        <div className='EditorBox'>
            <div className='EditorTitle'>
                <div className='Title'>Title : </div>
                <input
                    className='TitleInput'
                    value={title||""}
                    onChange={onChangeTitle}
                />
            </div>
            <div className='EditorDate'>
                <div className='DateTitle'>Date : </div>
                <FcCalendar className='Icon' onClick={openCalendarModal}/>
                {
                    isCalendarOpen ?
                        <CalendarModal setSelectedDay={setDate} closeCalendarModal={closeCalendarModal}/>
                        : date ? 
                        <div className='Date'>{dayjs(date).format("YYYY-MM-DD")}</div>
                        : <></>
                }
            </div>
            <div className='EditorTime'>
                <div className='Time'>Time : </div>
                <Form.Select
                    className='TimeSelector'
                    onChange={onChangeStartHourTime}
                    value={startHourTime}>
                    {
                        hourTime.map((_, idx) =>{
                            const value = idx < 10 ? `0${idx}` : idx.toString();
                            return <option value={value}>{value}</option>
                        })
                    }
                </Form.Select>
                :
                <Form.Select
                    className='TimeSelector'
                    onChange={onChangeStartMinuteTime}
                    value={startMinuteTime}>
                    {
                        minuteTime.map(minute =>{
                            return <option value={minute}>{minute}</option>
                        })
                    }
                </Form.Select>
                ~
                <Form.Select
                    className='TimeSelector'
                    onChange={onChangeEndHourTime}
                    value={endHourTime}>
                    {
                        hourTime.map((_, idx) =>{
                            if (parseInt(startHourTime) <= idx){
                                const value = idx < 10 ? `0${idx}` : idx.toString();
                                return <option value={value}>{value}</option>
                            }
                        })
                    }
                </Form.Select>
                :
                <Form.Select
                    className='TimeSelector'
                    onChange={onChangeEndMinuteTime}
                    value={endMinuteTime}>
                    {
                        minuteTime.map(minute =>{
                            if(startHourTime === endHourTime){
                                if (parseInt(startMinuteTime) <= parseInt(minute))
                                    return <option value={minute}>{minute}</option>
                            }else{
                                return <option value={minute}>{minute}</option>
                            }
                        })
                    }
                </Form.Select>
            </div>
            <div className='EditorContents'>
                <div className='Contents'>Contents</div>
                <textarea
                    className='TextArea'
                    value={contents||""}
                    onChange={onChangeContents}
                />
            </div>
            <div className='EditorButtonBox'>
                <div className='EditorCancelButton' onClick={()=>canselAddEvent()}>취소</div>
                <div className='EditorSaveButton' onClick={()=>post_Event(eventInfo?.eventsId)}>저장</div>
            </div>
        </div>
    );
}

export default EventEditor;