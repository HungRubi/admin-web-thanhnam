import { useEffect, useState } from "react";
import { NavLink, useNavigate } from 'react-router-dom';
import { Input, Button, Combobox, Textarea, FilePicker } from '../components';
import icon from '../util/icon';
import { useDispatch, useSelector } from "react-redux";
import * as actions from '../store/actions'
const { MdChevronRight } = icon;
const NewAdd = () => {
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
    const {message, slugErr, nameErr, category, categoryErr} = useSelector(state => state.app)
    useEffect(() => {
        dispatch(actions.getCategory())
    }, [dispatch])
    const [formData, setFormData] = useState({
        name: '',
        slug: '',
        category: '',
        image: '',
        duyet: '',
        description: '',
        content: '',
        metatitle: '',
        metadescription: '',
        metakeywords: '',
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
        dispatch(actions.addNew(formData))
    }
    const navigate = useNavigate();
    useEffect(() => {
        if(message === "Thêm tin tức thành công"){
            navigate("/new")
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
                        <NavLink to={'/new'} className={"text-blue-600"}>
                            New
                        </NavLink>
                        <MdChevronRight/>
                        <NavLink to={'/new/add'} className={"text-blue-600"}>
                            Thêm mới tin tức
                        </NavLink>
                    </div>
                    <h2 className="text-[35px] font-semibold">Thêm mới new</h2>
                </div>
            </div>
            <form className="w-full px-[30px] bg-white mt-8 min-h-screen" onSubmit={handleSubmit}>
                <div className="w-full flex border-b-custom py-10">
                    <div className="w-2/6 ">
                        <h5 className="text-[20px] font-medium text-black text-color mt-5">
                            Thông tin tin tức
                        </h5>
                        <p className="text-[12px] text-[#888] line-clamp-2">
                            Thông tin chi tiết về tin tức
                        </p>
                    </div>
                    <div className="flex-1">
                        <Input 
                            label={"Tên bài viết"}
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
                            name={"category"}
                            data={category}
                            onChange={handleChange}
                            selected={formData?.category}
                        />
                        {
                            categoryErr && 
                            <p className="text-red-500 text-[11px] mt-1">
                                {categoryErr}
                            </p>
                        }
                        <div>
                            <FilePicker label="Avatar" value={formData?.image} onChange={handleAssetChange} />
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
                            name={"description"}
                            row={5}
                            onChange={handleChange}
                            children={formData?.description}
                        />
                        <Textarea
                            label={"Nội dung chi tiết"}
                            name={"content"}
                            row={5}
                            onChange={handleChange}
                            children={formData?.content}
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

export default NewAdd