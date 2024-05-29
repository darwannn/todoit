import { useEffect, useState } from "react";

import {
  MdLogout,
  MdOutlineToday,
  MdUpcoming,
  MdOutlineCalendarToday,
} from "react-icons/md";

import { RiListSettingsLine } from "react-icons/ri";
import { BiMenu, BiMenuAltLeft } from "react-icons/bi";
import { IoIosNotifications } from "react-icons/io";

import { NavLink, useNavigate, Link } from "react-router-dom";

import { useLogout } from "../../services/authService";
import { useCount } from "../../services/calendarService";

import { removeCookie } from "../../helpers/cookie";

import Tag from "./Tag";
import Category from "./Category";
import Notification from "../Notification/Notification";
const Sidebar = () => {
  const navigate = useNavigate();
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isNotificationOpen, setIsNotificationOpen] = useState();

  const { data: count } = useCount();
  const { mutate: logoutMutation } = useLogout();

  useEffect(() => {
    window.addEventListener("resize", () => {
      setScreenWidth(window.innerWidth);
    });
  }, []);

  useEffect(() => {
    if (screenWidth < 768) {
      setIsSidebarOpen(false);
    } else {
      setIsSidebarOpen(true);
    }
  }, [screenWidth]);

  const handleLogout = () => {
    logoutMutation(
      {},
      {
        onSuccess: () => {
          removeCookie("token");
          navigate("/auth/login");
        },
        onError: (error) => {
          console.error(error);
        },
      }
    );
  };

  return (
    <div>
      <div className="h-full">
        <aside
          className={`
          ${isSidebarOpen ? "w-[320px]" : "w-[100px]"}
          transition-all  ease-in-out
          sticky top-0 h-screen whitespace-nowrap 
          
        `}
        >
          <div className=" h-full p-3">
            <div
              className={`h-full  overflow-y-auto bg-gray-100 text-gray-500 rounded-lg ${
                isSidebarOpen ? "p-5" : "px-3 py-10"
              }`}
            >
              <div className="h-full flex flex-col">
                <div className="flex-1 mb-20">
                  <div className="flex items-center justify-center">
                    {isSidebarOpen && (
                      <Link
                        to="/"
                        className="text-gray-800 text-2xl font-bold flex-1"
                      >
                        ToDoIt
                      </Link>
                    )}

                    <div
                      className={`cursor-pointer hover:bg-gray-200   ${!isSidebarOpen ? "mb-5  p-2.5 rounded-lg" : " p-0.5 rounded"} hover:text-gray-700 `}
                      onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    >
                      {isSidebarOpen ? (
                        <>
                          <BiMenu size={30} />
                        </>
                      ) : (
                        <>
                          <BiMenuAltLeft size={30} />
                        </>
                      )}
                    </div>
                  </div>

                  <ul className="space-y-1">
                    {isSidebarOpen && (
                      <h6 className="mt-4 font-bold text-gray-700 text-sm ">
                        TASK
                      </h6>
                    )}
                    <li>
                      <NavLink
                        to={"/calendar"}
                        className={({ isActive }) =>
                          `${
                            isActive && "font-bold text-gray-700 bg-gray-200  "
                          } ${
                            isSidebarOpen ? "py-2" : "py-4"
                          }  flex items-center justify-center gap-2 py-2 px-3 hover:text-gray-700 rounded-lg  hover:bg-gray-200 `
                        }
                      >
                        <MdOutlineCalendarToday
                          size={isSidebarOpen ? 15 : 22}
                        />
                        {isSidebarOpen && (
                          <>
                            <span className="text-sm flex-1 font-semibold">
                              Calendar
                            </span>
                            <span className="flex items-center justify-center px-2 text-sm text-gray-700 bg-gray-200 rounded-md font-medium">
                              {count?.data?.tasks?.all || 0}
                            </span>
                          </>
                        )}
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to={"/today"}
                        className={({ isActive }) =>
                          `${isActive && "font-bold text-gray-700 bg-gray-200"} ${
                            isSidebarOpen ? "py-2" : "py-4"
                          } flex items-center justify-center gap-2 py-2 px-3 hover:text-gray-700 rounded-lg  hover:bg-gray-200 `
                        }
                      >
                        <MdOutlineToday size={isSidebarOpen ? 15 : 22} />
                        {isSidebarOpen && (
                          <>
                            <span className="text-sm flex-1 font-semibold">
                              Today
                            </span>
                            <span className="flex items-center justify-center px-2 text-sm text-gray-700 bg-gray-200 rounded-md font-medium">
                              {count?.data?.tasks?.today || 0}
                            </span>
                          </>
                        )}
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to={"/upcoming"}
                        className={({ isActive }) =>
                          `${isActive && "font-bold text-gray-700 bg-gray-200"} ${
                            isSidebarOpen ? "py-2" : "py-4"
                          } flex items-center justify-center gap-2 py-2 px-3 hover:text-gray-700 rounded-lg  hover:bg-gray-200 `
                        }
                      >
                        <MdUpcoming size={isSidebarOpen ? 15 : 22} />
                        {isSidebarOpen && (
                          <>
                            <span className="text-sm flex-1 font-semibold">
                              Upcoming
                            </span>
                            <span className="flex items-center justify-center px-2 text-sm text-gray-700 bg-gray-200 rounded-md font-medium">
                              {count?.data?.tasks?.upcoming || 0}
                            </span>
                          </>
                        )}
                      </NavLink>
                    </li>
                  </ul>
                  {isSidebarOpen && (
                    <>
                      <hr className="mt-2 mb-6" />
                      <Category />

                      <hr className="mt-2 mb-6" />
                    </>
                  )}
                  <Tag isSidebarOpen={isSidebarOpen} />
                </div>
                <ul className="space-y-1">
                  <li>
                    <NavLink
                      to={"/settings"}
                      className={({ isActive }) =>
                        `${isActive && "font-bold text-gray-700 bg-gray-200"} ${
                          isSidebarOpen ? "py-2" : "py-4"
                        } flex items-center justify-center gap-2 py-2 px-3 hover:text-gray-700 rounded-lg  hover:bg-gray-200 `
                      }
                    >
                      <RiListSettingsLine size={isSidebarOpen ? 15 : 22} />
                      {isSidebarOpen && (
                        <span className="text-sm flex-1 font-semibold">
                          Settings
                        </span>
                      )}
                    </NavLink>
                  </li>
                  <li>
                    <div
                      className={` ${
                        isSidebarOpen ? "py-2" : "py-4"
                      } flex items-center justify-center gap-2 py-2 px-3 hover:text-gray-700 rounded-lg  hover:bg-gray-200 cursor-pointer`}
                      onClick={() => setIsNotificationOpen(true)}
                    >
                      <IoIosNotifications size={isSidebarOpen ? 15 : 22} />

                      {isSidebarOpen && (
                        <span className="text-sm flex-1 font-semibold">
                          Notification
                        </span>
                      )}
                    </div>
                  </li>
                  <li>
                    <div
                      className={` ${
                        isSidebarOpen ? "py-2" : "py-4"
                      } cursor-pointer flex items-center justify-center gap-2 py-2 px-3 hover:text-gray-700 rounded-lg  hover:bg-gray-200`}
                      onClick={handleLogout}
                    >
                      <MdLogout size={isSidebarOpen ? 15 : 22} />
                      {isSidebarOpen && (
                        <span className="text-sm flex-1 font-semibold">
                          Logout
                        </span>
                      )}
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </aside>
        <Notification
          isNotificationOpen={isNotificationOpen}
          setIsNotificationOpen={setIsNotificationOpen}
        />
      </div>
    </div>
  );
};

export default Sidebar;
