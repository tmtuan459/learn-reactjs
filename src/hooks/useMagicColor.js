// import { useEffect, useRef, useState } from "react";

// function randomColor(currentColor) {
//   const COLOR_LIST = ["green", "yellow", "orange", "black", "white", "blue"];
//   const curentIndex = COLOR_LIST.indexOf(currentColor);
//   let newIndex = curentIndex;

//   while (curentIndex === newIndex) {
//     newIndex = Math.trunc(Math.random() * COLOR_LIST.length);
//   }

//   return COLOR_LIST[newIndex];
// }

// function useMagicColor() {
//   const [color, setColor] = useState("transparent");
//   const colorRef = useRef("transparent"); //tạo ra 1 object và không thay đổi giữa các lần render

//   useEffect(() => {
//     const colorInterval = setInterval(() => {
//       const newColor = randomColor(colorRef.current);
//       setColor(newColor);
//       //   console.log("ReftColor", colorRef);

//       colorRef.current = newColor;
//     }, 1000);

//     return () => {
//       clearInterval(colorInterval);
//     };
//   }, []);

//   return color; // custom hook nên trả về obj ko trả jsx
// }

// export default useMagicColor;

import { useEffect, useRef, useState } from "react";

function randomColor(currentColor) {
  const COLOR_LIST = ["green", "yellow", "orange", "black", "white", "blue"];
  const currentIndex = COLOR_LIST.indexOf(currentColor);
  let newIndex = currentIndex;

  while (newIndex === currentIndex) {
    newIndex = Math.trunc(Math.random() * COLOR_LIST.length);
  }

  return COLOR_LIST[newIndex];
}

function useMagicColor() {
  const [color, setColor] = useState("Transparent");
  const colorRef = useRef("Transparent");

  useEffect(() => {
    const colorInterval = setInterval(() => {
      const newColor = randomColor(colorRef.current);

      colorRef.current = newColor;
      setColor(newColor);
    }, 1000);

    return () => {
      clearInterval(colorInterval);
    };
  }, []);

  return color;
}
export default useMagicColor;
