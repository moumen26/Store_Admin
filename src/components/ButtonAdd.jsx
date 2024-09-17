import { PlusIcon } from "@heroicons/react/16/solid";
import React from "react";

export default function ButtonAdd({ buttonSpan, showIcon = true, onClick }) {
  return (
    <button className="buttonAdd" onClick={onClick}>
      {showIcon && <PlusIcon className="iconAsideBar" />}
      <span className="buttonTextLight">{buttonSpan}</span>
    </button>
  );
}
