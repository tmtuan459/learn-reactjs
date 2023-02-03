import { useEffect, useState } from "react";

// tạo 1 custom hook // thay vì để bên clock jsx kia có thể tạo và tách sang 1 custom hook và dùng thế này
function formatDate(date) {
  if (!date) return "";

  const hours = `0${date.getHours()}`.slice(-2); // format số ví dụ: 039 => 9, 09 => 09
  const minutes = `0${date.getMinutes()}`.slice(-2);
  const seconds = `0${date.getSeconds()}`.slice(-2);

  return `${hours}:${minutes}:${seconds}`;
}
function useClock() {
  const [timeString, setTimeString] = useState("");

  useEffect(() => {
    const clockInterval = setInterval(() => {
      const now = new Date(); //HH:mm:ss
      const newTimeString = formatDate(now);

      setTimeString(newTimeString);
    }, 1000);

    return () => {
      // clean up // nếu không xử lý thì khi unmount sẽ bị lỗi memory leak
      clearInterval(clockInterval);
    };
  }, []);

  return { timeString }; // trả về object nếu sau này update gì nữa
}

export default useClock;
