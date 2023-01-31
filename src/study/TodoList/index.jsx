import React from "react";
import PropTypes from "prop-types";
import { Fragment } from "react";
import TodoForm from "../TodoForm";

TodoList.propTypes = {
  todos: PropTypes.array,
  onTodoClick: PropTypes.func,
};
TodoList.defaultProps = {
  // để cover cha không truyền xuống
  todos: [],
  onTodoClick: null,
};

function TodoList(props) {
  const { todos, onTodoClick, resetOnClick, submitOnClick } = props;

  function handleClick(todo) {
    if (onTodoClick) {
      onTodoClick(todo);
    }
  }
  function handleResetOnClick() {
    if (resetOnClick) resetOnClick();
  }
  function handleFormSubmit(formValue) {
    const newTodolist = [...todos];
    // add new item to current todoList

    const newTodo = {
      id: todos.length + 1,
      ...formValue,
    };
    newTodolist.push(newTodo);

    submitOnClick(newTodolist);
  }

  return (
    <Fragment>
      <div style={{ marginBottom: "20px" }}>
        <TodoForm onSubmit={handleFormSubmit} />
      </div>

      <ul className="todo-list">
        {todos.map((todo) => (
          <li key={todo.id} onClick={() => handleClick(todo)}>
            {todo.title}
          </li>
        ))}

        <button onClick={() => handleResetOnClick()}>resetList</button>
      </ul>
    </Fragment>
  );
}

export default TodoList;
