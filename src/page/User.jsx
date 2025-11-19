import  { Search, Button, CircleButton, PageBar, ModelToast, Empty } from '../components';
import icon from '../util/icon';
import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import * as actions from '../store/actions'
import { useSelector, useDispatch } from 'react-redux';
const { MdChevronRight, MdAutoFixHigh, IoMdAdd, RiDeleteBin6Line, IoMdRefresh} = icon;
const User = () => {
    const dispatch = useDispatch();
    const { users } = useSelector(state => state.app);
    useEffect(() => {
        dispatch(actions.getUser());
    }, [dispatch])

    const [current, setCurrent] = useState(1);
    const limit = 10;
    const lastIndex = current * limit;
    const firstIndex = lastIndex - limit;
    const currentUser = users?.slice(firstIndex, lastIndex);
    const handleSearch = (value) => {
        dispatch(actions.getUser(value))
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
        if (selectedIds.length === currentUser?.length) {
            setSelectedIds([]); 
        } else {
            setSelectedIds(currentUser?.map(item => item._id));
        }
    }
    const handleDelete = () => {
        if (deleteItem) {
            dispatch(actions.deleteUser(deleteItem)); 
        } else if (selectedIds.length > 0) {
            dispatch(actions.deleteManyUser(selectedIds)); 
            setDeleteItem([])
        }
    }
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
                        <NavLink to={'/'} className={"text-blue-600"}>
                            User
                        </NavLink>
                    </div>
                    <h2 className="text-[35px] font-semibold mt-5">Quản lý user</h2>
                </div>
            </div>
            <div className="w-full bg-white border-t-custom px-[30px] mt-8">
                <div className="flex items-center gap-5 mt-5 justify-between ">
                    <div className="w-3/5 flex items-center gap-5">
                        <Search 
                            className={"rounded-lg!"}  
                            placeholder={"Nhập tên user..."}
                            onSearch={handleSearch}
                        />
                    </div>
                    <div className="flex items-center justify-end gap-3">
                        <NavLink to={'/user/add'}>
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
                                        checked={selectedIds?.length === currentUser?.length && currentUser?.length > 0}
                                        onChange={handleCheckAll}
                                    />
                                </th>
                                <th scope="col" className="px-4 py-3">
                                    Họ và tên
                                </th>
                                <th scope="col" className="px-4 py-3">
                                    Tên đăng nhập
                                </th>
                                <th scope="col" className="px-4 py-3">
                                    Email
                                </th>
                                <th scope="col" className="px-4 py-3">
                                    Số điện thoại
                                </th>
                                <th scope="col" className="px-4 py-3">
                                    Ngày đăng ký
                                </th>
                                
                                <th scope="col" className="px-4 py-3">
                                    
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {users && users?.length > 0 ? currentUser?.map((item, index) => (
                                <tr 
                                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 row-table"
                                    key={item._id}
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
                                    <th scope="row" className="px-4 py-4 font-medium text-gray-900 dark:text-white w-2/10">
                                        {item.hovaten}
                                    </th>
                                    <td className="px-4 py-4 w-2/10">
                                        {item.tendangnhap}
                                    </td>
                                    <td className="px-4 py-4 w-2/10">
                                        {item.email}
                                    </td>
                                    <td className="px-4 py-4 w-1/10">
                                        {item.sodienthoai}
                                    </td>
                                    <td className="px-4 py-4 w-1/10">
                                        {item.formatDate}
                                    </td>
                                    <td className="py-4 w-1/10 text-center px-4">
                                        <div className="flex items-start justify-start gap-3 m-auto">
                                            <NavLink to={`/user/${item._id}`}>
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
                    {users && currentUser?.length > 0 ? (
                        <PageBar 
                            currentPage={current} 
                            totalPage={Math.ceil(users?.length / limit)}
                            onPageChange={setCurrent}
                        />
                    ): (<></>)}
                </div>
            </div>
        </div>
    );
}

export default User;