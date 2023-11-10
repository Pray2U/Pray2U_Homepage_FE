import { useState, useEffect } from "react";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { getCookie } from "../util/auth";
import { useNavigate } from "react-router-dom";
import Calendar from 'react-calendar';
import dayjs from 'dayjs';
import axios from "axios";

import MypageHeader from "../components/Header/MypageHeader";
import Title from "../components/Title/Title";
import Footer from "../components/Footer";

import '../styles/MyPage/MyAttend.scss';

const MyAttend = () => {

    const navigate = useNavigate();

    const [ today, setToday ] = useState(dayjs(new Date()).format("YYYY-MM-DD"));
    const [ year, setYear ] = useState(dayjs(new Date()).format('YYYY'));
    const [ selectedMonth, setSelectedMonth ] = useState(dayjs(new Date()).format("MM"));
    const [ myAttendDayList, setMyAttendDayList]  = useState([]);
    const [ checkedToday, setCheckedToday ] = useState(false);

    const onChangeSelectedMonth = (e) => {
        setSelectedMonth(dayjs(e).format("MM"));
    }

    const post_MyAttendDay = async() => {
        try{
            const url = `${process.env.REACT_APP_API_SERVER}/api/attendance`;
            const response = await axios.post(url,null,{
                headers:{
                    Authorization: `Bearer ${getCookie('accessToken')}`
                },
                withCredentials:true
            });
            if(response.status === 200){
                setMyAttendDayList(myAttendDayList => myAttendDayList?.concat(response.data));
                setCheckedToday(true);
            }else{
                alert('출석 오류가 발생했습니다.');
                // location.reload();
            }
        }catch(e){
            alert(e.response.data.message);
            navigate('/');
        }
    }

    const read_MyAttendDay = async() =>{
        try{
            const url = `${process.env.REACT_APP_API_SERVER}/api/attendance/${year}/${selectedMonth}`;
            const response = await axios.get(url,{
                headers:{
                    Authorization: `Bearer ${getCookie('accessToken')}`
                },
                withCredentials:true
            });
            if(response.status === 200){
                let attend_list = response.data.data;
                setMyAttendDayList(attend_list);
                for(let i=0; i < attend_list.length; i++){
                    let formatDate = dayjs(attend_list[i].createDate).format("YYYY-MM-DD");
                    if(dayjs(formatDate).isSame(today)){
                        setCheckedToday(true);
                        break;
                    }
                }
            }
        }catch(e){
            alert(e.response.data.message);
            navigate('/');
        }
    }

    
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
        date = dayjs(date).format('YYYY-MM-DD');
        for(let i=0; i < myAttendDayList.length; i++){
            let formatDate = dayjs(myAttendDayList[i].createDate).format('YYYY-MM-DD');
            if(dayjs(formatDate).isSame(date)){
                return <BsFillCheckCircleFill key={myAttendDayList[i].attendanceId} className="check"/>
            }
        }
        // return <div>{contents}</div>; // 각 날짜마다 해당 요소가 들어감
    };

    useEffect(()=>{
        read_MyAttendDay();
    },[selectedMonth]);


    return(
        <>
            <div className="MyAttendContainer">
                <Title title={'Mypage'}/>
                <MypageHeader/>
                <div className="MyAttendBox">
                    <Calendar
                        locale="en"
                        className="Calendar"
                        onChange={(value,event) => onChangeSelectedMonth(value)}
                        nextLabel={null}
                        next2Label={null}
                        prevLabel={null}
                        prev2Label={null}
                        value={new Date()}
                        minDate={new Date(2023,5,1)}
                        maxDate={new Date(today)}
                        formatDay={(locale, date) => dayjs(date).format('D')}
                        calendarType="gregory"
                        tileContent={addDot}
                    />{
                        checkedToday ? 
                        <div className="CheckedAttendButton">출석 완료</div> :
                        <div className="AttendButton" onClick={()=>post_MyAttendDay()}>출석하기</div>
                    }
                </div>
            </div>
            <Footer/>
        </>
    );
}

export default MyAttend;