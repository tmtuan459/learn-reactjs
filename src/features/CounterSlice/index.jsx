import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { decrease, increase } from "./counterSlice";

function CounterFearture(props) {
  const dispatch = useDispatch();
  const count = useSelector((state) => state.count); // useSelector là 1 hook lấy 1 state trong cái redux(ở đây là lấy ra từ count ở store)

  const handleIncreaseClick = () => {
    const action = increase(); //action creator
    console.log(action);
    dispatch(action);
  };

  const handleDecreaseClick = () => {
    const action = decrease(); //action creator
    dispatch(action);
  };

  return (
    <div>
      Counter Fearture: {count}
      <div>
        <button onClick={handleIncreaseClick}>Increase</button>
        <button onClick={handleDecreaseClick}>Decrease</button>
      </div>
    </div>
  );
}

export default CounterFearture;
