import { useState, useEffect } from "react";
import { NavLink } from 'react-router-dom';
import { Input, Button, FilePicker } from '../components';
import { useDispatch, useSelector } from "react-redux";
import * as actions from '../store/actions'
import icon from '../util/icon';
const { MdChevronRight } = icon;
const SocialConfig = () => {
    
    const dispatch = useDispatch();
    const { socialConfig } = useSelector(state => state.app)
    useEffect(() => {
        dispatch(actions.getSocialConfigEdit());
    }, [dispatch]) 
    const [formData, setFormData] = useState({
        iamge: '',
        facebook: '',
        facebookPage: '',
        twitter: '',
        instagram: '',
        pinterest: '',
        youtube: '',
    })
    useEffect(() => {
        if(socialConfig) {
            setFormData({
                iamge: socialConfig?.iamge || '',
                facebook: socialConfig?.facebook || '',
                facebookPage: socialConfig?.facebookPage || '',
                twitter: socialConfig?.twitter || '',
                instagram: socialConfig?.instagram || '',
                pinterest: socialConfig?.pinterest || '',
                youtube: socialConfig?.youtube || '',
            })
        }
    }, [socialConfig])
    const handleChange = (e, selectedItem) => {
        setFormData({
            ...formData,
            [e.target.name]: selectedItem ? selectedItem.id || selectedItem._id : e.target.value,
        })
    }
    const hanleSubmit = (e) => {
        e.preventDefault();
        dispatch(actions.updateSocialConfigEdit(formData));
    } 
    const handleAssetChange = (file) => {
        setFormData((prev) => ({
            ...prev,
            iamge: file?.path || '',
        }));
    };
    return (
        <div className="full pt-3 sm:pt-5">
            <div className="w-full px-4 sm:px-6 md:px-[30px] flex gap-4 sm:gap-8">
                <div className="w-full">
                    <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm md:text-[15px] text-color">
                        <NavLink to={'/'} className={"hover:text-blue-600 transition duration-300 ease-linear"}>
                            Home
                        </NavLink>
                        <MdChevronRight className="text-sm sm:text-base"/>
                        <NavLink to={'/social-config'} className={"text-blue-600"}>
                            Social Config
                        </NavLink>
                    </div>
                    <h2 className="text-xl sm:text-2xl md:text-[35px] font-semibold mt-3 sm:mt-0">Cấu hình mạng xã hội</h2>
                </div>
            </div>
            <form className="w-full px-4 sm:px-6 md:px-[30px] bg-white mt-4 sm:mt-8 min-h-screen" onSubmit={hanleSubmit}>
                <div className="w-full flex flex-col sm:flex-row border-b-custom py-5 sm:py-10">
                    <div className="w-full sm:w-2/6 hidden sm:block">
                        <h5 className="text-lg sm:text-[20px] font-medium text-black text-color mt-0 sm:mt-5">
                            Thông tin cấu hình
                        </h5>
                        <p className="text-[12px] text-[#888] line-clamp-2">
                            Social configuration overview
                        </p>
                    </div>
                    <div className="w-full sm:flex-1">
                        <FilePicker label="Image" value={formData?.iamge} onChange={handleAssetChange} />
                        <Input 
                            label={"Facebook URL"} 
                            placeholder={"Facebook URL"} 
                            name={"facebook"}
                            onChange={handleChange}
                            value={formData?.facebook}
                        />
                        <Input 
                            label={"Facebook Page ID"} 
                            placeholder={"Facebook Page ID"} 
                            onChange={handleChange}
                            name={"facebookPage"}
                            value={formData?.facebookPage}

                        />
                        <Input 
                            label={"Twitter URL"} 
                            placeholder={"Twitter URL"} 
                            name={"twitter"}
                            onChange={handleChange}
                            value={formData?.twitter}
                        />
                        <Input 
                            label={"Instagram URL"} 
                            placeholder={"Instagram URL"} 
                            name={"instagram"}
                            onChange={handleChange}
                            value={formData?.instagram}
                        />
                        <Input 
                            label={"Pinterest URL"} 
                            placeholder={"Pinterest URL"} 
                            name={"pinterest"}
                            onChange={handleChange}
                            value={formData?.pinterest}
                        />
                        <Input 
                            label={"Youtobe URL"} 
                            placeholder={"Youtobe URL"} 
                            name={"youtube"}
                            onChange={handleChange}
                            value={formData?.youtube}
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

export default SocialConfig