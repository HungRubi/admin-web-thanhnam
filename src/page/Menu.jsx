import  { Search, Button, CircleButton, PageBar, ModelToast, Empty } from '../components';
import icon from '../util/icon';
import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import * as actions from '../store/actions'
import { useDispatch, useSelector } from 'react-redux';
const { MdChevronRight, MdAutoFixHigh, IoMdAdd, RiDeleteBin6Line, IoMdRefresh} = icon;
const Menu = () => {
    const vitri = [
        {
            id: 'Menu chính',
            text: 'Menu chính'
        },
        {
            id: 'Menu chân trang',
            text: 'Menu chân trang'
        }
    ]
    const dispatch = useDispatch();
    const {menus} = useSelector(state => state.app);
    useEffect(() => {
        dispatch(actions.getMenu());
    }, [dispatch])
    const handleSearch = (value) => {
        dispatch(actions.getMenu(value))
    }
    const [current, setCurrent] = useState(1);
    const limit = 10;
    const lastIndex = current * limit;
    const firstIndex = lastIndex - limit;
    const currentMenu = menus?.slice(firstIndex, lastIndex);

    const [isModal, setIsModal] = useState(false);
    const [deleteItem, setDeleteItem] = useState();
    const [selectedIds, setSelectedIds] = useState([]);
        
    const handleCheckItem = (id) => {
        setSelectedIds(prev => {
            if (prev.includes(id)) {
                return prev.filter(item => item !== id);
            } else {
                return [...prev, id]; 
            }
        });
    }
    const handleCheckAll = () => {
        if (selectedIds.length === currentMenu?.length) {
            setSelectedIds([]); 
        } else {
            setSelectedIds(currentMenu?.map(item => item._id));
        }
    }
    const handleDelete = () => {
        if (deleteItem) {
            dispatch(actions.deleteMenu(deleteItem)); 
        } else if (selectedIds.length > 0) {
            dispatch(actions.deleteManyMenu(selectedIds)); 
            setSelectedIds([])
        }
    }

    const [filters, setFilters] = useState({ vitri: "",});
        
    const handleChange = (e) => {
        const { name, value } = e.target;

        const newFilters = { ...filters, [name]: value };
        setFilters(newFilters);

        if (!newFilters.vitri) {
            dispatch(actions.getMenu());
        } else {
            dispatch(actions.filterMenu(newFilters));
        }
    };
    return (
        <div className="full pt-5">
            {isModal && <ModelToast isOpen={isModal} setIsOpen={setIsModal} onDelete={handleDelete}/>}
            <div className="w-full px-[30px] flex gap-8">
                <div className="w-full">
                    <div className="flex items-center gap-2 text-[15px] text-color">
                        <NavLink to={'/'} className={"hover:text-blue-600 transition duration-300 ease-linear"}>
                            Dashboard
                        </NavLink>
                        <MdChevronRight/>
                        <NavLink to={'/menu'} className={"text-blue-600"}>
                            Menu
                        </NavLink>
                    </div>
                    <h2 className="text-[35px] font-semibold mt-5">Quản lý menu</h2>
                </div>
            </div>
            <div className="w-full bg-white border-t-custom px-[30px] mt-8">
                <div className="flex items-center gap-5 mt-5 justify-between ">
                    <div className="w-3/5 flex items-center gap-5">
                        <Search 
                            className={"rounded-lg!"}  
                            placeholder={"Enter product name..."}
                            onSearch={handleSearch}
                        />
                        <select 
                            className={`w-1/3 border border-gray-300 text-gray-800 text-sm rounded-lg focus:ring-blue-500 
                                focus:border-blue-500 block py-1.5 px-2.5 dark:bg-gray-700 
                                dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
                                dark:focus:ring-blue-500 dark:focus:border-blue-500 `} 
                            aria-label="Default select example"
                            name='vitri'
                            onChange={handleChange}
                        >
                            <option value="">--- Loại danh mục ---</option>
                            {vitri?.map((item, index) => (
                                <option key={index} value={item._id}>{item.text}</option>
                            ))}
                        </select>
                    </div>
                    <div className="flex items-center justify-end gap-3">
                        <NavLink to={'/menu/add'}>
                            <Button className={"gap-2.5 py-1.5! border-none! bg-blue-500 text-white hover:bg-blue-600 text-sm"}>
                                <CircleButton className={'h-4! w-4! bg-white!'}>
                                    <IoMdAdd className='text-blue-600 text-sm'/>
                                </CircleButton>
                                Thêm mới
                            </Button>
                        </NavLink>
                        <Button 
                            className={"gap-2.5 py-1.5! border-none! bg-red-500 text-white hover:bg-red-600 text-sm"}
                            onClick={() => {
                                setIsModal(true)
                            }}
                        >
                            <RiDeleteBin6Line className='text-white text-base'/>
                             Xóa ({selectedIds.length})
                        </Button>
                        <Button 
                            className={"gap-2.5 py-1.5! border-none! bg-gray-500 text-white hover:bg-gray-600 text-sm"}
                            onClick={() => {
                                setSelectedIds([]);
                            }}
                        >
                            <IoMdRefresh className='text-white text-base'/>
                            Cancel
                        </Button>
                    </div>
                </div>
                <div className="relative overflow-x-auto mt-5">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-600 dark:text-gray-400 shadow_table">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-2 py-3"></th>
                                <th scope="col" className="px-2 py-3">
                                    <input 
                                        type="checkbox" 
                                        className='scale-120'
                                        checked={selectedIds?.length === currentMenu?.length && currentMenu?.length > 0}
                                        onChange={handleCheckAll}
                                    />
                                </th>
                                <th scope="col" className="px-4 py-3">
                                    Tiêu đề
                                </th>
                                <th scope="col" className="px-4 py-3">
                                    Trang
                                </th>
                                <th scope="col" className="px-4 py-3">
                                    Danh mục
                                </th>
                                <th scope="col" className="px-4 py-3">
                                    Custom URL
                                </th>
                                <th scope="col" className="px-4 py-3">
                                    Hiển thị
                                </th>
                                <th scope="col" className="px-4 py-3">
                                    STT
                                </th>
                                <th scope="col" className="px-4 py-3">
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {menus && menus?.length > 0 ? currentMenu?.map((item, index) => (
                                <tr 
                                    key={item._id}
                                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 row-table"
                                >
                                    <td className="px-2 py-4 w-10 text-center">
                                        <span className='text-base font-semibold'>
                                            {index + 1}
                                        </span>
                                    </td>
                                    <td className="px-2 py-4 w-10">
                                        <input 
                                            type="checkbox" 
                                            className='scale-120'
                                            checked={selectedIds.includes(item._id)}
                                            onChange={() => handleCheckItem(item._id)}
                                        />
                                    </td>
                                    <th scope="row" className="px-4 py-4 font-medium text-gray-900 dark:text-white w-2/11">
                                        <NavLink to={`/menu/${item._id}`} className="line-clamp-2 text-blue-500">
                                            {item.name}
                                        </NavLink>
                                    </th>
                                    <td className="px-4 py-4 w-2/11">
                                        {item.page?.name}
                                    </td>
                                    <td className="px-4 py-4 w-2/11">
                                        {item.danhmuccha?.name || "NULL"}
                                    </td>
                                    <td className="px-4 py-4 w-2/11">
                                        <NavLink to={`${item.url || ""}`} target='_blank' className="line-clamp-2 text-blue-500">
                                            {item.url || "NULL"}
                                        </NavLink>
                                    </td>
                                    <td className="px-4 py-4 w-1/14">
                                        {
                                            item.hienthi === 'Yes' && 
                                            <Button className={"border-[#90d67f]! py-0.5! bg-[#d9fbd0] text-main capitalize"}>
                                                Yes
                                            </Button>
                                        }
                                        {
                                            item.hienthi === 'No' && 
                                            <Button className={"border-[#f74d4d8a]! py-0.5! bg-[#ff8585a6] text-[#c90c05] capitalize"}>
                                                No
                                            </Button>
                                        }
                                    </td>
                                    <td className="px-4 py-4 w-1/14">
                                        {item.sapxep}
                                    </td>
                                    <td className="py-4 w-1/10 text-center px-4">
                                        <div className="flex items-start justify-start gap-3 m-auto">
                                            <NavLink to={`/menu/${item._id}`}>
                                                <Button className={"py-2! px-2! bg-blue-500  text-white"}>
                                                    <MdAutoFixHigh className='text-[18px]'/>
                                                </Button>
                                            </NavLink>
                                            <Button 
                                                className={"py-2! px-2! bg-red-500 text-white"}
                                                onClick={() => {
                                                    setDeleteItem(item._id);
                                                    setIsModal(true);
                                                }}
                                            >
                                                <RiDeleteBin6Line className='text-[18px]'/>
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            )) : (
                                <Empty/>
                            )}
                        </tbody>
                    </table>
                    {menus && currentMenu?.length > 0 ? (
                        <PageBar 
                            currentPage={current} 
                            totalPage={Math.ceil(menus?.length / limit)}
                            onPageChange={setCurrent}
                        />
                    ): (<></>)}
                </div>
            </div>
        </div>
    );
}

export default Menu;