import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import queryString from "query-string";
import React, { useEffect, useMemo } from "react";
import { useState } from "react";
import { useHistory, useLocation, useRouteMatch } from "react-router-dom";
import DataTable from "../../../../Components/DataGrid";

import TodoList from "../../components/TodoList";

ListPage.propTypes = {};

function ListPage(props) {
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

  const location = useLocation(); //useLocation sẽ trả về location object hiện tại. Nó sẽ giúp ích trong trường hợp chúng ta muốn lấy thông tin từ URL hiện tại
  const history = useHistory(); //
  const match = useRouteMatch();
  const [todoList, setTodoList] = useState(initTodoListData); // chuyển todoList thành 1 state
  const [filteredStatus, setFilteredStatus] = useState(() => {
    const params = queryString.parse(location.search); // location.searhc sex lấy sau dấu hỏi chấm //queryString.parse chuyển URL sang object

    return params.status || "all";
  });

  const [alignment, setAlignment] = React.useState("all");

  // update url Param when click action
  useEffect(() => {
    const params = queryString.parse(location.search);

    setFilteredStatus(params.status || "all");
  }, [location.search]);

  const handleTodoClick = (todo, idx) => {
    // Làm việc với mảng phải clone ra mảng mới
    // Clone current array to the new one
    const newTodoList = [...todoList]; // dấu  ... còn gọi là dấu hiệu lây lan: tạo new obj có hầu hết(or tất cả) các thuộc tính của obj hiện có

    // console.log(todo, idx);
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
    // setFilteredStatus("all");

    const queryParams = { status: "all" };
    history.push({
      pathname: match.path,
      search: queryString.stringify(queryParams),
    });
  };

  const handleShowCompletedClick = () => {
    // setFilteredStatus("completed");

    const queryParams = { status: "completed" };
    history.push({
      pathname: match.path,
      search: queryString.stringify(queryParams),
    });
  };

  const handleShowNewClick = () => {
    // setFilteredStatus("new");

    const queryParams = { status: "new" };
    history.push({
      pathname: match.path,
      search: queryString.stringify(queryParams),
    });
  };

  const handleChange = (e, alignment) => {
    const param = e.target.value;

    if (param === "all") {
      handleShowAllClick();
      setAlignment("all");
    } else if (param === "completed") {
      handleShowCompletedClick();
      setAlignment("completed");
    } else if (param === "new") {
      handleShowNewClick();
      setAlignment("new");
    }
  };

  // C1
  // const renderTodoList = todoList.filter(
  //   (todo) => filteredStatus === "all" || filteredStatus === todo.status
  // );

  // C2
  const renderTodoList = useMemo(() => {
    return todoList.filter(
      (todo) => filteredStatus === "all" || filteredStatus === todo.status
    );
  }, [todoList, filteredStatus]);

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

        <div style={{ marginBottom: "30px" }}>
          <ToggleButtonGroup
            color="primary"
            value={alignment}
            exclusive
            onChange={handleChange}
            aria-label="Platform"
          >
            <ToggleButton value="all">Show All Item</ToggleButton>
            <ToggleButton value="completed"> Show Completed Item</ToggleButton>
            <ToggleButton value="new">Show New Item</ToggleButton>
          </ToggleButtonGroup>

          {/* <button onClick={handleShowAllClick}>Show All Item</button>
          <button onClick={handleShowCompletedClick}>
            Show Completed Item
          </button>
          <button onClick={handleShowNewClick}>Show New Item</button> */}
        </div>

        <DataTable />
      </fieldset>
    </div>
  );
}

export default ListPage;
