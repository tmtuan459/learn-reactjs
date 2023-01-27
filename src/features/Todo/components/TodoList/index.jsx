import React from "react";
import PropTypes from "prop-types";

TodoList.propTypes = {
  todoList: PropTypes.array,
};

TodoList.defaultProps = {
  todoList: [], // không truyền vào thì là mảng rỗng
};

function TodoList({ todoList }) {
  // trường hợp ít props có thể bỏ thế này
  // const {} = props; //trường hợp nhiều props thì nên để dưới này

  return (
    <ul>
      {todoList.map((todo) => (
        <li key={todo.id}>{todo.title}</li> // nếu item phwusc tạp nên tách ra todoItem component
      ))}
    </ul>
  );
}

export default TodoList;
