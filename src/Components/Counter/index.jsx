import { useState } from "react";

function Counter(props) {
  const [count, setCount] = useState(1);

  return (
    <div>
      {count}
      <button
        style={{ marginLeft: "10px" }}
        onClick={() => setCount(count + 1)}
      >
        Increase
      </button>
    </div>
  );
}

export default Counter;
