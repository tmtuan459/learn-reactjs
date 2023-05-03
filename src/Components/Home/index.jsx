import { Title } from "@mui/icons-material";
import Clock from "Components/Clock";
import { useState } from "react";
import { NavLink, Route } from "react-router-dom";

import BetterClock from "Components/BetterClock";

//ex: Styled component //cho phép viết đc css in js
// const Title = styled.h1`
//   text-align: center;
//   font-weight: bold;
//   margin-top: 80px;

//   color: ${(props) => props.color || `green`};
// `;
function Study(props) {
  const name = "Tuan";
  const age = 24;
  const isFemale = true;
  const student = {
    name: "Tran Minh Tuan",
  };
  const [showClock, setShowClock] = useState(true);
  const listColor = ["red", "blue", "green", "yellow"];

  return (
    <div>
      <header className="App-header">
        <img
          src="D:\learn-reactjs\src\logo.svg"
          className="App-logo"
          alt="logo"
        />
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
          <Title color="goldenrod">
            Xin chao {student.name} - {age} - {isFemale ? "Male" : "Femle"}
          </Title>

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
        <li>
          <NavLink to="/products"> Products </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default Study;
