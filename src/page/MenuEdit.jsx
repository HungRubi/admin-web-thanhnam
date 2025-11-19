import { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { Input, Button, Combobox, Textarea } from '../components';
import icon from '../util/icon';
import { useDispatch, useSelector } from "react-redux";
import * as actions from '../store/actions'
const { MdChevronRight } = icon;
const MenuEdit = () => {
    const status = [
        {
            id: 'Yes',
            text: 'Yes'
        },
        {
            id: 'No',
            text: 'No'
        }
    ]
    const vitri = [
        {
            id: 'Menu chính',
            text: 'Menu chính'
        },
        {
            id: 'Menu chân trang',
            text: 'Menu chân trang'
        }
    ]
    const dispatch = useDispatch();
    const { category, contents,menus, message, nameErr, pageErr, danhmucErr, menuEdit, danhmucchaErr } = useSelector(state => state.app)
    const {id} = useParams();
    useEffect(() => {
        dispatch(actions.getCategory());
        dispatch(actions.getContent());
        dispatch(actions.getMenu());
        dispatch(actions.getMenuEdit(id))
    }, [dispatch, id])
    const [formData, setFormData] = useState({
        name: '',
        danhmuccha: '',
        page: '',
        category: '',
        url: '',
        sapxep: '99999',
        hienthi: 'Yes',
        vitri: 'Menu chính'
    })
    useEffect(() => {
        if(menuEdit) {
            setFormData({
                name: menuEdit?.name || '',
                danhmuccha: menuEdit?.danhmuccha || '',
                page: menuEdit?.page || '',
                category: menuEdit?.category || '',
                url: menuEdit?.url || '',
                sapxep: menuEdit?.sapxep || '99999',
                hienthi: menuEdit?.hienthi || 'Yes',
                vitri: menuEdit?.vitri || 'Menu chính',
            })
        }
    }, [menuEdit])
    const handleChange = (e, selected) => {
        setFormData({
            ...formData,
            [e.target.name]: selected ? selected.id || selected._id : e.target.value,
        })
    }
    const handleSubmit  = (e) => {
        e.preventDefault();
        dispatch(actions.updateMenu(id, formData))
    }
    const navigate = useNavigate();
    useEffect(() => {
        if(message === "Cập nhật menu thành công"){
            navigate("/menu")
        }
    }, [message, navigate])
    return (
        <div className="full pt-5">
            <div className="w-full px-[30px] flex gap-8">
                <div className="w-full">
                    <div className="flex items-center gap-2 text-[15px] text-color">
                        <NavLink to={'/'} className={"hover:text-blue-600 transition duration-300 ease-linear"}>
                            Home
                        </NavLink>
                        <MdChevronRight/>
                        <NavLink to={'/offer'} className={"text-blue-600"}>
                            Offer
                        </NavLink>
                        <MdChevronRight/>
                        <NavLink to={`/offer/${id}`} className={"text-blue-600"}>
                            Cập nhật menu
                        </NavLink>
                    </div>
                    <h2 className="text-[35px] font-semibold">Cập nhật menu</h2>
                </div>
            </div>
            <form className="w-full px-[30px] bg-white mt-8 min-h-screen" onSubmit={handleSubmit}>
                <div className="w-full flex border-b-custom py-10">
                    <div className="w-2/6 ">
                        <h5 className="text-[20px] font-medium text-black text-color mt-5">
                            Thông tin menu
                        </h5>
                        <p className="text-[12px] text-[#888] line-clamp-2">
                            Thông tin chi tiết về menu
                        </p>
                    </div>
                    <div className="flex-1">
                        <Input 
                            label={"Name"} 
                            placeholder={"Name"} 
                            name={"name"}
                            onChange={handleChange}
                            value={formData?.name}
                        />
                        {
                            nameErr && 
                            <p className="text-red-500 text-[11px] mt-1">
                                {nameErr}
                            </p>
                        }
                        <div className="mt-5"></div>
                        <Combobox
                            label={"Menu cha"}
                            name={"danhmuccha"}
                            data={menus}
                            onChange={handleChange}
                            selected={formData?.danhmuccha}
                        />
                        {
                            danhmucchaErr && 
                            <p className="text-red-500 text-[11px] mt-1">
                                {danhmucchaErr}
                            </p>
                        }
                        
                        <div className="mt-5"></div>
                        <Combobox
                            label={"1.Trang"}
                            name={"page"}
                            data={contents}
                            onChange={handleChange}
                            selected={formData?.page}
                        />
                        {
                            pageErr && 
                            <p className="text-red-500 text-[11px] mt-1">
                                {pageErr}
                            </p>
                        }
                        <div className="mt-5"></div>
                        <Combobox
                            label={"2.Danh mục"}
                            name={"category"}
                            data={category}
                            onChange={handleChange}
                            selected={formData?.category}
                        />
                        {
                            danhmucErr && 
                            <p className="text-red-500 text-[11px] mt-1">
                                {danhmucErr}
                            </p>
                        }
                        <Input 
                            label={"3.Url"} 
                            placeholder={"Url"} 
                            name={"url"}
                            onChange={handleChange}
                            value={formData?.url}
                        />

                        <Input 
                            label={"Sắp xếp"} 
                            placeholder={"Sắp xếp"} 
                            name={"sapxep"}
                            onChange={handleChange}
                            value={formData?.sapxep}
                        />

                        <div className="mt-5"></div>
                        <Combobox
                            label={"Hiển thị"}
                            name={"hienthi"}
                            data={status}
                            onChange={handleChange}
                            selected={formData?.hienthi}
                        />

                        <div className="mt-5"></div>
                        <Combobox
                            label={"Vị trí"}
                            name={"vitri"}
                            data={vitri}
                            onChange={handleChange}
                            selected={formData?.vitri}
                        />
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

export default MenuEdit