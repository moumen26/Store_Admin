import { PlusIcon } from "@heroicons/react/16/solid";
import React from "react";

export default function ButtonAdd({ buttonSpan, showIcon = true, setOnClick }) {
  return (
    <button className="buttonAdd" onClick={setOnClick}>
      {showIcon && <PlusIcon className="iconAsideBar" />}
      <span className="buttonTextLight">{buttonSpan}</span>
    </button>
  );
}
