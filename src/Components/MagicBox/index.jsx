import { Skeleton } from "@mui/material";
import React from "react";
import useMagicColor from "../../hooks/useMagicColor";
import "./MagicBox.scss";

MagicBox.propTypes = {};

function MagicBox() {
  const color = useMagicColor();
  return (
    <>
      <legend>Magic Box</legend>
      {color ? (
        <div className="magic-box" style={{ backgroundColor: color }}></div>
      ) : (
        <Skeleton variant="rectangular" width={210} height={60} />
      )}
    </>
  );
}

export default MagicBox;
