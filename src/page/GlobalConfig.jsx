import { NavLink, useNavigate } from "react-router-dom";
import { Input, Combobox, Button, InputGroup, Textarea } from '../components'
import icon from '../util/icon';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from '../store/actions'

const { MdChevronRight, MdOutlineDiscount, AiOutlineDollarCircle, MdNumbers, MdVerified } = icon

const GlobalConfig = () => {
    // const dispatch = useDispatch();
    // const {categoryProduct, message, suppliers} = useSelector(state => state.app)
    // useEffect(() => {
    //     dispatch(actions.getCategoryProduct());
    //     dispatch(actions.getSuppliers());
    // }, [dispatch])
    
    const [files1, setFiles1] = useState([]);
    const [files2, setFiles2] = useState([]);

    const handleFileChange = (e, setFiles) => {
        const file = e.target.files[0];
        if (file) {
            setFiles([
            {
                id: Math.random(),
                file,
                preview: URL.createObjectURL(file),
            },
            ]);
        }
    };

    const removeFile = (id, setFiles, files) => {
        setFiles(files.filter((f) => f.id !== id));
    };
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        sale: '',
        cog: '',
        price: '',
        shipping_cost: '',
        unit: '',
        category: '',
        minimum: '',
        supplier: '',
        thumbnail_main: '',
        thumbnail_1: '',
        thumbnail_2: '',
        thumbnail_3: '',
        warranty_period: '',
    })
    const handleChange = (e, selectedItem) => {
        setFormData({
            ...formData,
            [e.target.name]: selectedItem ? selectedItem.id || selectedItem._id : e.target.value,
        })
    }
    // const hanleSubmit = (e) => {
    //     e.preventDefault();
    //     dispatch(actions.createProduct(formData));
    // } 
    // const navigate = useNavigate()
    // useEffect(() => {
    //     if(message === 'Thêm sản phẩm thành công') {
    //         navigate("/product")
    //     }
    // }, [message, navigate])
    return (
        <div className="full pt-5">
            <div className="w-full px-[30px] flex gap-8">
                <div className="w-full">
                    <div className="flex items-center gap-2 text-[15px] text-color">
                        <NavLink to={'/'} className={"hover:text-blue-600 transition duration-300 ease-linear"}>
                            Home
                        </NavLink>
                        <MdChevronRight/>
                        <NavLink to={'/author-config'} className={"text-blue-600"}>
                            Global Config
                        </NavLink>
                    </div>
                    <h2 className="text-[35px] font-semibold">Cấu hình chung</h2>
                </div>
            </div>
            <form className="w-full px-[30px] bg-white mt-8">
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
                            label={"Tên site"} 
                            name={"name"}
                            onChange={handleChange}
                            value={formData.name}
                        />

                        <div>
                            <h2 className="block text-[16px] font-medium text-gray-800 mt-5">Logo</h2>
                            <div className="my-2.5">
                                <label className="relative inline-block">
                                <input
                                    type="file"
                                    onChange={(e) => handleFileChange(e, setFiles1, files1)}
                                    className="hidden"
                                    accept="image/*"
                                />
                                <span className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white font-medium rounded cursor-pointer hover:bg-blue-700 transition">
                                    Chọn file
                                </span>
                                </label>
                            </div>

                            <div className="w-2/3 block">
                                {files1.map((item) => (
                                <div key={item.id} className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                                    <div className="flex items-start gap-4">
                                    <div className="shrink-0">
                                        {item.file.type.startsWith('image/') ? (
                                        <img
                                            src={item.preview}
                                            alt={item.file.name}
                                            className="w-32 h-32 object-cover rounded border border-gray-300"
                                        />
                                        ) : (
                                        <div className="w-32 h-32 bg-gray-100 border-2 border-dashed border-gray-300 rounded flex items-center justify-center">
                                            <span className="text-gray-400 text-xs text-center px-2">No preview</span>
                                        </div>
                                        )}
                                    </div>

                                    <div className="grow">
                                        <p className="font-medium text-gray-800 break-all">{item.file.name}</p>
                                        <p className="text-sm text-gray-500 mt-1">
                                        {(item.file.size / 1024).toFixed(2)} KB
                                        </p>
                                    </div>

                                    <button
                                        onClick={() => removeFile(item.id, setFiles1, files1)}
                                        className="shrink-0 text-gray-400 hover:text-red-600 transition"
                                    >
                                        X
                                    </button>
                                    </div>
                                </div>
                                ))}

                                {files1.length === 0 && (
                                <div className="bg-white rounded-lg p-12 border-2 border-dashed border-gray-300 text-center">
                                    <p className="text-gray-400">Chưa có file nào được chọn</p>
                                </div>
                                )}
                            </div>
                        </div>

                        <div className="mt-5">
                            <h2 className="block text-[16px] font-medium text-gray-800 mt-5">Favicon</h2>
                            <div className="my-2.5">
                                <label className="relative inline-block">
                                <input
                                    type="file"
                                    onChange={(e) => handleFileChange(e, setFiles2, files2)}
                                    className="hidden"
                                    accept="image/*"
                                />
                                <span className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white font-medium rounded cursor-pointer hover:bg-blue-700 transition">
                                    Chọn file
                                </span>
                                </label>
                            </div>

                            <div className="w-2/3 block">
                                {files2.map((item) => (
                                <div key={item.id} className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                                    <div className="flex items-start gap-4">
                                    <div className="shrink-0">
                                        {item.file.type.startsWith('image/') ? (
                                        <img
                                            src={item.preview}
                                            alt={item.file.name}
                                            className="w-32 h-32 object-cover rounded border border-gray-300"
                                        />
                                        ) : (
                                        <div className="w-32 h-32 bg-gray-100 border-2 border-dashed border-gray-300 rounded flex items-center justify-center">
                                            <span className="text-gray-400 text-xs text-center px-2">No preview</span>
                                        </div>
                                        )}
                                    </div>

                                    <div className="grow">
                                        <p className="font-medium text-gray-800 break-all">{item.file.name}</p>
                                        <p className="text-sm text-gray-500 mt-1">
                                        {(item.file.size / 1024).toFixed(2)} KB
                                        </p>
                                    </div>

                                    <button
                                        onClick={() => removeFile(item.id, setFiles2, files2)}
                                        className="shrink-0 text-gray-400 hover:text-red-600 transition"
                                    >
                                        X
                                    </button>
                                    </div>
                                </div>
                                ))}

                                {files2.length === 0 && (
                                <div className="bg-white rounded-lg p-12 border-2 border-dashed border-gray-300 text-center">
                                    <p className="text-gray-400">Chưa có file nào được chọn</p>
                                </div>
                                )}
                            </div>
                        </div>
                        
                        <Input 
                            label={"Slogan"} 
                            name={"slogan"}
                            onChange={handleChange}
                            value={formData.name}
                        />

                        <Input 
                            label={"Thông báo đầu trang 1"} 
                            name={"notification1"}
                            onChange={handleChange}
                            value={formData.name}
                        />
                        <Input 
                            label={"Thông báo đầu trang 2"} 
                            name={"notification2"}
                            onChange={handleChange}
                            value={formData.name}
                        />
                        <Input 
                            label={"Tên công ty"} 
                            name={"companyName"}
                            onChange={handleChange}
                            value={formData.name}
                        />
                        <Input 
                            label={"Tên user đăng bài"} 
                            name={"userPost"}
                            onChange={handleChange}
                            value={formData.name}
                        />
                        <Input 
                            label={"Hotline"} 
                            name={"hotline"}
                            onChange={handleChange}
                            value={formData.name}
                        />
                        <Input 
                            label={"Phone"} 
                            name={"phone"}
                            onChange={handleChange}
                            value={formData.name}
                        />
                        <Input 
                            label={"Address"} 
                            name={"address"}
                            onChange={handleChange}
                            value={formData.name}
                        />
                        <Input 
                            label={"Email"} 
                            name={"email"}
                            onChange={handleChange}
                            value={formData.name}
                        />
                        <Input 
                            label={"Coppy Right"} 
                            name={"coppyRight"}
                            onChange={handleChange}
                            value={formData.name}
                        />
                        <Input 
                            label={"Link DK BCT"} 
                            name={"coppyRight"}
                            onChange={handleChange}
                            value={formData.name}
                        />
                        <Textarea 
                            label={"Google Map"} 
                            row={5} 
                            name={"googleMap"}
                            onChange={handleChange}
                            children={formData.googleMap}
                        />
                        <Textarea 
                            label={"Thông tin chân trang"} 
                            row={5} 
                            name={"footerInfo"}
                            onChange={handleChange}
                            children={formData.footerInfo}
                        />
                        <Textarea 
                            label={"Thông tin liên hệ"} 
                            row={5} 
                            name={"contactInfo"}
                            onChange={handleChange}
                            children={formData.contactInfo}
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

export default GlobalConfig