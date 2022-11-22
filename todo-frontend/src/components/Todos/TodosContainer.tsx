import React from "react";
import { ITodos } from "src/types/Todos";

interface TodosContainerProps {
  todos: ITodos[];
  handleUpdate: (e: React.ChangeEvent<HTMLInputElement>, id: number) => void;
}

const TodosContainer: React.FC<TodosContainerProps> = ({
  todos,
  handleUpdate,
}) => {
  const handleUpdateTodo = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: number
  ) => {
    handleUpdate(e, id);
  };
  return (
    <div className="todosContainer">
      <div className="inputContainer">
        <input
          className="taskInput"
          type="text"
          placeholder="Add a task"
          maxLength={50}
        />
      </div>
      <div className="listWrapper">
        {!!todos.length && (
          <ul className="taskList">
            {todos.map((todo) => (
              <li className="task" key={todo.id}>
                <input
                  className="taskCheckbox"
                  type="checkbox"
                  onChange={(e) => handleUpdateTodo(e, todo.id)}
                  checked={todo.done}
                />
                <label className="taskLabel">{todo.title}</label>
                <span className="deleteTaskBtn">x</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export { TodosContainer };
