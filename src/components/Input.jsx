/* eslint-disable react/prop-types */

import React, { useId } from "react";

const Input = React.forwardRef(function Input({
  label="",
  type = "text",
  className = "",
  ...props
}, ref) {
  const id = useId();
  return (
    <div className="w-full">
      {label && (
        <label className="text-base font-medium text-white" htmlFor={id}>
          {label}
        </label>
      )}

      <input
        type={type}
        className={`flex h-10 w-full rounded-md border border-[#00cee6] bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
        {...props}
        id={id}
        ref={ref}
        aria-label={label}
      />
    </div>
  );
});

export default Input;
