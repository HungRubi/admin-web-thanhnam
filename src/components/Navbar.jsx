import { NavLink } from "react-router-dom";
import { menu } from "../util/menu";
import icon from "../util/icon";
import { useState, useRef, useEffect } from "react";
import React from "react";

const { BsArrowBarLeft, BsArrowBarRight } = icon;

const Navbar = ({ isCollapsed, setIsCollapsed, setIsMobileMenuOpen }) => {
  // lưu index của menu đang mở
  const [openIndex, setOpenIndex] = useState(null);
  const navRef = useRef(null);
  const [hoveredItem, setHoveredItem] = useState(null);

  const handleDisplay = (event, index) => {
    event.stopPropagation();
    if (!isCollapsed) {
      setOpenIndex((prev) => (prev === index ? null : index));
    }
  };

  // Đóng mobile menu khi click vào menu item
  const handleNavClick = () => {
    if (window.innerWidth < 640) { // sm breakpoint
      setIsMobileMenuOpen?.(false);
    }
  };

  const toggleCollapse = () => {
    // Trên mobile không cho collapse
    if (window.innerWidth < 640) return;
    setIsCollapsed(!isCollapsed);
    setOpenIndex(null);
  };

  // Đóng submenu khi collapsed
  useEffect(() => {
    if (isCollapsed) {
      setOpenIndex(null);
    }
  }, [isCollapsed]);

  const activeCollapsed =
    "w-full py-[7px] px-2.5 flex items-center justify-center text-color text-[16px] cursor-pointer rounded-[8px] bg-[#eff2f6] relative";
  const notActiveCollapsed =
    "w-full py-[7px] px-2.5 flex items-center justify-center text-color text-[16px] cursor-pointer hover:bg-[#eff2f6] transition-all ease-linear duration-300 rounded-[8px] relative";

  const active =
    "w-full py-[7px] px-2.5 flex items-center justify-between text-color text-[16px] cursor-pointer rounded-[8px] bg-[#eff2f6]";
  const notActive =
    "w-full py-[7px] px-2.5 flex items-center justify-between text-color text-[16px] cursor-pointer hover:bg-[#eff2f6] transition-all ease-linear duration-300 rounded-[8px]";

  return (
    <nav
      ref={navRef}
      className={`h-full bg-white sm:bg-transparent border-r-custom relative transition-all duration-300 ease-in-out ${
        isCollapsed ? "w-[70px]" : "w-full"
      }`}
    >
      <ul
        className={`w-full relative overflow-auto h-[calc(100%-70px)] transition-all duration-300
                        [&::-webkit-scrollbar]:w-1
                        [&::-webkit-scrollbar-track]:rounded-full
                        [&::-webkit-scrollbar-track]:bg-gray-100
                        [&::-webkit-scrollbar-thumb]:rounded-full
                        [&::-webkit-scrollbar-thumb]:bg-[#74717171]
                        dark:[&::-webkit-scrollbar-track]:bg-neutral-700
                        dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500`}
      >
        {menu.map((item, index) => {
          // Clone icon và tăng kích thước khi collapsed
          const iconElement = isCollapsed && item.icon
            ? React.cloneElement(item.icon, {
                className: `${item.icon.props?.className || ""} text-xl text-gray-600!`,
              })
            : item.icon;

          return (
            <li
              key={index}
              className={`w-full relative ${
                isCollapsed ? "px-[10px] my-[10px]" : "px-[15px] my-[5px]"
              }`}
              onMouseEnter={() => isCollapsed && setHoveredItem(index)}
              onMouseLeave={() => isCollapsed && setHoveredItem(null)}
            >
              {item.Children && item.Children.length > 0 ? (
                <>
                  {isCollapsed ? (
                    <div
                      className={
                        hoveredItem === index ? activeCollapsed : notActiveCollapsed
                      }
                    >
                      <div className="flex items-center justify-center w-full">
                        {iconElement}
                      </div>
                    {/* Tooltip khi hover */}
                    {hoveredItem === index && (
                      <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 z-50 bg-gray-800 text-white px-3 py-2 rounded-lg shadow-lg whitespace-nowrap text-sm animate-in fade-in duration-200">
                        {item.text}
                        <div className="absolute right-full top-1/2 -translate-y-1/2 w-0 h-0 border-t-4 border-t-transparent border-r-4 border-r-gray-800 border-b-4 border-b-transparent"></div>
                      </div>
                    )}
                  </div>
                ) : (
                  <>
                    <div className={notActive}>
                      <div className="flex items-center gap-2.5 justify-between w-full">
                        <div className="flex items-center gap-2.5">
                          {item.icon}
                          <span className="leading-8 transition-opacity duration-300">
                            {item.text}
                          </span>
                        </div>
                        {/* icon mở/đóng */}
                        <span
                          onClick={(e) => handleDisplay(e, index)}
                          className="cursor-pointer w-10 h-10 flex items-center justify-center"
                        >
                          {item.icon2}
                        </span>
                      </div>
                    </div>

                    <ul
                      className={`menuNav left-[15px] right-0 transition-all duration-300 overflow-hidden ${
                        openIndex === index ? "block" : "hidden"
                      }`}
                    >
                        {item.Children.map((chil) => (
                        <li key={chil.text} className="px-2.5 my-[5px] w-full">
                          <NavLink
                            to={chil.path}
                            className={({ isActive }) =>
                              isActive ? active : notActive
                            }
                            onClick={handleNavClick}
                          >
                            <div className="flex items-center gap-2.5">
                              {chil.icon}
                              <span className="leading-8">{chil.text}</span>
                            </div>
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </>
            ) : (
              <div
                onMouseEnter={() => isCollapsed && setHoveredItem(index)}
                onMouseLeave={() => isCollapsed && setHoveredItem(null)}
                className="relative"
              >
                {isCollapsed ? (
                  <>
                    <NavLink
                      to={item.path}
                      className={({ isActive }) =>
                        isActive ? activeCollapsed : notActiveCollapsed
                      }
                      onClick={handleNavClick}
                    >
                      <div className="flex items-center justify-center w-full">
                        {iconElement}
                      </div>
                    </NavLink>
                    {/* Tooltip khi hover */}
                    {hoveredItem === index && (
                      <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 z-50 bg-gray-800 text-white px-3 py-2 rounded-lg shadow-lg whitespace-nowrap text-sm animate-in fade-in duration-200">
                        {item.text}
                        <div className="absolute right-full top-1/2 -translate-y-1/2 w-0 h-0 border-t-4 border-t-transparent border-r-4 border-r-gray-800 border-b-4 border-b-transparent"></div>
                      </div>
                    )}
                  </>
                ) : (
                  <NavLink
                    to={item.path}
                    className={({ isActive }) => (isActive ? active : notActive)}
                    onClick={handleNavClick}
                  >
                    <div className="flex items-center gap-2.5">
                      {item.icon}
                      <span className="leading-8 transition-opacity duration-300">
                        {item.text}
                      </span>
                    </div>
                  </NavLink>
                )}
              </div>
            )}
          </li>
          );
        })}
      </ul>

      <div
        onClick={toggleCollapse}
        className={`absolute bottom-0 w-full border-t-custom h-[70px] hidden sm:flex items-center text-color text-[20px] gap-2.5 cursor-pointer transition-all duration-300 hover:bg-[#eff2f6] ${
          isCollapsed ? "justify-center pl-0" : "pl-[25px]"
        }`}
      >
        {isCollapsed ? (
          <BsArrowBarRight className="text-[20px]" />
        ) : (
          <>
            <BsArrowBarLeft />
            <h5 className="text-[17px] transition-opacity duration-300">
              Collapsed View
            </h5>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
