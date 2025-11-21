import { useDispatch, useSelector } from 'react-redux';
import  { Search, Button, CircleButton, PageBar, ModelToast, Empty } from '../components';
import icon from '../util/icon';
import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import * as actions from '../store/actions'
const { MdChevronRight, MdAutoFixHigh, IoMdAdd, RiDeleteBin6Line, IoMdRefresh} = icon;
const Offer = () => {
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
    const {offer, store} = useSelector(state => state.app);
    useEffect(() => {
        dispatch(actions.getOffer());
        dispatch(actions.getStore());
    }, [dispatch])

    const [current, setCurrent] = useState(1);
    const limit = 10;
    const lastIndex = current * limit;
    const firstIndex = lastIndex - limit;
    const currentOffer = offer?.slice(firstIndex, lastIndex);

    const handleSearch = (value) => {
        dispatch(actions.getOffer(value))
    }
    
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
        if (selectedIds.length === currentOffer?.length) {
            setSelectedIds([]); 
        } else {
            setSelectedIds(currentOffer?.map(item => item._id));
        }
    }
    const handleDelete = () => {
        if (deleteItem) {
            dispatch(actions.deleteOffer(deleteItem)); 
        } else if (selectedIds.length > 0) {
            dispatch(actions.deleteManyOffer(selectedIds)); 
            setSelectedIds([])
        }
    }


    const [filters, setFilters] = useState({ storeId: "", duyet: "" });
    
    const handleChange = (e) => {
        const { name, value } = e.target;

        const newFilters = { ...filters, [name]: value };
        setFilters(newFilters);

        if (!newFilters.storeId && !newFilters.duyet) {
            dispatch(actions.getOffer());
        } else {
            dispatch(actions.filterOffer(newFilters));
        }
    };
    return (
        <div className="full pt-3 sm:pt-5">
            {isModal && <ModelToast isOpen={isModal} setIsOpen={setIsModal} onDelete={handleDelete}/>}
            <div className="w-full px-4 sm:px-6 md:px-[30px] flex gap-4 sm:gap-8">
                <div className="w-full">
                    <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm md:text-[15px] text-color">
                        <NavLink to={'/'} className={"hover:text-blue-600 transition duration-300 ease-linear"}>
                            Dashboard
                        </NavLink>
                        <MdChevronRight className="text-sm sm:text-base"/>
                        <NavLink to={'/offer'} className={"text-blue-600"}>
                            Offer
                        </NavLink>
                    </div>
                    <h2 className="text-xl sm:text-2xl md:text-[35px] font-semibold mt-3 sm:mt-5">Quản lý offer</h2>
                </div>
            </div>
            <div className="w-full bg-white border-t-custom px-4 sm:px-6 md:px-[30px] mt-4 sm:mt-8">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-5 mt-3 sm:mt-5 justify-between">
                    <div className="w-full sm:w-3/5 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-5">
                        <Search 
                            className={"rounded-lg!"} 
                            onSearch={handleSearch}  
                            placeholder={"Nhập tên offer..."}
                        />
                        <select 
                            className={`w-full sm:w-1/3 border border-gray-300 text-gray-800 text-xs sm:text-sm rounded-lg focus:ring-blue-500 
                                focus:border-blue-500 block py-1.5 px-2.5 dark:bg-gray-700 
                                dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
                                dark:focus:ring-blue-500 dark:focus:border-blue-500 `} 
                            aria-label="Default select example"
                            name='storeId'
                            onChange={handleChange}
                        >
                            <option value="">--- Danh mục store ---</option>
                            {store?.map((item, index) => (
                                <option key={index} value={item._id}>{item.tenstore}</option>
                            ))}
                        </select>
                        <select 
                            className={`w-full sm:w-1/3 border border-gray-300 text-gray-800 text-xs sm:text-sm rounded-lg focus:ring-blue-500 
                                focus:border-blue-500 block py-1.5 px-2.5 dark:bg-gray-700 
                                dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
                                dark:focus:ring-blue-500 dark:focus:border-blue-500 `} 
                            aria-label="Default select example"
                            name='duyet'
                            onChange={handleChange}
                        >
                            <option value="">--- Trạng thái ---</option>
                            {status?.map((item, index) => (
                                <option key={index} value={item._id}>{item.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="flex flex-wrap items-center justify-start sm:justify-end gap-2 sm:gap-3">
                        <NavLink to={'/offer/add'}>
                            <Button className={"gap-1.5 sm:gap-2.5 py-1.5! border-none! bg-blue-500 text-white hover:bg-blue-600 text-xs sm:text-sm"}>
                                <CircleButton className={'h-3! w-3! sm:h-4! sm:w-4! bg-white!'}>
                                    <IoMdAdd className='text-blue-600 text-xs sm:text-sm'/>
                                </CircleButton>
                                <span className="hidden sm:inline">Thêm mới</span>
                                <span className="sm:hidden">Thêm</span>
                            </Button>
                        </NavLink>
                        <Button 
                            className={"gap-1.5 sm:gap-2.5 py-1.5! border-none! bg-red-500 text-white hover:bg-red-600 text-xs sm:text-sm"}
                            onClick={() => {
                                setIsModal(true)
                            }}
                        >
                            <RiDeleteBin6Line className='text-white text-sm sm:text-base'/>
                            <span className="hidden sm:inline">Xóa ({selectedIds.length})</span>
                            <span className="sm:hidden">({selectedIds.length})</span>
                        </Button>
                        <Button 
                            className={"gap-1.5 sm:gap-2.5 py-1.5! border-none! bg-gray-500 text-white hover:bg-gray-600 text-xs sm:text-sm"}
                            onClick={() => {
                                setSelectedIds([]);
                            }}
                        >
                            <IoMdRefresh className='text-white text-sm sm:text-base'/>
                            <span className="hidden sm:inline">Cancel</span>
                        </Button>
                    </div>
                </div>
                <div className="relative overflow-x-auto mt-3 sm:mt-5">
                    <table className="w-full text-xs sm:text-sm text-left rtl:text-right text-gray-600 dark:text-gray-400 shadow_table min-w-[700px]">
                        <thead className="text-[10px] sm:text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-1 sm:px-2 py-2 sm:py-3"></th>
                                <th scope="col" className="px-1 sm:px-2 py-2 sm:py-3">
                                    <input 
                                        type="checkbox" 
                                        className='scale-110 sm:scale-120'
                                        checked={selectedIds?.length === currentOffer?.length && currentOffer?.length > 0}
                                        onChange={handleCheckAll}
                                    />
                                </th>
                                <th scope="col" className="px-2 sm:px-4 py-2 sm:py-3">
                                    Name
                                </th>
                                <th scope="col" className="px-2 sm:px-4 py-2 sm:py-3">
                                    Duyệt
                                </th>
                                <th scope="col" className="px-2 sm:px-4 py-2 sm:py-3 hidden md:table-cell">
                                    Verified
                                </th>
                                <th scope="col" className="px-2 sm:px-4 py-2 sm:py-3 hidden md:table-cell">
                                    Store
                                </th>
                                <th scope="col" className="px-2 sm:px-4 py-2 sm:py-3 hidden lg:table-cell">
                                    Ngày đăng
                                </th>
                                <th scope="col" className="px-2 sm:px-4 py-2 sm:py-3">
                                    
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {offer && offer?.length > 0 ? currentOffer?.map((item, index) => (
                                <tr 
                                    key={item._id}
                                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 row-table"
                                >
                                    <td className="px-1 sm:px-2 py-2 sm:py-4 w-8 sm:w-10 text-center">
                                        <span className='text-xs sm:text-base font-semibold'>{index + 1}</span>
                                    </td>
                                    <td className="px-1 sm:px-2 py-2 sm:py-4 w-8 sm:w-10">
                                        <input 
                                            type="checkbox" 
                                            className='scale-110 sm:scale-120'
                                            checked={selectedIds.includes(item._id)}
                                            onChange={() => handleCheckItem(item._id)}
                                        />
                                    </td>
                                    <th scope="row" className="px-2 sm:px-4 py-2 sm:py-4 font-medium text-xs sm:text-sm text-gray-900 dark:text-white w-5/13">
                                        <span className="line-clamp-2">{item.name}</span>
                                    </th>
                                    <td className="px-2 sm:px-4 py-2 sm:py-4 w-2/16">
                                        {
                                            item.duyet === 'Yes' && 
                                            <Button className={"border-[#90d67f]! py-0.5! bg-[#d9fbd0] text-main capitalize text-[10px] sm:text-xs"}>
                                                Yes
                                            </Button>
                                        }
                                        {
                                            item.duyet === 'No' && 
                                            <Button className={"border-[#f74d4d8a]! py-0.5! bg-[#ff8585a6] text-[#c90c05] capitalize text-[10px] sm:text-xs"}>
                                                No
                                            </Button>
                                        }
                                    </td>
                                    <td className="px-2 sm:px-4 py-2 sm:py-4 w-2/16 hidden md:table-cell">
                                        {
                                            item.verified === 'Yes' && 
                                            <Button className={"border-[#90d67f]! py-0.5! bg-[#d9fbd0] text-main capitalize text-[10px] sm:text-xs"}>
                                                Yes
                                            </Button>
                                        }
                                        {
                                            item.verified === 'No' && 
                                            <Button className={"border-[#f74d4d8a]! py-0.5! bg-[#ff8585a6] text-[#c90c05] capitalize text-[10px] sm:text-xs"}>
                                                No
                                            </Button>
                                        }
                                    </td>
                                    <td className="px-2 sm:px-4 py-2 sm:py-4 w-2/11 text-xs sm:text-sm hidden md:table-cell">
                                        <span className="line-clamp-1">{item.store?.tenstore || 'NULL'}</span>
                                    </td>
                                    <td className="px-2 sm:px-4 py-2 sm:py-4 w-1/10 text-[10px] sm:text-xs hidden lg:table-cell">
                                        {item.formatDate}
                                    </td>
                                    <td className="py-2 sm:py-4 w-1/10 text-center px-2 sm:px-4">
                                        <div className="flex items-center justify-center gap-2 sm:gap-3 m-auto">
                                            <NavLink to={`/offer/${item._id}`}>
                                                <Button className={"py-1.5! px-1.5! sm:py-2! sm:px-2! bg-blue-500 text-white"}>
                                                    <MdAutoFixHigh className='text-sm sm:text-[18px]'/>
                                                </Button>
                                            </NavLink>
                                            <Button 
                                                className={"py-1.5! px-1.5! sm:py-2! sm:px-2! bg-red-500 text-white"}
                                                onClick={() => {
                                                    setDeleteItem(item._id);
                                                    setIsModal(true);
                                                }}
                                            >
                                                <RiDeleteBin6Line className='text-sm sm:text-[18px]'/>
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            )) : (
                                <Empty/>
                            )}
                        </tbody>
                    </table>
                    {offer && offer.length > 0 ? (
                        <PageBar 
                            currentPage={current} 
                            totalPage={Math.ceil(offer?.length / limit)}
                            onPageChange={setCurrent}
                        />
                    ) : (<></>)}
                </div>
            </div>
        </div>
    );
}

export default Offer;