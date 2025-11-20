import { NavLink } from 'react-router-dom';
import { Input, Button, Textarea } from '../components';
import icon from '../util/icon';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import * as actions from '../store/actions'
const { MdChevronRight } = icon;
const SeoConfig = () => {
    
    const dispatch = useDispatch();
    const { seoConfig } = useSelector(state => state.app)
    useEffect(() => {
        dispatch(actions.getSeoConfigEdit());
    }, [dispatch]) 
    const [formData, setFormData] = useState({
        metaTitle:"",
        metaKeywords:"",
        metaDescription:"",
        googleAnalyticCode:"",
    })
    useEffect(() => {
        if(seoConfig) {
            setFormData({
                metaTitle: seoConfig?.metaTitle || "",
                metaKeywords: seoConfig?.metaKeywords || "",
                metaDescription: seoConfig?.metaDescription || "",
                googleAnalyticCode: seoConfig?.googleAnalyticCode || "",
            })
        }
    }, [seoConfig])
    const handleChange = (e, selectedItem) => {
        setFormData({
            ...formData,
            [e.target.name]: selectedItem ? selectedItem.id || selectedItem._id : e.target.value,
        })
    }
    const hanleSubmit = (e) => {
        e.preventDefault();
        dispatch(actions.updateSeoConfigEdit(formData));
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
                        <NavLink to={'/seo-config'} className={"text-blue-600"}>
                            SEO Config
                        </NavLink>
                    </div>
                    <h2 className="text-[35px] font-semibold">Cấu hình SEO</h2>
                </div>
            </div>
            <form className="w-full px-[30px] bg-white mt-8 min-h-screen" onSubmit={hanleSubmit}>
                <div className="w-full flex border-b-custom py-10">
                    <div className="w-2/6 ">
                        <h5 className="text-[20px] font-medium text-black text-color mt-5">
                            Thông tin cấu hình
                        </h5>
                        <p className="text-[12px] text-[#888] line-clamp-2">
                            Global configuration overview
                        </p>
                    </div>
                    <div className="flex-1">
                        <Input 
                            label={"Meta title"} 
                            placeholder={"Meta title"} 
                            name={"metaTitle"}
                            onChange={handleChange}
                            value={formData?.metaTitle}
                        />
                        <Textarea 
                            label={"Meta keyword"} 
                            row={5} 
                            name={"metaKeyword"}
                            onChange={handleChange}
                            children={formData?.metaKeywords}
                        />
                        <Textarea 
                            label={"Meta description"} 
                            row={5} 
                            name={"metaDescription"}
                            onChange={handleChange}
                            children={formData?.metaDescription}
                        />
                        <Textarea 
                            label={"Google Analytics Code"} 
                            row={5} 
                            name={"googleAnalyticsCode"}
                            onChange={handleChange}
                            children={formData?.googleAnalyticCode}
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

export default SeoConfig