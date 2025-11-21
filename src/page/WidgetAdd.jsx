import { useEffect, useState } from "react";
import { NavLink, useNavigate } from 'react-router-dom';
import { Input, Button, Combobox, Textarea, FilePicker } from '../components';
import icon from '../util/icon';
import { useDispatch, useSelector } from "react-redux";
import * as actions from '../store/actions'
const { MdChevronRight } = icon;
const WidgetAdd = () => {
    const duyetbatData = [
        {
            id: 'Yes',
            text: 'Yes'
        },
        {
            id: 'No',
            text: 'No'
        }
    ]
    const status = [
        {
            id: 'Banner homepage',
            name: 'Banner homepage',
        }
    ]
    const dispatch = useDispatch();
    const { message, nameErr} = useSelector(state => state.app)
    const [formData, setFormData] = useState({
        name: '',
        link: '',
        sapxep: '',
        vitri: '',
        stt: '',
        image: '',
        hienthi: '',
        description: '',
    })
    const handleChange = (e, selected) => {
        setFormData({
            ...formData,
            [e.target.name]: selected ? selected.id || selected._id : e.target.value,
        })
    }
    const handleAssetChange = (file) => {
        setFormData((prev) => ({
            ...prev,
            image: file?.path || '',
        }));
    };
    const handleSubmit  = (e) => {
        e.preventDefault();
        dispatch(actions.addWidget(formData))
    }
    const navigate = useNavigate();
    useEffect(() => {
        if(message === "Thêm trang widget thành công"){
            navigate("/widget")
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
                        <NavLink to={'/'} className={"text-blue-600"}>
                            Widget
                        </NavLink>
                        <MdChevronRight className="text-sm sm:text-base"/>
                        <NavLink to={'/widget/add'} className={"text-blue-600"}>
                            Thêm mới widget
                        </NavLink>
                    </div>
                    <h2 className="text-xl sm:text-2xl md:text-[35px] font-semibold mt-3 sm:mt-0">Thêm mới widget</h2>
                </div>
            </div>
            <form className="w-full px-4 sm:px-6 md:px-[30px] bg-white mt-4 sm:mt-8 min-h-screen" onSubmit={handleSubmit}>
                <div className="w-full flex flex-col sm:flex-row border-b-custom py-5 sm:py-10">
                    <div className="w-full sm:w-2/6 hidden sm:block">
                        <h5 className="text-lg sm:text-[20px] font-medium text-black text-color mt-0 sm:mt-5">
                            Thông tin widget
                        </h5>
                        <p className="text-[12px] text-[#888] line-clamp-2">
                            Thông tin chi tiết về widget
                        </p>
                    </div>
                    <div className="w-full sm:flex-1">
                        <Input 
                            label={"Tên đề widget"} 
                            name={"name"}
                            placeholder={"Tên đề widget"}
                            onChange={handleChange}
                            value={formData?.name}
                        />
                        {
                            nameErr && 
                            <p className="text-red-500 text-[11px] mt-1">
                                {nameErr}
                            </p>
                        }
                        
                        <Input 
                            label={"Link"} 
                            placeholder={"Link"}
                            name={"link"}
                            onChange={handleChange}
                            value={formData?.link}
                        />
                        <div className="mt-5"></div>
                        <Combobox
                            label={"Vị trí hiển thị"}
                            name={"vitri"}
                            data={status}
                            onChange={handleChange}
                            selected={formData?.vitri}
                        />

                        <div className="mt-5"></div>
                        <div>
                            <FilePicker label="Image" value={formData?.image} onChange={handleAssetChange} />
                        </div>

                        <div className="mt-5"></div>
                        <Combobox
                            label={"Hiển thị"}
                            name={"hienthi"}
                            data={duyetbatData}
                            onChange={handleChange}
                            selected={formData?.hienthi}
                        />
                        <Textarea
                            label={"Mô tả widget"}
                            name={"description"}
                            row={5}
                            onChange={handleChange}
                            children={formData?.description}
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

export default WidgetAdd