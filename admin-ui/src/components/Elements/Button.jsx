import React from "react";

function Button(props) {
  const { children, type = "submit", variant = "primary", disabled = false, ...rest } = props;

  const baseClasses = "h-12 rounded-md text-sm w-full transition-opacity";
  const variantClasses = {
    primary: "bg-primary text-white",
    secondary: "bg-gray-05 text-gray-02",
  };

  const finalClasses = `${baseClasses} ${
    variantClasses[variant] || variantClasses.primary
  } ${disabled ? "opacity-60 cursor-not-allowed" : ""}`;

  return (
    <>
      <button className={finalClasses} type={type} disabled={disabled} {...rest}>
        {children}
      </button>
    </>
  );
}

export default Button;
