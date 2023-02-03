import React from "react";
import useMagicColor from "../../hooks/useMagicColor";
import "./MagicBox.scss";

MagicBox.propTypes = {};

function MagicBox() {
  const color = useMagicColor();
  return (
    <fieldset>
      <legend>Magic Box</legend>
      <div className="magic-box" style={{ backgroundColor: color }}></div>
    </fieldset>
  );
}

export default MagicBox;
