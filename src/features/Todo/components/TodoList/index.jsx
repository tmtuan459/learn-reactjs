import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import "./styles.scss";
TodoList.propTypes = {
  todoList: PropTypes.array,
  onTodoClick: PropTypes.func,
};

TodoList.defaultProps = {
  todoList: [], // không truyền vào thì là mảng rỗng
  onTodoClick: null, // không required có thể null
};

function TodoList({ todoList, onTodoClickParent }) {
  // trường hợp ít props có thể bỏ thế này
  // const {} = props; //trường hợp nhiều props thì nên để dưới này

  const handleTodoClick = (todo, idx) => {
    if (!onTodoClickParent) return; //đây là func cha truyền xuống, nếu không truyền xuống thì không làm gì cả

    onTodoClickParent(todo, idx);
  };

  return (
    <ul className="todo-list">
      {todoList.map((todo, idx) => (
        <li
          key={todo.id}
          className={classNames({
            // install npm npm i --save classnames // dùng cái này thì rất gọn
            "todo-item": true, //ví dụ có nhiều class thì rất tiền
            completed: todo.status === "completed",
          })}
          onClick={() => handleTodoClick(todo, idx)}
        >
          {todo.title}
        </li> // nếu item phwusc tạp nên tách ra todoItem component
      ))}
    </ul>
  );
}

export default TodoList;
