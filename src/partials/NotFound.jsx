import React from "react";

const NotFound = () => {
  return (
    <div className="flex h-screen">
      <div className="m-auto">
        <h1 style={{ color: "red", fontSize: 100 }}>404</h1>
        <h3>Oops.. Page is not found</h3>
      </div>
    </div>
  );
};

export default NotFound;
