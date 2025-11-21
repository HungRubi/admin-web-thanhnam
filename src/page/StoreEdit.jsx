import { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { Input, Button, Combobox, Textarea, FilePicker } from '../components';
import icon from '../util/icon';
import { useDispatch, useSelector } from "react-redux";
import * as actions from '../store/actions'
const { MdChevronRight } = icon;
const StoreEdit = () => {
    const {id} = useParams();
    const eventData = [
        { id: "Uncategorized", text: "Uncategorized" },
        { id: "Black Friday", text: "Black Friday" },
        { id: "Boxing Day", text: "Boxing Day" },
        { id: "Christmas", text: "Christmas" },
        { id: "Halloween", text: "Halloween" },
        { id: "Thanksgiving", text: "Thanksgiving" },
        { id: "Valentine", text: "Valentine" },
    ];
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
    const dispatch = useDispatch();
    const {category, message, slugStoreErr, tenstoreErr, danhmucErr, storeEdit} = useSelector(state => state.app)
    useEffect(() => {
        dispatch(actions.getCategory());
        dispatch(actions.getStoreEdit(id))
    }, [dispatch, id])
    const [formData, setFormData] = useState({
        tenstore: '',
        slug: '',
        danhmuc: '',
        stt: '999',
        event: 'Uncategorized',
        image: '',
        duyetbai: 'Yes',
        motangan: '',
        about: '',
        howtoapply: '',
        faqs: '',
        metatitle: '',
        metadescription: '',
        metakeywords: '',
    })
    useEffect(() => {
        if(storeEdit) {
            setFormData({
                tenstore: storeEdit?.tenstore || '',
                slug: storeEdit?.slug || '',
                danhmuc: storeEdit?.danhmuc || '',
                stt: storeEdit?.stt || '999',
                event: storeEdit?.event || 'Uncategorized',
                image: storeEdit?.image || '',
                duyetbai: storeEdit?.duyetbai || 'Yes',
                motangan: storeEdit?.motangan || '',
                about: storeEdit?.about || '',
                howtoapply: storeEdit?.howtoapply || '',
                faqs: storeEdit?.faqs || '',
                metatitle: storeEdit?.metatitle || '',
                metadescription: storeEdit?.metadescription || '',
                metakeywords: storeEdit?.metakeywords || '',
            })
        }
    }, [storeEdit])
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
        dispatch(actions.updateStore(id, formData))
    }
    const navigate = useNavigate();
    useEffect(() => {
        if(message === "Cập nhật cửa hàng thành công :))"){
            navigate("/store")
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
                        <NavLink to={`/store/${id}`} className={"text-blue-600"}>
                            Update Store
                        </NavLink>
                    </div>
                    <h2 className="text-xl sm:text-2xl md:text-[35px] font-semibold mt-3 sm:mt-0">Cập nhật store</h2>
                </div>
            </div>
            <form className="w-full px-4 sm:px-6 md:px-[30px] bg-white mt-4 sm:mt-8 min-h-screen" onSubmit={handleSubmit}>
                <div className="w-full flex flex-col sm:flex-row border-b-custom py-5 sm:py-10">
                    <div className="w-full sm:w-2/6 hidden sm:block">
                        <h5 className="text-lg sm:text-[20px] font-medium text-black text-color mt-0 sm:mt-5">
                            Thông tin danh mục
                        </h5>
                        <p className="text-[12px] text-[#888] line-clamp-2">
                            Thông tin chi tiết về danh mục
                        </p>
                    </div>
                    <div className="w-full sm:flex-1">
                        <Input 
                            label={"Tên store"} 
                            name={"tenstore"}
                            onChange={handleChange}
                            value={formData?.tenstore}
                        />
                        {
                            tenstoreErr && 
                            <p className="text-red-500 text-[11px] mt-1">
                                {tenstoreErr}
                            </p>
                        }
                        
                        <Input 
                            label={"Slug"} 
                            name={"slug"}
                            onChange={handleChange}
                            value={formData?.slug}
                        />
                        {
                            slugStoreErr && 
                            <p className="text-red-500 text-[11px] mt-1">
                                {slugStoreErr}
                            </p>
                        }
                        <Input 
                            label={"Thứ tự"} 
                            type={"number"}
                            name={"stt"}
                            onChange={handleChange}
                            value={formData?.stt}
                        />
                        <div className="mt-5"></div>
                        <Combobox
                            label={"Danh mục"}
                            name={"danhmuc"}
                            data={category}
                            onChange={handleChange}
                            selected={formData?.danhmuc}
                        />
                        {
                            danhmucErr && 
                            <p className="text-red-500 text-[11px] mt-1">
                                {danhmucErr}
                            </p>
                        }
                        <div className="mt-5"></div>
                        <Combobox
                            label={"Events"}
                            name={"event"}
                            data={eventData}
                            onChange={handleChange}
                            selected={formData?.event}
                        />
                        <div>
                            <FilePicker label="Image" value={formData?.image} onChange={handleAssetChange} />
                        </div>
                        <div className="mt-5"></div>
                        <Combobox
                            label={"Duyệt bài"}
                            name={"duyetbai"}
                            data={duyetbatData}
                            onChange={handleChange}
                            selected={formData?.duyetbai}
                        />
                        <Textarea
                            label={"Mô tả ngắn"}
                            name={"motangan"}
                            row={5}
                            onChange={handleChange}
                            children={formData?.motangan}
                        />
                        <Textarea
                            label={"About store"}
                            name={"about"}
                            row={5}
                            onChange={handleChange}
                            children={formData?.about}
                        />
                        <Textarea
                            label={"About store"}
                            name={"howtoapply"}
                            row={5}
                            onChange={handleChange}
                            children={formData?.howtoapply}
                        />
                        <Textarea
                            label={"About store"}
                            name={"faqs"}
                            row={5}
                            onChange={handleChange}
                            children={formData?.faqs}
                        />
                        <Input 
                            label={"Meta title"} 
                            name={"metatitle"}
                            placeholder={"Meta title"}
                            onChange={handleChange}
                            value={formData?.metatitle}
                        />
                        <Input 
                            label={"Meta keyword"} 
                            name={"metakeywords"}
                            placeholder={"Meta keyword"}
                            onChange={handleChange}
                            value={formData?.metakeywords}
                        />
                        <Textarea 
                            label={"Meta description"} 
                            name={"metadescription"}
                            row={5}
                            onChange={handleChange}
                            children={formData?.metadescription}
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

export default StoreEdit