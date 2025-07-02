import { ChartNoAxesColumn, SquareLibrary } from "lucide-react";
import React from "react";
import { Link, NavLink, Outlet } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="flex">
      <div className="hidden lg:block w-[250px] sm:w-[300px] space-y-8 border-r border-gray-300 dark:border-gray-700 bg-[#f0f0f0] p-5 sticky top-0 h-screen">
        <div className="mt-20 space-y-4">
          <NavLink
            to="dashboard"
            className={({ isActive }) =>
              `flex items-center gap-2 ${
                isActive ? "text-blue-600" : "text-gray-900 dark:text-gray-300"
              }`
            }
          >
            <ChartNoAxesColumn size={22} />
            <h1>Dashboard</h1>
          </NavLink>
          <NavLink
            to="course"
            className={({ isActive }) =>
              `flex items-center gap-2 ${
                isActive ? "text-blue-600" : "text-gray-900 dark:text-gray-300"
              }`
            }
          >
            <SquareLibrary size={22} />
            <h1>Courses</h1>
          </NavLink>
        </div>
      </div>
      <div className="flex-1 md:p-24 p-2 bg-white">
        <Outlet />
      </div>
    </div>
  );
};

export default Sidebar;
