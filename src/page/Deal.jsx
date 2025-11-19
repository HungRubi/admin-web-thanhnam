import  { Search, Button, CircleButton, PageBar, ModelToast, Empty } from '../components';
import icon from '../util/icon';
import { NavLink } from 'react-router-dom';
import * as actions from '../store/actions';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
const { MdChevronRight, MdAutoFixHigh, IoMdAdd, RiDeleteBin6Line, IoMdRefresh} = icon;
const Deal = () => {
    const category = [
        {
            id: 'Deals',
            name: 'Deals',
        },
    ]
    const status = [
        {
            id: 'Yes',
            name: 'Yes',
        },
        {
            id: 'No',
            name: 'No',
        },
    ]
    const dispatch = useDispatch();
    const { deal } = useSelector(state => state.app);
    useEffect(() => {
        dispatch(actions.getDeal());
    }, [dispatch])

    const [current, setCurrent] = useState(1);
        const limit = 10;
        const lastIndex = current * limit;
        const firstIndex = lastIndex - limit;
        const currentDeal = deal?.slice(firstIndex, lastIndex);

    const handleSearch = (value) => {
        dispatch(actions.getDeal(value))
    }

    const [deleteItem, setDeleteItem] = useState();
    const [isModal, setIsModal] = useState(false);
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
        if (selectedIds.length === currentDeal?.length) {
            setSelectedIds([]); 
        } else {
            setSelectedIds(currentDeal?.map(item => item._id));
        }
    }
    const handleDelete = () => {
        if (deleteItem) {
            dispatch(actions.deleteDeal(deleteItem)); 
        } else if (selectedIds.length > 0) {
            dispatch(actions.deleteManyDeal(selectedIds)); 
            setSelectedIds([])
        }
    }
    const [filters, setFilters] = useState({ danhmuc: "", duyet: "" });
    
    const handleChange = (e) => {
        const { name, value } = e.target;

        const updated = { ...filters, [name]: value };
        setFilters(updated);

        const cleanFilter = {};
        if (updated.danhmuc) cleanFilter.danhmuc = updated.danhmuc;
        if (updated.duyet) cleanFilter.duyet = updated.duyet;

        if (Object.keys(cleanFilter).length === 0) {
            dispatch(actions.getDeal());
        } else {
            dispatch(actions.filterDeal(cleanFilter));
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
                        <NavLink to={'/deal'} className={"text-blue-600"}>
                            Deal
                        </NavLink>
                    </div>
                    <h2 className="text-[35px] font-semibold mt-5">Quản lý deal</h2>
                </div>
            </div>
            <div className="w-full bg-white border-t-custom px-[30px] mt-8">
                <div className="flex items-center gap-5 mt-5 justify-between ">
                    <div className="w-3/5 flex items-center gap-5">
                        <Search 
                            onSearch={handleSearch}
                            className={"rounded-lg!"}  
                            placeholder={"Enter product name..."}
                        />
                        <select 
                            className={`w-1/3 border border-gray-300 text-gray-800 text-sm rounded-lg focus:ring-blue-500 
                                focus:border-blue-500 block py-1.5 px-2.5 dark:bg-gray-700 
                                dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
                                dark:focus:ring-blue-500 dark:focus:border-blue-500 `} 
                            aria-label="Default select example"
                            onChange={handleChange}
                            name='danhmuc'
                        >
                            <option value="">--- Danh mục store ---</option>
                            {category?.map((item, index) => (
                                <option key={index} value={item._id}>{item.name}</option>
                            ))}
                        </select>
                        <select 
                            className={`w-1/3 border border-gray-300 text-gray-800 text-sm rounded-lg focus:ring-blue-500 
                                focus:border-blue-500 block py-1.5 px-2.5 dark:bg-gray-700 
                                dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
                                dark:focus:ring-blue-500 dark:focus:border-blue-500 `} 
                            aria-label="Default select example"
                            onChange={handleChange}
                            name='duyet'
                        >
                            <option value="">--- Trạng thái ---</option>
                            {status?.map((item, index) => (
                                <option key={index} value={item._id}>{item.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="flex items-center justify-end gap-3">
                        <NavLink to={'/deal/add'}>
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
                                        checked={selectedIds?.length === currentDeal?.length && currentDeal?.length > 0}
                                        onChange={handleCheckAll}
                                    />
                                </th>
                                <th scope="col" className="px-4 py-3">
                                    Name
                                </th>
                                <th scope="col" className="px-4 py-3">
                                    Image
                                </th>
                                <th scope="col" className="px-4 py-3">
                                    Hiển thị
                                </th>
                                <th scope="col" className="px-4 py-3">
                                    Danh mục
                                </th>
                                <th scope="col" className="px-4 py-3">
                                    Ngày đăng
                                </th>
                                <th scope="col" className="px-4 py-3">
                                    
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {deal && deal?.length > 0 ? currentDeal?.map((item, index) => (
                                <tr
                                    key={item._id} 
                                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 row-table"
                                >
                                    <td className="px-2 py-4 w-10 text-center">
                                        <span className='text-base font-semibold'>{index + 1}</span>
                                    </td>
                                    <td className="px-2 py-4 w-10">
                                        <input 
                                            type="checkbox" 
                                            className='scale-120'
                                            checked={selectedIds.includes(item._id)}
                                            onChange={() => handleCheckItem(item._id)}
                                        />
                                    </td>
                                    <th scope="row" className="px-4 py-4 font-medium text-gray-900 dark:text-white w-5/12">
                                        {item.name}
                                    </th>
                                    <td className="py-4 w-1/9 ">
                                        <div className="w-full">
                                            <img src={'https://greatsreview86.com/uploads/images/Videogen.jpg'} alt="ảnh sản phẩm" 
                                            className='w-[70px] h-[70px] rounded-[5px] border-custom'/>
                                        </div>
                                    </td>
                                    <td className="px-4 py-4 w-1/10">
                                        {
                                            item.duyet === 'Yes' && 
                                            <Button className={"border-[#90d67f]! py-0.5! bg-[#d9fbd0] text-main capitalize"}>
                                                Yes
                                            </Button>
                                        }
                                        {
                                            item.duyet === 'No' && 
                                            <Button className={"border-[#f74d4d8a]! py-0.5! bg-[#ff8585a6] text-[#c90c05] capitalize"}>
                                                No
                                            </Button>
                                        }
                                    </td>
                                    <td className="px-4 py-4 w-1/10">
                                        {item.danhmuc}
                                    </td>
                                    <td className="px-4 py-4 w-1/10">
                                        {item.formatDate}
                                    </td>
                                    <td className="py-4 w-1/10 text-center px-4">
                                        <div className="flex items-start justify-start gap-3 m-auto">
                                            <NavLink to={`/deal/${item._id}`}>
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
                            )): (
                                <Empty/>
                            )}
                        </tbody>
                    </table>
                    {deal && deal.length > 0 ? (
                        <PageBar 
                            currentPage={current} 
                            totalPage={Math.ceil(deal?.length / limit)}
                            onPageChange={setCurrent}
                        />
                    ) : (<></>)}
                </div>
            </div>
        </div>
    );
}

export default Deal;