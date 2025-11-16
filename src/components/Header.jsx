import {CircleButton } from './index'
import icon from '../util/icon'
import { NavLink, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../store/actions'

const { IoSunnyOutline, FaRegBell, FaArrowRightFromBracket, BsPerson, IoSettingsOutline} = icon;

const Header = () => {
    const { currentUser } = useSelector(state => state.user);
    const [openMenu, setOpenMenu] = useState(null);
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
    const handleLogout = () => {
        dispatch(actions.logout());
        navigate("/login");
    }
    return (
        <header className="w-full flex justify-between items-center h-full">
            <div className="w-60 flex items-center">
                <NavLink to={"/"}>
                    <img src="/img/default/logo.png" alt="logo"
                    className='w-[70px] ml-[15px]'/>
                </NavLink>
            </div>
            <div className="mr-[30px] flex items-center gap-4">
                <CircleButton className="!bg-[rgba(255,204,133,0.24)]">
                    <IoSunnyOutline className='text-[20px] text-[#e5780b]'/>
                </CircleButton>
                <CircleButton>
                    <FaRegBell className='text-[20px] text-gray-500'/>
                </CircleButton>
                <CircleButton className={"relative btn_togglo"} onClick={() => toggleMenu("account")}>
                    <img 
                        src={
                            currentUser?.avatar?.startsWith('/uploads')
                            ? `${import.meta.env.VITE_SERVER_URL}${currentUser.avatar}`
                            : currentUser.avatar
                        } 
                        alt="avatar" 
                        className='rounded-[50%]'
                    />
                    {openMenu === "account" && (
                        <div className="absolute bg-white w-[250px] top-[140%] right-0 rounded-[3px] menu pb-2.5 menu_togglo ">
                            <div className="flex flex-col items-center pt-[15px] justify-center">
                                <img 
                                    src={
                                        currentUser?.avatar?.startsWith('/uploads')
                                        ? `${import.meta.env.VITE_SERVER_URL}${currentUser.avatar}`
                                        : currentUser.avatar
                                    } 
                                    alt="avatar" 
                                    className='rounded-[50%] w-10 h-10'
                                />
                                <h5 className="text-[15px] mt-2.5">
                                    {currentUser?.name}
                                </h5>
                                <hr className='h-px border-t border-t-[#cbd0dd] w-full my-3'/>
                            </div>
                            <div className="flex items-center justify-center flex-col gap-2.5 pb-2.5">
                                <ul className='w-full'>
                                    <li className="px-4 py-2 flex gap-2.5 items-center hover_bg_li">
                                        <BsPerson className='text-lg text-gray-600'/>
                                        <NavLink className="capitalize text-[15px] text-gray-600"
                                        to={`/user/${currentUser._id}/edit`}>
                                            tài khoản
                                        </NavLink>
                                    </li>
                                    <li className="px-4 py-2 flex gap-2.5 items-center hover_bg_li">
                                        <FaRegBell className='text-base text-gray-500'/>
                                        <NavLink className="capitalize text-[15px] text-gray-600"
                                        to={"/account/order"}>
                                            thông báo
                                        </NavLink>
                                    </li>
                                    <li className="px-4 py-2 flex gap-2.5 items-center hover_bg_li">
                                        <IoSettingsOutline className='text-gray-600'/>
                                        <NavLink className="capitalize text-[15px] text-gray-600"
                                        to={"/account/voucher"}>
                                            setting
                                        </NavLink>
                                    </li>
                                </ul>
                                <div className="px-4 w-full">
                                    <button onClick={handleLogout}
                                    className="flex items-center justify-center gap-2.5 text-base cursor-pointer bg-[rgba(121,119,119,0.1215686275)] w-full py-1.5 rounded-[8px] !text-black border border-[#cbd0dd]">
                                        <FaArrowRightFromBracket className='text-base'/>
                                        Sign out
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