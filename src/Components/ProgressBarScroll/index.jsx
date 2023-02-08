import React, { useEffect } from "react";
import "./styles.scss";

ProgressBar.propTypes = {};

function ProgressBar() {
  let progressBarHandle = () => {
    const totalScroll = document.documentElement.scrollTop;
    const windowHeight =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    const scroll = `${totalScroll / windowHeight}`;
    const progressBar = document.getElementById("progressBar");

    progressBar.style.transform = `scale(${scroll},1)`;
    progressBar.style.opacity = `${scroll}`;
  };

  useEffect(() => {
    window.addEventListener(`scroll`, progressBarHandle);
  });

  return (
    <div>
      <div id="progressBarContainer">
        <div id="progressBar"></div>
      </div>
    </div>
  );
}

export default ProgressBar;
