import { EyeIcon } from "@heroicons/react/16/solid";
import React from "react";

export default function ButtonEye({ buttonSpan, showIcon = true, onClick }) {
  return (
    <button className="buttonAdd" onClick={onClick}>
      {showIcon && <EyeIcon className="iconAsideBar" />}
      <span className="buttonTextLight">{buttonSpan}</span>
    </button>
  );
}
