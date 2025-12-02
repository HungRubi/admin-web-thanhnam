import { useEffect, useState } from "react";
import { NavLink, useParams, useNavigate } from 'react-router-dom';
import { Input, Button, Combobox, Textarea, FilePicker } from '../components';
import icon from '../util/icon';
import { useDispatch, useSelector } from "react-redux";
import * as actions from '../store/actions';
import generateSlug from '../util/slug';
import generateDescription from '../util/generateDescription';
const { MdChevronRight } = icon;
const CategoryEdit = () => {
    const {id} = useParams()
    const dispatch = useDispatch();
    const {category, categoryEdit, message, tendanhmucErr, slugErr} = useSelector(state => state.app);
    useEffect(() => {
        dispatch(actions.getCategory());
        dispatch(actions.getCategoryEdit(id));
    }, [dispatch, id])
    const [formData, setFormData] = useState({
        tendanhmuc: '',
        slug: '',
        danhmuccha: '',
        image: '',
        mota: '',
        metatitle: '',
        metakeywords: '',
        metadescription: '',
        sapxep: ''
    })
    useEffect(() => {
        if(categoryEdit) {
            setFormData({
                tendanhmuc: categoryEdit.tendanhmuc || "",
                slug: categoryEdit.slug || "",
                danhmuccha: categoryEdit.danhmuccha || "",
                image: categoryEdit.image || "",
                mota: categoryEdit.mota || "",
                metatitle: categoryEdit.metatitle || "",
                metakeywords: categoryEdit.metakeywords || "",
                metadescription: categoryEdit.metadescription || "",
                sapxep: categoryEdit.sapxep || "",
            })
        }
    }, [categoryEdit])
    const handleChange = (e, selected) => {
        const { name, value } = e.target;
        const nextValue = selected ? selected.id || selected._id : value;
        setFormData((prev) => {
            const updated = {
                ...prev,
                [name]: nextValue,
            };
            if (name === "tendanhmuc") {
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
        // Auto-fill mota if empty
        if (!submitData.mota || submitData.mota.trim() === '') {
            submitData.mota = generateDescription('category', submitData.tendanhmuc);
        }
        dispatch(actions.updateCategory(id, submitData))
    }
    const navigate = useNavigate();
    useEffect(() => {
        if(message === "Cập nhật danh mục thành công!"){
            navigate("/")
        }
    }, [message, navigate])
    console.log(formData);
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
                            Danh mục
                        </NavLink>
                        <MdChevronRight className="text-sm sm:text-base"/>
                        <NavLink to={'/category-add'} className={"text-blue-600"}>
                            Chỉnh sửa danh mục
                        </NavLink>
                    </div>
                    <h2 className="text-xl sm:text-2xl md:text-[35px] font-semibold mt-3 sm:mt-0">Chỉnh sửa danh mục</h2>
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
                            label={"Tên danh mục"} 
                            name={"tendanhmuc"}
                            onChange={handleChange}
                            value={formData?.tendanhmuc}
                        />
                        {
                            tendanhmucErr && 
                            <p className="text-red-500 text-[11px] mt-1">
                                {tendanhmucErr}
                            </p>
                        }
                        <Input 
                            label={"Slug"} 
                            name={"slug"}
                            onChange={handleChange}
                            value={formData?.slug}
                        />
                        {
                            slugErr && 
                            <p className="text-red-500 text-[11px] mt-1">
                                {slugErr}
                            </p>
                        }
                        <Input 
                            label={"Thứ tự"} 
                            name={"sapxep"}
                            onChange={handleChange}
                            value={formData?.sapxep}
                        />
                        <div className="mt-5"></div>
                        <Combobox
                            label={"Danh mục cha"}
                            name={"danhmuccha"}
                            data={category}
                            onChange={handleChange}
                            selected={formData?.danhmuccha}
                        />

                        <div>
                            <FilePicker label="Image" value={formData?.image} onChange={handleAssetChange} />
                        </div>

                        <Textarea
                            label={"Mô tả"}
                            name={"mota"}
                            row={5}
                            onChange={handleChange}
                            value={formData?.mota}
                        />
                        <p className="mt-1 text-xs text-gray-500 italic">
                            Nếu không điền hiện thống sẽ tự tạo tự động
                        </p>
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

export default CategoryEdit