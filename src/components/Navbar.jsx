import { NavLink } from "react-router-dom";
import { menu } from "../util/menu";
import icon from "../util/icon";
import { useState, useRef } from "react";

const { BsArrowBarLeft } = icon;

const active =
  "w-full py-[7px] px-2.5 flex items-center justify-between text-color text-[16px] cursor-pointer rounded-[8px] bg-[#eff2f6]";
const notActive =
  "w-full py-[7px] px-2.5 flex items-center justify-between text-color text-[16px] cursor-pointer hover:bg-[#eff2f6] transition-all ease-linear duration-300 rounded-[8px]";

const Navbar = () => {
  // lưu index của menu đang mở
  const [openIndex, setOpenIndex] = useState(null);
  const navRef = useRef(null);

  const handleDisplay = (event, index) => {
    event.stopPropagation();
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  // const handleClickOutside = (event) => {
  //   if (navRef.current && !navRef.current.contains(event.target)) {
  //     setOpenIndex(null);
  //   }
  // };

  // useEffect(() => {
  //   document.addEventListener("click", handleClickOutside);
  //   return () => {
  //     document.removeEventListener("click", handleClickOutside);
  //   };
  // }, []);

  return (
    <nav
      ref={navRef}
      className="w-full h-full border-r-custom relative"
    >
      <ul
        className="w-full relative overflow-auto h-[calc(100%-70px)]
                        [&::-webkit-scrollbar]:w-1
                        [&::-webkit-scrollbar-track]:rounded-full
                        [&::-webkit-scrollbar-track]:bg-gray-100
                        [&::-webkit-scrollbar-thumb]:rounded-full
                        [&::-webkit-scrollbar-thumb]:bg-[#74717171]
                        dark:[&::-webkit-scrollbar-track]:bg-neutral-700
                        dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500"
      >
        {menu.map((item, index) => (
            <li key={index} className="px-[15px] my-[5px] w-full relative">
                {item.Children && item.Children.length > 0 ? (
                <>
                    <div className={notActive}>
                        <div className="flex items-center gap-2.5 justify-between w-full">
                            <div className="flex items-center gap-2.5">
                            {item.icon}
                            <span className="leading-8">{item.text}</span>
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
                ) : (
                <NavLink
                    to={item.path}
                    className={({ isActive }) => (isActive ? active : notActive)}
                >
                    <div className="flex items-center gap-2.5">
                    {item.icon}
                    <span className="leading-8">{item.text}</span>
                    </div>
                </NavLink>
                )}
            </li>
        ))}

      </ul>

      <div className="absolute bottom-0 w-full border-t-custom h-[70px] flex items-center pl-[25px] text-color text-[20px] gap-2.5 cursor-pointer">
        <BsArrowBarLeft />
        <h5 className="text-[17px]">Collapsed View</h5>
      </div>
    </nav>
  );
};

export default Navbar;
