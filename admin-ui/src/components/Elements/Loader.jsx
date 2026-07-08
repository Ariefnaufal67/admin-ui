import React from "react";

function Loader(props) {
  const { size = 32, label = "Loading..." } = props;

  return (
    <div className="w-full flex flex-col justify-center items-center py-10 text-gray-02">
      <div
        className="animate-spin rounded-full border-4 border-gray-05 border-t-primary"
        style={{ width: size, height: size }}
      ></div>
      {label && <div className="mt-3 text-sm">{label}</div>}
    </div>
  );
}

export default Loader;
