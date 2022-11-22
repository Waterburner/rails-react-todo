import React, { useEffect, useState } from "react";
import "./App.css";
import { TodosContainer } from "src/components/Todos/TodosContainer";
import axios from "axios";
import { ITodos } from "./types/Todos";

function App() {
  const [todos, setTodos] = useState<ITodos[]>([]);

  useEffect(() => {
    axios
      .get("/api/v1/todos")
      .then((response) => {
        setTodos(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleUpdate = (e: React.ChangeEvent<HTMLInputElement>, id: number) => {
    axios
      .put(`/api/v1/todos/${id}`, { todo: { done: e.target.checked } })
      .then((response) => {
        setTodos((prev) => {
          return prev.map((todo) => {
            if (todo.id === response.data.id) return { ...response.data };
            return todo;
          });
        });
      });
  };

  const handleCreate = (todoItem: string) => {
    axios
      .post("/api/v1/todos", { todo: { title: todoItem, done: false } })
      .then((response) => {
        setTodos((prev) => [response.data, ...prev]);
      })
      .catch((error) => console.error(error));
  };

  const handleDelete = (id: number) => {
    axios
      .delete(`/api/v1/todos/${id}`)
      .then(() => setTodos((prev) => prev.filter((todo) => todo.id !== id)))
      .catch((error) => console.error(error));
  };

  return (
    <div className="App">
      <div className="header">
        <h1>Todo List</h1>
      </div>
      <TodosContainer
        todos={todos}
        handleUpdate={handleUpdate}
        handleCreate={handleCreate}
        handleDelete={handleDelete}
      />
    </div>
  );
}

export default App;
