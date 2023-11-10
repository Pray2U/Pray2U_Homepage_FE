import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime';

export const timeTrans = (time) =>{
    if(dayjs(time).hour() > 12){
        return dayjs(time).format('YYYY.MM.DD. 오후 HH:mm');
    }
    return dayjs(time).format('YYYY.MM.DD. 오전 HH:mm');
};

export const noticeTime = (time) => {
    dayjs.extend(relativeTime);

    const timeReplace = {
        'few': '초전',
        'minute': '분전',
        'minutes': '분전',
        'hour': '시간전',
        'hours': '시간전',
        'day': '일전',
        'days': '일전',
        'month': '개월전',
        'months': '개월전',
        'year': '년전',
        'years': '년전',
    }

    let resultTime = dayjs(time).fromNow(true);
    const timeSplit = resultTime.split(' ');


    const numTime = isNaN(timeSplit[0]) ? 1 : timeSplit[0];
    return numTime + timeReplace[timeSplit[1]];

}