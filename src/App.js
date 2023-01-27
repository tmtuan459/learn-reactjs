import "./App.css";
import AlbumFeature from "./features/Album";
import logo from "./logo.svg";

function App() {
  const name = "Tuan";
  const age = 24;
  const isFemale = true;
  const student = {
    name: "Tran Minh Tuan",
  };
  const listColor = ["red", "blue", "green", "yellow"];

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
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
              <p>{name}</p>
              <p>Male</p>
              <p>alt + shift + down buton</p>
              <p>Male</p>
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
      </header>
      {/* <TodoFeature /> */}

      <AlbumFeature />
    </div>
  );
}

export default App;
