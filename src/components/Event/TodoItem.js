import { AiTwotoneEdit, AiFillDelete } from "react-icons/ai";
import dayjs from "dayjs";
import "../../styles/Event/TodoItem.scss";

const TodoItem = ({ todo, isAdmin, userId, onRemove, onToggle }) => {
  return (
    <div className="flex w-full h-[25%] border-b-[2px] border-b-solid border-b-[#E2E2E2]">
      <div className="w-[80%] h-full">
        <p className="font-bold mt-[5%] ml-[3%] text-black">{todo.title}</p>
        <p className="mb-[5%] ml-[3%] text-gray">
          {dayjs(todo.eventStartDate).format("HH:mm")} ~{" "}
          {dayjs(todo.eventEndDate).format("HH:mm")}
        </p>
      </div>
      {
        userId === todo?.user.writerId ?
          <div
          className="flex items-center justify-center w-[8%] h-[40%] bg-[#E2E2E2] rounded-[0.5em] m-auto mr-[1%] cursor-pointer"
          onClick={() => onToggle(todo.eventId)}>
            <AiTwotoneEdit />
          </div>
        : <div className="flex items-center justify-center w-[8%] h-[40%] m-auto mr-[1%]"></div>
      }
      {
        userId === todo?.user.writerId || isAdmin ?
          <div
            className="flex items-center justify-center w-[8%] h-[40%] bg-[#FFB7B7] rounded-[0.5em] m-auto cursor-pointer"
            onClick={() => onRemove(todo.eventId)}>
            <AiFillDelete />
          </div>
        :<div className="flex items-center justify-center w-[8%] h-[40%] m-auto mr-[1%]"></div>
      }
    </div>
  );
};

export default TodoItem;
