import { AiTwotoneEdit, AiFillDelete } from "react-icons/ai";
import dayjs from "dayjs";
import '../../styles/Event/TodoItem.scss';

const TodoItem = ({todo, onRemove, onToggle}) =>{
    return(
        <div className="TodoItemBox">
            <div className="TodoContent">
                <p className="TodoTitle">{todo.title}</p>
                <p className="TodoTime">{dayjs(todo.eventStartDate).format('HH:mm')} ~ {dayjs(todo.eventEndDate).format('HH:mm')}</p>
            </div>
            <div className="TodoEditButton" onClick={()=>onToggle(todo.eventId)}>
                <AiTwotoneEdit/>
            </div>
            <div className="TodoDeleteButton" onClick={()=>onRemove(todo.eventId)}>
                <AiFillDelete/>
            </div>
        </div>
    );
}

export default TodoItem;