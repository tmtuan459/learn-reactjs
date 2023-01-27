import React from "react";
import { useState } from "react";
import TodoList from "../components/TodoList";

TodoFeature.propTypes = {};

function TodoFeature(props) {
  const initTodoListData = [
    {
      id: 1,
      title: "Eat",
      status: "new",
    },
    {
      id: 2,
      title: "Sleep",
      status: "completed",
    },
    {
      id: 3,
      title: "Code",
      status: "new",
    },
  ];

  const [todoList, setTodoList] = useState(initTodoListData);

  const handleTodoClick = (todo, idx) => {
    // Làm việc với mảng phải clone ra mảng mới
    // Clone current array to the new one

    console.log(todo, idx);
    // toggle state

    // update todo list
  };

  return (
    <div>
      <h3>Todo List</h3>
      <TodoList todoList={todoList} onTodoClickParent={handleTodoClick} />
      {/* func onTodoClickParent truyền xuống con*/}
    </div>
  );
}

export default TodoFeature;
