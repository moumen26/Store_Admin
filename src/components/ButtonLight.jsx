import React from "react";

export default function ButtonLight({ buttonSpan, setOnClick }) {
  return (
    <button className="buttonLightOff" onClick={setOnClick}>
      <span className="buttonTextDark">{buttonSpan}</span>
    </button>
  );
}
