import React, { useEffect, useRef, useState } from "react";

CounterPrev.propTypes = {};

function CounterPrev() {
  //1
  const [count, setCount] = useState(0);
  const prevCount = useRef(count);

  //3
  useEffect(() => {
    prevCount.current = count; // chạy render xong thì giá trị nó mới bằng nhau, cuối cùng vẫn bằng nhau
  }, [count]);

  const handleIncreaseClick = () => {
    setCount((x) => x + 1);
  };


  //2
  return (
    <div>
      <div>
        <p>Previous count: {prevCount.current}</p>
        <p>Current count: {count}</p>
      </div>

      <div>
        <button onClick={handleIncreaseClick}>Increase</button>
      </div>
    </div>
  );
}

export default CounterPrev;
