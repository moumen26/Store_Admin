import React from "react";

export default function ButtonDark({ buttonSpan, setOnClick}) {
  return (
    <button className="buttonDark" onClick={setOnClick}>
      <span className="buttonTextLight">{buttonSpan}</span>
    </button>
  );
}
