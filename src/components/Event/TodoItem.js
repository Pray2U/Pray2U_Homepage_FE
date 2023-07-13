import { AiTwotoneEdit, AiFillDelete } from "react-icons/ai";
import '../../styles/Event/TodoItem.scss';

const TodoItem = ({todo, onRemove, onToggle}) =>{
    return(
        <div className="TodoItemBox">
            <div className="TodoContent">
                <p className="TodoTitle">{todo.title}</p>
                <p className="TodoTime">{todo.time}</p>
            </div>
            <div className="TodoEditButton" onClick={()=>onToggle(todo.id)}>
                <AiTwotoneEdit/>
            </div>
            <div className="TodoDeleteButton" onClick={()=>onRemove(todo.id)}>
                <AiFillDelete/>
            </div>
        </div>
    );
}

export default TodoItem;