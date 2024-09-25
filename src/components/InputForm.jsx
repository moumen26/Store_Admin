import {
  EnvelopeIcon,
  LockClosedIcon,
  PhoneIcon,
} from "@heroicons/react/16/solid";
import React from "react";

export default function InputForm({
  inputType,
  labelForm,
  inputPlaceholder,
  inputName,
  setChangevalue,
  value,
  readOnly
}) {
  let iconComponent;

  switch (inputType) {
    case "phone":
      iconComponent = <PhoneIcon className="inputIcon" />;
      break;
    case "password":
      iconComponent = <LockClosedIcon className="inputIcon" />;
      break;
    case "email":
      iconComponent = <EnvelopeIcon className="inputIcon" />;
      break;
    default:
      iconComponent = null;
      break;
  }

  return (
    <div className="inputItem">
      <span>{labelForm}</span>
      <div className="inputForm">
        {iconComponent}
        <input
          type={inputType}
          placeholder={inputPlaceholder}
          name={inputName}
          onChange={setChangevalue}
          value={value}
          readOnly={readOnly}
          min={0}
        />
      </div>
    </div>
  );
}
