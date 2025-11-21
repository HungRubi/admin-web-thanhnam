import { useEffect, useState } from "react";
import { NavLink, useNavigate } from 'react-router-dom';
import { Input, Button } from '../components';
import icon from '../util/icon';
import { useDispatch, useSelector } from "react-redux";
import * as actions from '../store/actions'
const { MdChevronRight } = icon;
const OfferAdd = () => {
    const [showConfirm, setShowConfirm] = useState(false);
    const dispatch = useDispatch();
    const { message, accountErr, emailErr, passwordErr, nameErr} = useSelector(state => state.app)
    const [formData, setFormData] = useState({
        hovaten: '',
        tendangnhap: '',
        email: '',
        matkhau: '',
        confirm: '',
        sodienthoai: '',
    })
    const handleChange = (e, selected) => {
        setFormData({
            ...formData,
            [e.target.name]: selected ? selected.id || selected._id : e.target.value,
        })
    }
    const handleSubmit  = (e) => {
        e.preventDefault();
        dispatch(actions.addUser(formData))
    }
    const navigate = useNavigate();
    useEffect(() => {
        if(message === "Tạo tài khoản thành công!"){
            navigate("/user")
        }
    }, [message, navigate])
    return (
        <div className="full pt-3 sm:pt-5">
            <div className="w-full px-4 sm:px-6 md:px-[30px] flex gap-4 sm:gap-8">
                <div className="w-full">
                    <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm md:text-[15px] text-color">
                        <NavLink to={'/'} className={"hover:text-blue-600 transition duration-300 ease-linear"}>
                            Home
                        </NavLink>
                        <MdChevronRight className="text-sm sm:text-base"/>
                        <NavLink to={'/user'} className={"text-blue-600"}>
                            Offer
                        </NavLink>
                        <MdChevronRight className="text-sm sm:text-base"/>
                        <NavLink to={'/user/add'} className={"text-blue-600"}>
                            Thêm mới user
                        </NavLink>
                    </div>
                    <h2 className="text-xl sm:text-2xl md:text-[35px] font-semibold mt-3 sm:mt-0">Thêm mới user</h2>
                </div>
            </div>
            <form className="w-full px-4 sm:px-6 md:px-[30px] bg-white mt-4 sm:mt-8 min-h-screen" onSubmit={handleSubmit}>
                <div className="w-full flex flex-col sm:flex-row border-b-custom py-5 sm:py-10">
                    <div className="w-full sm:w-2/6 hidden sm:block">
                        <h5 className="text-lg sm:text-[20px] font-medium text-black text-color mt-0 sm:mt-5">
                            Thông tin user
                        </h5>
                        <p className="text-[12px] text-[#888] line-clamp-2">
                            Mọi thông tin về user đều được bảo mật
                        </p>
                    </div>
                    <div className="w-full sm:flex-1">
                        <Input 
                            label={"Họ và tên"} 
                            placeholder={"Họ và tên"} 
                            name={"hovaten"}
                            onChange={handleChange}
                            value={formData?.hovaten}
                        />
                        {
                            nameErr && 
                            <p className="text-red-500 text-[11px] mt-1">
                                {nameErr}
                            </p>
                        }
                        <Input 
                            label={"Tên đăng nhập"} 
                            placeholder={"Tên đăng nhập"} 
                            name={"tendangnhap"}
                            onChange={handleChange}
                            value={formData?.tendangnhap}
                        />
                        {
                            accountErr && 
                            <p className="text-red-500 text-[11px] mt-1">
                                {accountErr}
                            </p>
                        }

                        <Input 
                            label={"Email"} 
                            placeholder={"Email"} 
                            type={"email"}
                            name={"email"}
                            onChange={handleChange}
                            value={formData?.email}
                        />
                        {
                            emailErr && 
                            <p className="text-red-500 text-[11px] mt-1">
                                {emailErr}
                            </p>
                        }
                        <Input 
                            label={"Số điện thoại"} 
                            type={"number"}
                            placeholder={"Số điện thoại"} 
                            name={"sodienthoai"}
                            onChange={handleChange}
                            value={formData?.sodienthoai}
                        />
                        <Input 
                            label={"Password"} 
                            type={showConfirm ? "text" : "password"}
                            placeholder={"Password"} 
                            name={"matkhau"}
                            onChange={handleChange}
                            value={formData?.matkhau}
                        />
                        <Input 
                            label={"Nhập lại mật khẩu"} 
                            type={showConfirm ? "text" : "password"}
                            placeholder={"Nhập lại mật khẩu"} 
                            name={"confirm"}
                            onChange={handleChange}
                            value={formData?.confirm}
                        />
                        {
                            passwordErr && 
                            <p className="text-red-500 text-[11px] mt-1">
                                {passwordErr}
                            </p>
                        }
                        <div className="mt-5">
                            <input 
                                type="checkbox" 
                                id="showConfirm" 
                                className="scale-120 mr-2 opacity-80"
                                checked={showConfirm}
                                onChange={() => setShowConfirm(!showConfirm)}
                            />
                            <label htmlFor="showConfirm">Hiện mật khẩu</label>
                        </div>
                    </div>
                </div>
                <div className="w-full py-20 relative">
                    <Button type="button" className={"absolute left-[77.777%] transform -translate-x-[210%] top-[50%] border-none! -translate-y-[50%] font-medium "}>
                        <NavLink to={"/product"}>
                            Cancel
                        </NavLink>
                    </Button>
                    <Button type="submit" className={"absolute left-[77.777%] transform -translate-x-full top-[50%] -translate-y-[50%] shadow-md py-1! font-medium text-white bg-blue-500"}>
                        Save
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default OfferAdd