import React from "react";
import useClock from "../../hooks/useClock";

Clock.propTypes = {};

function Clock() {
  const { timeString } = useClock();

  return (
    <p
      style={{
        fontSize: "42px",
        border: "1px solid",
        borderRadius: "10px",
        padding: "10px",
      }}
    >
      Time(custom Hook): {timeString}
    </p>
  );
}

export default Clock;
