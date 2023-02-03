import React, { useEffect, useState } from "react";

Clock.propTypes = {};
function formatDate(date) {
  if (!date) return "";

  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  return `${hours}:${minutes}:${seconds}`;
}
function Clock(props) {
  const [timeString, setTimeString] = useState("");

  useEffect(() => {
    setInterval(() => {
      const now = new Date(); //HH:mm:ss
      const newTimeString = formatDate(now);

      setTimeString(newTimeString);
    }, 1000);
  }, []);

  return <p style={{ fontSize: "42px" }}>Time: {timeString}</p>;
}

export default Clock;
