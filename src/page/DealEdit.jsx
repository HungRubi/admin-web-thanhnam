import { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { Input, Button, Combobox, Textarea, FilePicker } from '../components';
import icon from '../util/icon';
import { useDispatch, useSelector } from "react-redux";
import * as actions from '../store/actions'
import generateSlug from '../util/slug';
import generateDescription from '../util/generateDescription';
const { MdChevronRight } = icon;
const DealEdit = () => {
    const {id} = useParams();
    const danhmucData = [
        {
            id: 'Deals',
            text: 'Deals'
        }
    ]
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
    const {message, slugErr, nameErr, dealEdit} = useSelector(state => state.app)
    useEffect(() => {
        dispatch(actions.getDealEdit(id))
    }, [dispatch, id])
    const [formData, setFormData] = useState({
        name: '',
        slug: '',
        danhmuc: '',
        originalPrice: '',
        price: '',
        url: '',
        image: '',
        duyet: '',
        motangan: '',
        metatitle: '',
        metadescription: '',
        metakeywords: '',
    })
    useEffect(() => {
        if(dealEdit) {
            setFormData({
                name: dealEdit?.name || '',
                slug: dealEdit?.slug || '',
                danhmuc: dealEdit?.danhmuc || '',
                originalPrice: dealEdit?.originalPrice || '',
                price: dealEdit?.price || '',
                url: dealEdit?.url || '',
                image: dealEdit?.image || '',
                duyet: dealEdit?.duyet || '',
                motangan: dealEdit?.motangan || '',
                metatitle: dealEdit?.metatitle || '',
                metadescription: dealEdit?.metadescription || '',
                metakeywords: dealEdit?.metakeywords || '',
            })
        }
    }, [dealEdit])
    const handleChange = (e, selected) => {
        const { name, value } = e.target;
        const nextValue = selected ? selected.id || selected._id : value;
        setFormData((prev) => {
            const updated = {
                ...prev,
                [name]: nextValue,
            };
            if (name === "name") {
                updated.slug = generateSlug(nextValue);
            }
            return updated;
        });
    };
    const handleAssetChange = (file) => {
        setFormData((prev) => ({
            ...prev,
            image: file?.path || '',
        }));
    };
    const handleSubmit  = (e) => {
        e.preventDefault();
        const submitData = { ...formData };
        // Auto-fill motangan if empty
        if (!submitData.motangan || submitData.motangan.trim() === '') {
            submitData.motangan = generateDescription('deal', submitData.name);
        }
        dispatch(actions.updateDeal(id, submitData))
    }
    const navigate = useNavigate();
    useEffect(() => {
        if(message === "Cập nhật deal thành công"){
            navigate("/deal")
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
                        <NavLink to={'/deal'} className={"text-blue-600"}>
                            Deal
                        </NavLink>
                        <MdChevronRight className="text-sm sm:text-base"/>
                        <NavLink to={`/deal/${id}`} className={"text-blue-600"}>
                            Update deal
                        </NavLink>
                    </div>
                    <h2 className="text-xl sm:text-2xl md:text-[35px] font-semibold mt-3 sm:mt-0">Update deal</h2>
                </div>
            </div>
            <form className="w-full px-4 sm:px-6 md:px-[30px] bg-white mt-4 sm:mt-8 min-h-screen" onSubmit={handleSubmit}>
                <div className="w-full flex flex-col sm:flex-row border-b-custom py-5 sm:py-10">
                    <div className="w-full sm:w-2/6 hidden sm:block">
                        <h5 className="text-lg sm:text-[20px] font-medium text-black text-color mt-0 sm:mt-5">
                            Thông tin deal
                        </h5>
                        <p className="text-[12px] text-[#888] line-clamp-2">
                            Thông tin chi tiết về deal
                        </p>
                    </div>
                    <div className="w-full sm:flex-1">
                        <Input 
                            label={"Tên deal"}
                            placeholder={"Tên deal"} 
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
                        
                        <Input 
                            label={"Slug"} 
                            name={"slug"}
                            placeholder={"Slug"}
                            onChange={handleChange}
                            value={formData?.slug}
                        />
                        {
                            slugErr && 
                            <p className="text-red-500 text-[11px] mt-1">
                                {slugErr}
                            </p>
                        }
                        <div className="mt-5"></div>
                        <Combobox
                            label={"Danh mục"}
                            name={"danhmuc"}
                            data={danhmucData}
                            onChange={handleChange}
                            selected={formData?.danhmuc}
                        />
                        <Input 
                            label={"Original Price"}
                            type={"number"} 
                            name={"originalPrice"}
                            placeholder={"Original Price"}
                            onChange={handleChange}
                            value={formData?.originalPrice}
                        />
                        <Input 
                            label={"Price"} 
                            type={"number"} 
                            name={"price"}
                            placeholder={"Price"}
                            onChange={handleChange}
                            value={formData?.price}
                        />
                        <Input 
                            label={"Url"} 
                            name={"url"}
                            placeholder={"url"}
                            onChange={handleChange}
                            value={formData?.url}
                        />
                        <div>
                            <FilePicker label="Image" value={formData?.image} onChange={handleAssetChange} />
                        </div>
                        <div className="mt-5"></div>
                        <Combobox
                            label={"Duyệt bài"}
                            name={"duyet"}
                            data={duyetbatData}
                            onChange={handleChange}
                            selected={formData?.duyet}
                        />
                        <Textarea
                            label={"Mô tả ngắn"}
                            name={"motangan"}
                            row={5}
                            onChange={handleChange}
                            children={formData?.motangan}
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

export default DealEdit