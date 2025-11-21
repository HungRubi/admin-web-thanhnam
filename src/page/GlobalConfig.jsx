import { NavLink } from "react-router-dom";
import { Input, Button, Textarea, Combobox, FilePicker } from '../components'
import icon from '../util/icon';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from '../store/actions'

const { MdChevronRight } = icon

const GlobalConfig = () => {
    const indexBlock = [
        {
            id: 'Yes',
            name: 'Yes'
        },
        {
            id: 'No',
            name: 'No'
        }
    ]
    const dispatch = useDispatch();
    const { globalConfig } = useSelector(state => state.app)
    useEffect(() => {
        dispatch(actions.getGlobalConfigEdit());
    }, [dispatch])
    
    const [formData, setFormData] = useState({
        name: '',
        logo: '',
        favicon: '',
        blockIndex: 'No',
        slogan: '',
        notifi1: '',
        notifi2: '',
        nameCompany: '',
        userPost: '',
        hotline: '',
        phone: '',
        address: '',
        email: '',
        copyRight: '',
        linkDKBCT: '',
        googleMap: '',
        footer: '',
        contact: '',
    })
    useEffect(() => {
        if(globalConfig) {
            setFormData({
                name: globalConfig?.name || '',
                logo: globalConfig?.logo || '',
                favicon: globalConfig?.favicon || '',
                blockIndex: globalConfig?.blockIndex || 'No',
                slogan: globalConfig?.slogan || '',
                notifi1: globalConfig?.notifi1 || '',
                notifi2: globalConfig?.notifi2 || '',
                nameCompany: globalConfig?.nameCompany || '',
                userPost: globalConfig?.userPost || '',
                hotline: globalConfig?.hotline || '',
                phone: globalConfig?.phone || '',
                address: globalConfig?.address || '',
                email: globalConfig?.email || '',
                copyRight: globalConfig?.copyRight || '',
                linkDKBCT: globalConfig?.linkDKBCT || '',
                googleMap: globalConfig?.googleMap || '',
                footer: globalConfig?.footer || '',
                contact: globalConfig?.contact || '',
            })
        }
    }, [globalConfig])
    const handleChange = (e, selectedItem) => {
        setFormData({
            ...formData,
            [e.target.name]: selectedItem ? selectedItem.id || selectedItem._id : e.target.value,
        })
    }
    const handleLogoChange = (file) => {
        setFormData((prev) => ({
            ...prev,
            logo: file?.path || '',
        }));
    };
    const handleFaviconChange = (file) => {
        setFormData((prev) => ({
            ...prev,
            favicon: file?.path || '',
        }));
    };
    const hanleSubmit = (e) => {
        e.preventDefault();
        dispatch(actions.updateGlobalConfigEdit(formData));
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
                        <NavLink to={'/global-config'} className={"text-blue-600"}>
                            Global Config
                        </NavLink>
                    </div>
                    <h2 className="text-[35px] font-semibold">Cấu hình chung</h2>
                </div>
            </div>
            <form className="w-full px-[30px] bg-white mt-8" onSubmit={hanleSubmit}>
                <div className="w-full flex border-b-custom py-10">
                    <div className="w-2/6 ">
                        <h5 className="text-[20px] font-medium text-black text-color mt-5">
                            Thông tin cấu hình
                        </h5>
                        <p className="text-[12px] text-[#888] line-clamp-2">
                           Cập nhật thông tin cấu hình trang web của bạn
                        </p>
                    </div>
                    <div className="flex-1">

                        <Input 
                            label={"Tên site"}
                            placeholder={"Tên site"}
                            name={"name"}
                            onChange={handleChange}
                            value={formData?.name}
                        />

                        <div>
                            <FilePicker label="Logo" value={formData?.logo} onChange={handleLogoChange} />
                        </div>

                        <div className="mt-5">
                            <FilePicker label="Favicon" value={formData?.favicon} onChange={handleFaviconChange} />
                        </div>
                        <div className="mt-5"></div>
                        <Combobox
                            label={"Chặn index"}
                            name={"blockIndex"}
                            data={indexBlock}
                            onChange={handleChange}
                            selected={formData?.blockIndex}
                        />
                        <Input 
                            label={"Slogan"} 
                            placeholder={"Slogan"} 
                            name={"slogan"}
                            onChange={handleChange}
                            value={formData?.slogan}
                        />

                        <Input 
                            label={"Thông báo đầu trang 1"} 
                            name={"notifi1"}
                            onChange={handleChange}
                            value={formData?.notifi1}
                        />
                        <Input 
                            label={"Thông báo đầu trang 2"} 
                            name={"notifi2"}
                            onChange={handleChange}
                            value={formData?.notifi2}
                        />
                        <Input 
                            label={"Tên công ty"} 
                            placeholder={"Tên công ty"} 
                            name={"companyName"}
                            onChange={handleChange}
                            value={formData?.nameCompany}
                        />
                        <Input 
                            label={"Tên user đăng bài"} 
                            placeholder={"Tên user đăng bài"} 
                            name={"userPost"}
                            onChange={handleChange}
                            value={formData?.userPost}
                        />
                        <Input 
                            label={"Hotline"} 
                            placeholder={"Hotline"} 
                            name={"hotline"}
                            onChange={handleChange}
                            value={formData?.hotline}
                        />
                        <Input 
                            label={"Phone"} 
                            placeholder={"Phone"} 
                            name={"phone"}
                            onChange={handleChange}
                            value={formData?.phone}
                        />
                        <Input 
                            label={"Address"} 
                            placeholder={"Address"} 
                            name={"address"}
                            onChange={handleChange}
                            value={formData?.address}
                        />
                        <Input 
                            label={"Email"} 
                            placeholder={"Email"} 
                            type={"email"}
                            name={"email"}
                            onChange={handleChange}
                            value={formData?.email}
                        />
                        <Input 
                            label={"Coppy Right"} 
                            name={"coppyRight"}
                            onChange={handleChange}
                            value={formData?.copyRight}
                        />
                        <Input 
                            label={"Link DK BCT"} 
                            placeholder={"Link DK BCT"} 
                            name={"linkDKBCT"}
                            onChange={handleChange}
                            value={formData?.linkDKBCT}
                        />
                        <Textarea 
                            label={"Google Map"} 
                            row={5} 
                            name={"googleMap"}
                            onChange={handleChange}
                            children={formData?.googleMap}
                        />
                        <Textarea 
                            label={"Thông tin chân trang"} 
                            row={5} 
                            name={"footer"}
                            onChange={handleChange}
                            children={formData?.footer}
                        />
                        <Textarea 
                            label={"Thông tin liên hệ"} 
                            row={5} 
                            name={"contact"}
                            onChange={handleChange}
                            children={formData?.contact}
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

export default GlobalConfig