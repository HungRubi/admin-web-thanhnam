import {CircleButton } from './index'
import icon from '../util/icon'
import { NavLink, useNavigate } from 'react-router-dom';
import { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../store/actions'

const { IoSunnyOutline, FaRegBell, FaArrowRightFromBracket, BsPerson, IoSettingsOutline, IoMenu} = icon;

const Header = ({ isMobileMenuOpen, setIsMobileMenuOpen }) => {
    const { currentUser, loading } = useSelector(state => state.user);
    const { globalConfig } = useSelector(state => state.app);
    const [openMenu, setOpenMenu] = useState(null);
    const logoUrl = useMemo(() => {
        if (!globalConfig?.logo) return null;
        return `${import.meta.env.VITE_SERVER_URL}/${globalConfig.logo.replace(/\\/g, "/")}`;
    }, [globalConfig?.logo]);
    const toggleMenu = (menu) => {
        setOpenMenu(openMenu === menu ? null : menu);
    }
    useEffect(() => {
        const handleClickOutside = (event) => {
          if (!event.target.closest(".btn_togglo, .menu_togglo")) {
            setOpenMenu(null);
          }
        };
        document.addEventListener("click", handleClickOutside);
        return () => {
          document.removeEventListener("click", handleClickOutside);
        };
      }, []);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Load globalConfig nếu chưa có
    useEffect(() => {
        if (!globalConfig || Object.keys(globalConfig).length === 0) {
            dispatch(actions.getGlobalConfigEdit());
        }
    }, [dispatch, globalConfig]);

    // Đồng bộ favicon theo cấu hình global
    useEffect(() => {
        if (!globalConfig?.favicon) return;
        const faviconUrl = `${import.meta.env.VITE_SERVER_URL}/${globalConfig.favicon.replace(/\\/g, "/")}`;
        let link = document.querySelector("link[rel*='icon']");
        if (!link) {
            link = document.createElement("link");
            link.rel = "shortcut icon";
            document.head.appendChild(link);
        }
        link.type = "image/x-icon";
        link.href = faviconUrl;
    }, [globalConfig?.favicon]);

    const handleLogout = async () => {
        try {
            await dispatch(actions.logout());
        } catch {
            // ignore, reducer đã thông báo lỗi
        } finally {
            setOpenMenu(null);
            navigate("/login");
        }
    }
    return (
        <header className="w-full flex justify-between items-center h-full px-2 sm:px-4">
            <div className="w-auto sm:w-60 flex items-center gap-2 sm:gap-0">
                {/* Mobile Menu Button */}
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="sm:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
                    aria-label="Toggle menu"
                >
                    <IoMenu className="text-2xl text-gray-600" />
                </button>
                <NavLink to={"/"} className="flex items-center min-h-[40px]">
                    {logoUrl ? (
                        <img 
                            src={logoUrl}
                            alt={globalConfig?.name || "Logo"}
                            className='w-[50px] sm:w-[60px] md:w-[70px] ml-[5px] sm:ml-[10px] md:ml-[15px] object-contain flex-none'
                        />
                    ) : (
                        <span className="ml-[5px] sm:ml-[10px] md:ml-[15px] font-semibold text-gray-700 text-lg sm:text-xl">
                            {globalConfig?.name || "Thanh Nam Admin"}
                        </span>
                    )}
                </NavLink>
            </div>
            <div className="mr-[10px] sm:mr-[20px] md:mr-[30px] flex items-center gap-2 sm:gap-3 md:gap-4">
                <CircleButton className="bg-[rgba(255,204,133,0.24)]! hidden sm:flex">
                    <IoSunnyOutline className='text-[16px] sm:text-[18px] md:text-[20px] text-[#e5780b]'/>
                </CircleButton>
                <CircleButton className="hidden sm:flex">
                    <FaRegBell className='text-[16px] sm:text-[18px] md:text-[20px] text-gray-500'/>
                </CircleButton>
                <CircleButton className={"relative btn_togglo"} onClick={() => toggleMenu("account")}>
                    <img
                        src={"https://zingmp3.vmu.com.vn/img/default.png"}
                        alt="avatar"
                        className='rounded-[50%] w-full object-cover'
                    />
                    {openMenu === "account" && (
                        <div className="absolute bg-white w-[220px] sm:w-[250px] top-[140%] right-0 rounded-[3px] menu pb-2.5 menu_togglo z-50 shadow-lg">
                            <div className="flex flex-col items-center pt-[15px] justify-center">
                                <CircleButton className="w-10 h-10">
                                    <img 
                                        src={"https://zingmp3.vmu.com.vn/img/default.png"}
                                        alt="avatar"
                                        className='rounded-[50%] w-full object-cover'
                                    />
                                </CircleButton>
                                <h5 className="text-[13px] sm:text-[14px] md:text-[15px] mt-2.5 px-2 text-center">
                                    {currentUser?.name || "Tài khoản"}
                                </h5>
                                <hr className='h-px border-t border-t-[#cbd0dd] w-full my-3'/>
                            </div>
                            <div className="flex items-center justify-center flex-col gap-2.5 pb-2.5">
                                <ul className='w-full'>
                                    <li className="px-3 sm:px-4 py-2 flex gap-2 sm:gap-2.5 items-center hover_bg_li">
                                        <BsPerson className='text-base sm:text-lg text-gray-600 shrink-0'/>
                                        <NavLink className="capitalize text-[13px] sm:text-[14px] md:text-[15px] text-gray-600"
                                        to={currentUser?._id ? `/user/${currentUser._id}/edit` : "/user"}>
                                            tài khoản
                                        </NavLink>
                                    </li>
                                    <li className="px-3 sm:px-4 py-2 hidden sm:flex gap-2 sm:gap-2.5 items-center hover_bg_li">
                                        <FaRegBell className='text-sm sm:text-base text-gray-500 shrink-0'/>
                                        <NavLink className="capitalize text-[13px] sm:text-[14px] md:text-[15px] text-gray-600"
                                        to={"/account/order"}>
                                            thông báo
                                        </NavLink>
                                    </li>
                                    <li className="px-3 sm:px-4 py-2 hidden sm:flex gap-2 sm:gap-2.5 items-center hover_bg_li">
                                        <IoSettingsOutline className='text-base sm:text-lg text-gray-600 shrink-0'/>
                                        <NavLink className="capitalize text-[13px] sm:text-[14px] md:text-[15px] text-gray-600"
                                        to={"/account/voucher"}>
                                            setting
                                        </NavLink>
                                    </li>
                                </ul>
                                <div className="px-3 sm:px-4 w-full">
                                    <button onClick={handleLogout} disabled={loading}
                                    className={`flex items-center justify-center gap-2 sm:gap-2.5 text-sm sm:text-base cursor-pointer bg-[rgba(121,119,119,0.1215686275)] w-full py-1.5 rounded-[8px] text-black! border border-[#cbd0dd] ${
                                        loading ? "opacity-70 cursor-not-allowed" : ""
                                    }`}>
                                        <FaArrowRightFromBracket className='text-sm sm:text-base'/>
                                        <span className="text-[12px] sm:text-sm md:text-base">Sign out</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </CircleButton>
            </div>
        </header>   
    );
};

export default Header;