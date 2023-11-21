import TodoItem from "./TodoItem";

import "../../styles/Event/TodoList.scss";

const TodoList = ({ todos, isAdmin, userId, onRemove, onToggle }) => {
  return (
    <div className="w-[90%] h-[65%] overflow-auto m-auto">
      {todos?.map((todo) => (
        <TodoItem
          todo={todo}
          key={todo.eventId}
          isAdmin={isAdmin}
          userId={userId}
          onRemove={onRemove}
          onToggle={onToggle}
        />
      ))}
    </div>
  );
};

export default TodoList;
