import { useState } from "react";
import { NavLink } from 'react-router-dom';
import { Input, Button, Combobox, Textarea } from '../components';
import icon from '../util/icon';
const { MdChevronRight } = icon;
const CategoryAdd = () => {
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

    const removeFile = (id, setFiles, files) => {
        setFiles(files.filter((f) => f.id !== id));
    };
    const data = [
        { id: 1, name: 'Category 1' },
        { id: 2, name: 'Category 2' },
        { id: 3, name: 'Category 3' },
    ]
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
                            Danh mục
                        </NavLink>
                        <MdChevronRight/>
                        <NavLink to={'/category-add'} className={"text-blue-600"}>
                            Thêm mới danh mục
                        </NavLink>
                    </div>
                    <h2 className="text-[35px] font-semibold">Thêm mới danh mục</h2>
                </div>
            </div>
            <form className="w-full px-[30px] bg-white mt-8 min-h-screen">
                <div className="w-full flex border-b-custom py-10">
                    <div className="w-2/6 ">
                        <h5 className="text-[20px] font-medium text-black text-color mt-5">
                            Thông tin danh mục
                        </h5>
                        <p className="text-[12px] text-[#888] line-clamp-2">
                            Thông tin chi tiết về danh mục
                        </p>
                    </div>
                    <div className="flex-1">
                        <Input 
                            label={"Tên danh mục"} 
                            name={"categoryName"}
                        />
                        <Input 
                            label={"Slug"} 
                            name={"slug"}
                        />
                        <div className="mt-5"></div>
                        <Combobox
                            label={"Danh mục cha"}
                            data={data}
                        />
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
                        <Textarea
                            label={"Mô tả"}
                            row={5}
                        />
                        <Input 
                            label={"Meta title"} 
                            name={"metaTitle"}
                        />
                        <Input 
                            label={"Meta keyword"} 
                            name={"metaKeyword"}
                        />
                        <Textarea 
                            label={"Meta description"} 
                            name={"metaDescription"}
                            row={5}
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

export default CategoryAdd