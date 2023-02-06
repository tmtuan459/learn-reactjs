import queryString from "query-string";
import { useEffect, useState } from "react";
import { NavLink, Redirect, Route, Switch } from "react-router-dom";
import "./App.scss";
import BetterClock from "./Components/BetterClock";
import Clock from "./Components/Clock";
import ColorBox from "./Components/ColorBox";
import Counter from "./Components/Counter";
import MagicBox from "./Components/MagicBox";
import Pagination from "./Components/Pagination";
import PostFiltersForm from "./Components/PostFiltersForm";
import PostList from "./Components/PostList";
import AlbumFeature from "./features/Album";
import ListCategoryFeature from "./features/ListCategory/pages";
import TodoFeature from "./features/Todo/pages";
import logo from "./logo.svg";
import ColorBoxHook from "./study/ColorBox";
import CounterPrev from "./study/PrevValueRef";
import TodoList from "./study/TodoList";

function App() {
  const name = "Tuan";
  const age = 24;
  const isFemale = true;
  const student = {
    name: "Tran Minh Tuan",
  };
  const [isShowHook, setIsShowHook] = useState(true);
  const listColor = ["red", "blue", "green", "yellow"];
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

  const [showClock, setShowClock] = useState(true);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code> src / App.js </code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Hello World!
        </a>
        <>
          Xin chao {student.name} - {age} - {isFemale ? "Male" : "Femle"}
          {isFemale && (
            <>
              <p> {name} </p> <p> Male </p> <p> alt + shift + down buton </p>
              <p> Male </p>
            </>
          )}
        </>
        <ul>
          {listColor.map((color) => (
            <li key={color} style={{ color }}>
              {color}
            </li>
          ))}
        </ul>
        <>
          <Route path="/better-clock" component={BetterClock} />
          {showClock && <Clock />}
          <button
            onClick={() => setShowClock(!showClock)}
            style={{ marginBottom: "20px" }}
          >
            {showClock ? "Hide Clock" : "Show Clock"}
          </button>
        </>
      </header>

      {/* Switch: tại 1 thời điểm chỉ render 1 component, nhứ vs bên dưới chỉ render ra đúng component todos */}
      {/* Redirect sử dụng trong Switch */}
      <Switch>
        <Redirect from="/home" to="/"></Redirect>
        {/* có thể truyền cả param:  */}
        <Redirect from="/post-list/:postId" to="/posts/:postId"></Redirect>
      </Switch>

      {/* Menu */}
      {/* Link thì tương tự NavLink nhưng không có class active */}
      {/* NavLink dành cho dạng như menu active, khi click thì sẽ set class= acitve vào item */}

      <ul className="menu-item">
        <li>
          <NavLink to="/todos"> Todos </NavLink>
        </li>
        <li>
          <NavLink to="/albums"> Album Feature </NavLink>
        </li>
        <li>
          <NavLink to="/counter-color"> Counter & Color Box </NavLink>
        </li>
        <li>
          <NavLink to="/list-category"> List Category </NavLink>
        </li>
        <li>
          <NavLink to="/color-todoList"> Color & Todo List </NavLink>
        </li>
        <li>
          <NavLink to="/post-list-api"> Post List API </NavLink>
        </li>
      </ul>

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
      </Route>

      <Route path="/albums" component={AlbumFeature} />

      <Route path="/list-category" component={ListCategoryFeature} />

      <Route path="/color-todoList">
        <div>
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
            <div>
              <ColorBoxHook />
              <MagicBox />
            </div>
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
          <PostFiltersForm onSubmit={handleFilterChange} />
          <PostList postList={postList} pagination={pagination} />
          <Pagination pagination={pagination} onPageChange={handlePageChange} />
        </div>
      </Route>

      <footer
        style={{ marginBottom: "50px", backgroundColor: "#282c34" }}
      ></footer>
    </div>
  );
}

export default App;
