import { NavLink } from 'react-router-dom';
import { Input, Button, Textarea } from '../components';
import icon from '../util/icon';
const { MdChevronRight } = icon;
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import * as actions from '../store/actions'
const ContentConfig = () => {
    const dispatch = useDispatch();
    const { contentConfig } = useSelector(state => state.app)
    useEffect(() => {
        dispatch(actions.getContentConfigEdit());
    }, [dispatch]) 
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        howToApply: "",
        FAQs: "",
    })
    useEffect(() => {
        if(contentConfig) {
            setFormData({
                name: contentConfig?.name || "",
                description: contentConfig?.description || "",
                howToApply: contentConfig?.howToApply || "",
                FAQs: contentConfig?.FAQs || "",
            })
        }
    }, [contentConfig])
    const handleChange = (e, selectedItem) => {
        setFormData({
            ...formData,
            [e.target.name]: selectedItem ? selectedItem.id || selectedItem._id : e.target.value,
        })
    }
    const hanleSubmit = (e) => {
        e.preventDefault();
        dispatch(actions.updateContentConfigEdit(formData));
    } 

    return (
        <div className="full pt-5">
            <div className="w-full px-[30px] flex gap-8">
                <div className="w-full">
                    <div className="flex items-center gap-2 text-[15px] text-color">
                        <NavLink to={'/'} className={"hover:text-blue-600 transition duration-300 ease-linear"}>
                            Home
                        </NavLink>
                        <MdChevronRight/>
                        <NavLink to={'/content-config'} className={"text-blue-600"}>
                            Content Config
                        </NavLink>
                    </div>
                    <h2 className="text-[35px] font-semibold">Cấu hình nội dung</h2>
                </div>
            </div>
            <form className="w-full px-[30px] bg-white mt-8 min-h-screen" onSubmit={hanleSubmit}>
                <div className="w-full flex border-b-custom py-10">
                    <div className="w-2/6 ">
                        <h5 className="text-[20px] font-medium text-black text-color mt-5">
                            Thông tin cấu hình
                        </h5>
                        <p className="text-[12px] text-[#888] line-clamp-2">
                            Content configuration overview
                        </p>
                    </div>
                    <div className="flex-1">
                        <Input 
                            label={"Site name"} 
                            placeholder={"Site name"} 
                            name={"name"}
                            onChange={handleChange}
                            value={formData?.name}
                        />
                        <Textarea 
                            label={"Mô tả coupons"} 
                            onChange={handleChange}
                            row={5} 
                            name={"description"}
                            children={formData?.description}
                        />
                        <Textarea 
                            label={"How to apply"} 
                            onChange={handleChange}
                            row={5} 
                            name={"howToApply"}
                            children={formData?.howToApply}
                        />
                        <Textarea 
                            label={"FAQs"} 
                            onChange={handleChange}
                            row={5} 
                            name={"FAQs"}
                            children={formData?.FAQs}
                        />
                    </div>
                </div>
                <div className="w-full py-20 relative">
                    <Button type="button" className={"absolute left-[77.777%] transform -translate-x-[210%] top-[50%] !border-none -translate-y-[50%] font-medium "}>
                        <NavLink to={"/product"}>
                            Cancel
                        </NavLink>
                    </Button>
                    <Button type="submit" className={"absolute left-[77.777%] transform -translate-x-[100%] top-[50%] -translate-y-[50%] shadow-md !py-1 font-medium text-white bg-blue-500"}>
                        Save
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default ContentConfig