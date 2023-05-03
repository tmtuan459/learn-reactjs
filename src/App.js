import { Grid } from "@mui/material";
import Study from "Components/Home";
import ProductFeature from "features/Product";
// import { useSnackbar } from "notistack";
import queryString from "query-string";
import { useEffect, useState } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import ColorBoxHook from "study/ColorBox";
import "./App.scss";
import ColorBox from "./Components/ColorBox";
import Counter from "./Components/Counter";
import Header from "./Components/Header";
import MagicBox from "./Components/MagicBox";
import NotFound from "./Components/NotFound";
import Pagination from "./Components/Pagination";
import PostFiltersForm from "./Components/PostFiltersForm";
import PostList from "./Components/PostList";
import AlbumFeature from "./features/Album";
import CounterFearture from "./features/CounterSlice";
import ListCategoryFeature from "./features/ListCategory/pages";
import TodoFeature from "./features/Todo/pages";

import CounterPrev from "./study/PrevValueRef";
import TodoList from "./study/TodoList";

function App() {
  const [isShowHook, setIsShowHook] = useState(true);

  const [todoList, setTodoList] = useState([
    {
      id: 1,
      title: "I love You <3",
    },
    {
      id: 2,
      title: "We love You <3",
    },
    {
      id: 3,
      title: "They love You <3",
    },
  ]);

  // list API
  const [postList, setPostList] = useState([]);
  const [pagination, setPagination] = useState({
    // tạo giống như api
    _page: 1,
    _limit: 10,
    _totalRows: 10,
  });
  const [filters, setFilters] = useState({
    // custom filter cho nhiều func: pagination, search, ...
    _limit: 10,
    _page: 1,
  });
  useEffect(() => {
    async function fetchPostList() {
      try {
        const paramsString = queryString.stringify(filters); // chuyển object sang string
        const requestUrl = `https://js-post-api.herokuapp.com/api/posts?${paramsString}`;
        const respone = await fetch(requestUrl);
        const responeJSON = await respone.json(); // convert data to object

        const { data, pagination } = responeJSON; // convert data to array
        setPostList(data);
        setPagination(pagination);
      } catch (error) {
        console.log("Failed to fetch post list", error.message);
      }
    }
    fetchPostList();
  }, [filters]);
  // 1.mảng empty: chạy đúng 1 lần, 2.nếu không dependencies có thì đồng nghĩa lúc nào cũng chạy, 3. có điều kiện thì lần 2 sẽ xét dependencies thay đổi, sẽ chạy if t

  // useEffect(() => { ví dụ về multi use Effect
  //   console.log("TODO list effect");
  // });

  const [todoListTemp] = useState([...todoList]);

  const showHook = (props) => {
    if (props === true) setIsShowHook(true);
    else setIsShowHook(false);
  };

  function handlePageChange(newPage) {
    setFilters({
      ...filters, //lấy hết các phần tử trong đó
      _page: newPage, //đè lên phần tử
    });
  }

  function handleFilterChange(newFilters) {
    setFilters({
      ...filters, //lấy lại các phần tử
      _page: 1, //reset page về trang 1 để, tranh filter list ko hiện thị đúng
      title_like: newFilters.searchTerm, //UI
    });
  }

  function handleTodoClick(todo) {
    // console.log(todo);
    const index = todoList.findIndex((x) => x.id === todo.id);
    if (index < 0) return; // find ko thấy thì nó sẽ trả về -1 nên có thể check thế này để cover case null

    const newTodoList = [...todoList];
    newTodoList.splice(index, 1);
    setTodoList(newTodoList); //vì cơ chế useState ở func Component là replace <> find
  }

  function handleResetList() {
    // console.log(localStorage.getItem("todo-list-init"));

    if (todoList.length <= 0) {
      console.log("list null");
    } else setTodoList(todoListTemp);
  }

  function handleSubmitForm(newTodolist) {
    setTodoList(newTodolist);
  }

  return (
    <div className="App">
      <Header className="App-nav-bar" />

      {/* Switch: tại 1 thời điểm chỉ render 1 component, nhứ vs bên dưới chỉ render ra đúng component todos */}
      {/* Redirect sử dụng trong Switch */}
      <div style={{ marginTop: "50px" }}>
        <Switch>
          <Redirect from="/" to="/home" exact />
          {/* có thể truyền cả param:  */}
          <Redirect from="/post-list/:postId" to="/posts/:postId"></Redirect>

          {/* =========================Route============================ */}
          {/*mặc đinh exact = false, nếu có set exact thì nhập /todos/121231 vẫn load được component dưới*/}
          <Route path="/todos" component={TodoFeature} />

          {/* Ở đây nếu sử dụng exact thì sẽ phải nhập đúng path mới render đc component, nên dùng exact cho component con */}
          <Route path="/counter-color" exact>
            <fieldset style={{ margin: "50px 0" }}>
              <legend>
                <i style={{ fontWeight: "bold" }}> Counter & Color Box </i>
              </legend>
              <Counter />
              <ColorBox />
            </fieldset>
            <CounterPrev />

            <hr></hr>
            <CounterFearture />
          </Route>

          <Route path="/albums" component={AlbumFeature} />

          <Route path="/list-category" component={ListCategoryFeature} />

          <Route path="/color-todoList">
            <div style={{ marginBottom: "30px" }}>
              <button
                onClick={() => {
                  showHook(true);
                }}
              >
                Show Color Box
              </button>
              <button
                onClick={() => {
                  showHook(false);
                }}
              >
                Show Todo List
              </button>
            </div>
            <div>
              {isShowHook && (
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <ColorBoxHook />
                  </Grid>

                  <Grid item xs={6}>
                    <MagicBox />
                  </Grid>
                </Grid>
              )}
            </div>
            <div>
              {!isShowHook && (
                <div>
                  <TodoList
                    todos={todoList}
                    onTodoClick={handleTodoClick}
                    resetOnClick={handleResetList}
                    submitOnClick={handleSubmitForm}
                  />
                </div>
              )}
            </div>
          </Route>

          <Route path="/post-list-api">
            <div>
              <PostFiltersForm
                postList={postList}
                onSubmit={handleFilterChange}
              />
              <PostList postList={postList} pagination={pagination} />
              <Pagination
                pagination={pagination}
                onPageChange={handlePageChange}
              />
            </div>
          </Route>
          <Route path="/home" component={Study} />

          <Route path="/products" component={ProductFeature}></Route>

          {/* ở đây có nghĩa khi không có ông nào match với thì sẽ trả về thằng dưới cùng này theo cơ chế của switch */}
          <Route component={NotFound} />
        </Switch>
      </div>

      <footer
        style={{ marginBottom: "50px", backgroundColor: "#282c34" }}
      ></footer>
    </div>
  );
}

export default App;
