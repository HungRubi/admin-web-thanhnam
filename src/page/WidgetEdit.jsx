import { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { Input, Button, Combobox, Textarea } from '../components';
import icon from '../util/icon';
import { useDispatch, useSelector } from "react-redux";
import * as actions from '../store/actions'
const { MdChevronRight } = icon;
const WidgetEdit = () => {
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
    const [files, setFiles] = useState([]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            files.forEach(f => URL.revokeObjectURL(f.preview));
            setFiles([
                {
                    id: crypto.randomUUID(), 
                    file,
                    preview: URL.createObjectURL(file),
                },
            ]);
        }
    };
    const {id} = useParams()
    const removeFile = (id, setFiles, files) => {
        setFiles(files.filter((f) => f.id !== id));
    };
    const dispatch = useDispatch();
    const { message, nameErr, widgetEdit} = useSelector(state => state.app)
    useEffect(() => {
        dispatch(actions.getWidgetEdit(id));
    }, [dispatch, id])
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
    useEffect(() => {
        if(widgetEdit) {
            setFormData({
                name: widgetEdit?.name || '',
                link: widgetEdit?.link || '',
                sapxep: widgetEdit?.sapxep || '',
                vitri: widgetEdit?.vitri || '',
                stt: widgetEdit?.stt || '',
                image: widgetEdit?.image || '',
                hienthi: widgetEdit?.hienthi || '',
                description: widgetEdit?.description || '',
            })
        }
    }, [widgetEdit])
    const handleSubmit  = (e) => {
        e.preventDefault();
        dispatch(actions.updateWidget(id, formData))
    }
    const navigate = useNavigate();
    useEffect(() => {
        if(message === "Cập nhật widget thành công :))"){
            navigate("/widget")
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
                        <NavLink to={'/'} className={"text-blue-600"}>
                            Widget
                        </NavLink>
                        <MdChevronRight/>
                        <NavLink to={'/widget/add'} className={"text-blue-600"}>
                            Thêm mới widget
                        </NavLink>
                    </div>
                    <h2 className="text-[35px] font-semibold">Thêm mới widget</h2>
                </div>
            </div>
            <form className="w-full px-[30px] bg-white mt-8 min-h-screen" onSubmit={handleSubmit}>
                <div className="w-full flex border-b-custom py-10">
                    <div className="w-2/6 ">
                        <h5 className="text-[20px] font-medium text-black text-color mt-5">
                            Thông tin widget
                        </h5>
                        <p className="text-[12px] text-[#888] line-clamp-2">
                            Thông tin chi tiết về widget
                        </p>
                    </div>
                    <div className="flex-1">
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
                            <h1 className="block text-[16px] font-medium text-gray-800 mt-5 mb-2.5">Avatar</h1>
                            <div className="mb-5">
                                <label className="relative inline-block">
                                    <input
                                        type="file"
                                        onChange={handleFileChange}
                                        className="hidden"
                                        accept="image/*"
                                    />
                                    <span className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white font-medium rounded cursor-pointer hover:bg-blue-700 transition">
                                        Chọn file
                                    </span>
                                </label>
                            </div>

                            <div className="w-2/3">
                                {files.map((item) => (
                                    <div key={item.id} className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                                    <div className="flex items-start gap-4">
                                        {/* File Preview */}
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

                                        {/* File Info */}
                                        <div className="grow">
                                        <p className="font-medium text-gray-800 break-all">{item.file.name}</p>
                                        <p className="text-sm text-gray-500 mt-1">
                                            {(item.file.size / 1024).toFixed(2)} KB
                                        </p>
                                        </div>

                                        {/* Remove Button */}
                                        <button
                                        onClick={() => removeFile(item.id)}
                                        className="shrink-0 text-gray-400 hover:text-red-600 transition"
                                        >
                                            X
                                        </button>
                                    </div>
                                    </div>
                                ))}

                                {files.length === 0 && (
                                    <div className="bg-white rounded-lg p-12 border-2 border-dashed border-gray-300 text-center">
                                    <p className="text-gray-400">Chưa có file nào được chọn</p>
                                    </div>
                                )}
                            </div>
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

export default WidgetEdit