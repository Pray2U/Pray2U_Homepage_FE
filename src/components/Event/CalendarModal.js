
import Calendar from 'react-calendar';
import dayjs from 'dayjs';

import '../../styles/Event/ModalCalender.scss';


const CalendarModal = ({setSelectedDay, closeCalendarModal}) => {
    return(
        <>
            <Calendar
                className="ModalCalender"
                locale="en"
                onChange={setSelectedDay}
                next2Label={null}
                prev2Label={null}
                minDate={new Date(2023,1,1)}
                maxDate={new Date(2025,12,31)}
                // formatDay={(locale, date) => dayjs(date).format('D')}
                onClickDay={closeCalendarModal}
                calendarType='US'/>
        </>
    );
}

export default CalendarModal;