import  { Search, Button, CircleButton } from '../components';
import icon from '../util/icon';
import { NavLink } from 'react-router-dom';
const { MdChevronRight, MdAutoFixHigh, IoMdAdd, RiDeleteBin6Line, IoMdRefresh} = icon;
const Menu = () => {
    const category = [
        {
            id: 'Post',
            name: 'Post',
        },
        {
            id: 'Event',
            name: 'Event',
        },
        {
            id: 'Service',
            name: 'Service',
        },
        {
            id: 'Deal',
            name: 'Deal',
        }
    ]
    return (
        <div className="full pt-5">
            <div className="w-full px-[30px] flex gap-8">
                <div className="w-full">
                    <div className="flex items-center gap-2 text-[15px] text-color">
                        <NavLink to={'/'} className={"hover:text-blue-600 transition duration-300 ease-linear"}>
                            Dashboard
                        </NavLink>
                        <MdChevronRight/>
                        <NavLink to={'/'} className={"text-blue-600"}>
                            Menu
                        </NavLink>
                    </div>
                    <h2 className="text-[35px] font-semibold mt-5">Quản lý menu</h2>
                </div>
            </div>
            <div className="w-full bg-white border-t-custom px-[30px] mt-8">
                <div className="flex items-center gap-5 mt-5 justify-between ">
                    <div className="w-3/5 flex items-center gap-5">
                        <select 
                            className={`w-1/3 border border-gray-300 text-gray-800 text-sm rounded-lg focus:ring-blue-500 
                                focus:border-blue-500 block py-1.5 px-2.5 dark:bg-gray-700 
                                dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
                                dark:focus:ring-blue-500 dark:focus:border-blue-500 `} 
                            aria-label="Default select example"
                        >
                            <option value="">--- Loại danh mục ---</option>
                            {category?.map((item, index) => (
                                <option key={index} value={item._id}>{item.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="flex items-center justify-end gap-3">
                        <NavLink to={'/product/add'}>
                            <Button className={"gap-2.5 py-1.5! border-none! bg-blue-500 text-white hover:bg-blue-600 text-sm"}>
                                <CircleButton className={'h-4! w-4! bg-white!'}>
                                    <IoMdAdd className='text-blue-600 text-sm'/>
                                </CircleButton>
                                Thêm mới
                            </Button>
                        </NavLink>
                        <Button className={"gap-2.5 py-1.5! border-none! bg-red-500 text-white hover:bg-red-600 text-sm"}>
                            <RiDeleteBin6Line className='text-white text-base'/>
                            Xóa 0
                        </Button>
                        <Button className={"gap-2.5 py-1.5! border-none! bg-gray-500 text-white hover:bg-gray-600 text-sm"}>
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
                                    <input type="checkbox" className='scale-120'/>
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
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 row-table">
                                <td className="px-2 py-4 w-10 text-center">
                                    <span className='text-base font-semibold'>1</span>
                                </td>
                                <td className="px-2 py-4 w-10">
                                    <input type="checkbox" className='scale-120'/>
                                </td>
                                <th scope="row" className="px-4 py-4 font-medium text-gray-900 dark:text-white w-3/11">
                                    Đồng hồ siêu cấp víp pro version 2.100
                                </th>
                                <td className="px-4 py-4 w-1/10">
                                   Privacy Policy
                                </td>
                                <td className="px-4 py-4 w-1/10">
                                    Adult 18 and over
                                </td>
                                <td className="px-4 py-4 w-2/11">
                                    https://www.facebook.com/huy.hung.943598
                                </td>
                                <td className="px-4 py-4 w-1/12">
                                    có
                                </td>
                                <td className="px-4 py-4 w-1/12">
                                    9999
                                </td>
                                <td className="py-4 w-1/10 text-center px-4">
                                    <div className="flex items-start justify-start gap-3 m-auto">
                                        <NavLink to={``}>
                                            <Button className={"py-2! px-2! bg-blue-500  text-white"}>
                                                <MdAutoFixHigh className='text-[18px]'/>
                                            </Button>
                                        </NavLink>
                                        <Button 
                                        className={"py-2! px-2! bg-red-500 text-white"}>
                                            <RiDeleteBin6Line className='text-[18px]'/>
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Menu;