import React, { useEffect, useRef, useState } from "react";
import { MdClose, MdOutlineMenu } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import menu from "../json/menu.json";
import { CiSettings } from "react-icons/ci";

const Header = () => {
  const [drop, setDrop] = useState(false);
  const [menus, setMenus] = useState(null);
  const [selectedMenu, setSelectedMenu] = useState(0);

  const navigate = useNavigate();
  const dropDownRef = useRef(null);

  useEffect(() => {
    setMenus(menu);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropDownRef.current && !dropDownRef.current.contains(event.target)) {
        setDrop(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <header className="sticky top-0 z-30 bg-white border-b border-gray-200 sm:hidden">
        <div className="px-4 py-3 flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-[#4E58FF]">
              Сайн уу Batkhuu Battulga <span className="text-xl">👋</span>
            </p>
          </div>
          <button
            onClick={() => {
              setDrop(true);
            }}
          >
            <MdOutlineMenu className="text-2xl text-[#4E58ff]" />
          </button>
        </div>
      </header>
      {drop && (
        <div
          onClick={() => {
            setDrop(false);
          }}
          className={`fixed top-0 left-0 w-full h-screen bg-[#000] bg-opacity-30 z-40 transform transition-all duration-300 ease-in-out ${
            drop ? "opacity-100" : "opacity-0"
          }`}
          style={{ transitionProperty: "opacity, transform" }}
        >
          <div className="p-4 h-auto bg-white shadow-lg ">
            <div className="flex items-center justify-end">
              <button onClick={() => setDrop(false)}>
                <MdClose className="text-[#2C4360] text-2xl" />
              </button>
            </div>

            <div className="flex justify-between items-center gap-2 mt-4">
              <div className="flex items-center gap-2">
                <div>
                  <p className="font-semibold text-[#081021]">
                    Batkhuu Battulga
                  </p>
                </div>
              </div>
              <CiSettings
                onClick={() => {
                  navigate("/profile");
                }}
                className="text-[#2C4360] text-2xl"
              />
            </div>

            <div className="mt-2">
              {menus?.map((items, l) => {
                if (items.id === 0 || items.id === 2) {
                  return (
                    <button
                      key={l}
                      className={`w-full text-start mb-2 px-2 py-2 rounded-lg hover:bg-[#f6f6f6] ${
                        selectedMenu === l
                          ? "bg-[#F4F6FB] text-[#324D72]"
                          : "bg-none text-[#666874]"
                      }`}
                      onClick={() => {
                        setSelectedMenu(l);
                        navigate(`${items.link}`);
                      }}
                    >
                      {items.name}
                    </button>
                  );
                } else {
                  return <></>;
                }
              })}
              <button
                onClick={() => {
                  setDrop(!drop);
                  Cookies.remove("swing_token");
                  window.location.reload();
                }}
                className="ps-2 py-2 w-full rounded-lg text-start hover:bg-gray-100 cursor-pointer text-[#666874]"
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
