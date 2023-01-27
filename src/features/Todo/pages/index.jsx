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

  const [todoList, setTodoList] = useState(initTodoListData); // chuyển todoList thành 1 state
  const [filteredStatus, setFilteredStatus] = useState("all");

  const handleTodoClick = (todo, idx) => {
    // Làm việc với mảng phải clone ra mảng mới
    // Clone current array to the new one
    const newTodoList = [...todoList]; // dấu  ... còn gọi là dấu hiệu lây lan: tạo new obj có hầu hết(or tất cả) các thuộc tính của obj hiện có

    console.log(todo, idx);
    // toggle state
    newTodoList[idx] = {
      // Muốn cập nhật vô vị trí của idx đó
      ...newTodoList[idx], //Với những giá trị hiện tại của nó, lấy tất cả thuộc tính của obj ra
      status: newTodoList[idx].status === "new" ? "completed" : "new", //thay đổi status của nó
    };

    // update todo list
    setTodoList(newTodoList);
  };

  const handleShowAllClick = () => {
    setFilteredStatus("all");
  };

  const handleShowCompletedClick = () => {
    setFilteredStatus("completed");
  };

  const handleShowNewClick = () => {
    setFilteredStatus("new");
  };

  const renderTodoList = todoList.filter(
    (todo) => filteredStatus === "all" || filteredStatus === todo.status
  );

  return (
    <div>
      <fieldset>
        <legend>
          <h3>Todo List</h3>{" "}
        </legend>

        <TodoList
          todoList={renderTodoList}
          onTodoClickParent={handleTodoClick}
        />
        {/* func onTodoClickParent truyền xuống con*/}

        <div>
          <button onClick={handleShowAllClick}>Show All Item</button>
          <button onClick={handleShowCompletedClick}>
            Show Completed Item
          </button>
          <button onClick={handleShowNewClick}>Show New Item</button>
        </div>
      </fieldset>
    </div>
  );
}

export default TodoFeature;
