import { useState } from 'react';

import CalendarModal from './CalendarModal';
import dayjs from 'dayjs';

import Form from 'react-bootstrap/Form';
import { FcCalendar } from "react-icons/fc";

import '../../styles/Event/EventEditor.scss';

const EventEditor = ({canselAddEvent, isAddEventView, eventInfo}) =>{

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

    const post_Event = () => {
        let time = `${startHourTime}:${startMinuteTime} ~ ${endHourTime}:${endMinuteTime}`;
        if(title && date && time && contents){
            const data = {
                title:title,
                date:dayjs(date).format("YYYY-MM-DD"),
                time:time,
                contents:contents
            };
            console.log(data);
            console.log(ss);
        }
        else{
            console.log("입력칸 채워줘");
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
                <div className='EditorCancelButton' onClick={canselAddEvent}>취소</div>
                <div className='EditorSaveButton' onClick={post_Event}>저장</div>
            </div>
        </div>
    );
}

export default EventEditor;