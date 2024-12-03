import React from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "./Sidebar";

const Layout = () => {
  return (
    <div className="flex w-full overflow-hidden bg-[#BBD0FF]">
      <div className="md:block sm:hidden hidden max-w-[20rem]">
        <Sidebar />
      </div>
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden ">
        {/* <Header /> */}
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
