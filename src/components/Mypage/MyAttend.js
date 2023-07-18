import { useState } from "react";
import Calendar from 'react-calendar';
import dayjs from 'dayjs';

import { BsFillCheckCircleFill } from "react-icons/bs";
import '../../styles/MyPage/MyAttend.scss';
import axios from "axios";
import { useEffect } from "react";

const MyAttend = () =>{

    const dummyData = [
        {
            "attendancesId":1,
            "createDate":"2023-07-12"
        },//생략
        {
            "attendancesId":2,
            "createDate":"2023-07-13"
        },
        {
            "attendancesId":3,
            "createDate":"2023-07-14"
        },
        {
            "attendancesId":4,
            "createDate":"2023-07-17"
        },
        {
            "attendancesId":5,
            "createDate":"2023-07-18"
        },
        {
            "attendancesId":6,
            "createDate":"2023-07-19"
        }
    ];

    const [today, setToday] = useState(dayjs(new Date()).format("YYYY-MM-DD"));
    const [selectedMonth, setSelectedMonth] = useState(dayjs(new Date()).format("MM"));
    const [myAttendDayList, setMyAttendDayList] = useState(dummyData);

    const onChangeSelectedMonth = (e) => {
        setSelectedMonth(dayjs(e).format("MM"));
    }

    const post_MyAttendDay = async() => {
        try{
            const url = `/api/attendances`;
            const response = await axios.post(url);
            if(response.status.code === 200){
                setMyAttendDayList(myAttendDayList => myAttendDayList?.concat(response.data));
            }else{
                console.log("에러");
            }
        }catch(e){
            console.log(e);
        }
    }

    const read_MyAttendDay = async() =>{
        try{
            const url = `/api/attendances/${selectedMonth}`;
            console.log(url);
            const response = await axios.get(url);
            if(response.status.code === 200){
                setMyAttendDayList(response.data.content);
            }

        }catch(e){

        }
    }

    const addDot = ({ date }) => {
        // 해당 날짜(하루)에 추가할 컨텐츠의 배열
        const contents = [];
        // date(각 날짜)가  리스트의 날짜와 일치하면 해당 컨텐츠 추가
        myAttendDayList?.map((day) =>{
            if(dayjs(day.createDate).isSame(date)){
                contents.push(
                    <BsFillCheckCircleFill key={day.attendancesId} className="check"/>
                );
            }
        });
        return <div>{contents}</div>; // 각 날짜마다 해당 요소가 들어감
    };

    useEffect(()=>{
        // read_MyAttendDay();
    },[selectedMonth]);

    return(
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
                calendarType='US'
                tileContent={addDot}
            />
            <div className="AttendButton" onClick={post_MyAttendDay}>출석체크 하기</div>
        </div>
    );
}

export default MyAttend;