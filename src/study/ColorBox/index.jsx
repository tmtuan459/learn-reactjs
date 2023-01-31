import "./ColorBox.scss";

import React, { useState } from "react";

ColorBox.propTypes = {};

function getRandomColor() {
  const COLOT_LIST = ["deeppink", "pink", "yellow", "orange", "black", "blue"];
  const randomIndex = Math.trunc(Math.random() * COLOT_LIST.length);

  return COLOT_LIST[randomIndex];
}

function ColorBox() {
  const [color, setColor] = useState(() => {
    const initColor = localStorage.getItem("box_color") || "deeppink";
    console.log(initColor);
    return initColor;
  });

  function handleBoxClick() {
    const newColor = getRandomColor();
    setColor(newColor);

    localStorage.setItem("box_color", newColor);
  }

  return (
    <div
      className="color-box"
      style={{ backgroundColor: color }}
      onClick={handleBoxClick}
    >
      COLOR BOX RANDOM
    </div>
  );
}

export default ColorBox;
