import React from "react";
import useClock from "../../hooks/useClock";

BetterClock.propTypes = {};

function BetterClock() {
  const { timeString } = useClock();

  return (
    <p
      style={{
        fontSize: "42px",
        width: "300px",
        border: "3px solid",
        borderRadius: "30px",
        padding: "10px",
        textAlign: "center",
      }}
    >
      Time: {timeString}
    </p>
  );
}

export default BetterClock;
