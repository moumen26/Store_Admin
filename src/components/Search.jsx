import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import React from "react";

export default function Search({ placeholder, value, onChange }) {
  return (
    <div className="inputForm bg-white">
      <MagnifyingGlassIcon className="inputIcon" />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
