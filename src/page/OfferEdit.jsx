import { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { Input, Button, Combobox, Textarea } from '../components';
import icon from '../util/icon';
import { useDispatch, useSelector } from "react-redux";
import * as actions from '../store/actions'
import generateDescription from '../util/generateDescription';
const { MdChevronRight } = icon;
const OfferEdit = () => {
    const {id} = useParams();
    const status = [
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
    const {store, message, nameOffer, storeEmpty, codeEmpty, offerEdit, storeErr} = useSelector(state => state.app)
    useEffect(() => {
        dispatch(actions.getOfferEdit(id));
        dispatch(actions.getStore());
    }, [dispatch, id])
    const [formData, setFormData] = useState({
        name: '',
        offer: '',
        code: '',
        url: '',
        store: '',
        description: '',
        verified: 'Yes',
        duyet: 'Yes',
    })
    useEffect(() => {
        if(offerEdit) {
            setFormData({
                name: offerEdit?.name || '',
                offer: offerEdit?.offer || '',
                code: offerEdit?.code || '',
                url: offerEdit?.url || '',
                store: offerEdit?.store || '',
                description: offerEdit?.description || '',
                verified: offerEdit?.verified || 'Yes',
                duyet: offerEdit?.duyet || 'Yes',
            })
        }
    }, [offerEdit])
    const handleChange = (e, selected) => {
        setFormData({
            ...formData,
            [e.target.name]: selected ? selected.id || selected._id : e.target.value,
        })
    }
    const handleSubmit  = (e) => {
        e.preventDefault();
        const submitData = { ...formData };
        // Auto-fill description if empty
        if (!submitData.description || submitData.description.trim() === '') {
            submitData.description = generateDescription('offer', submitData.name);
        }
        dispatch(actions.updateOffer(id, submitData))
    }
    const navigate = useNavigate();
    useEffect(() => {
        if(message === "Cập nhật cửa hàng thành công :))"){
            navigate("/offer")
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
                        <NavLink to={'/offer'} className={"text-blue-600"}>
                            Offer
                        </NavLink>
                        <MdChevronRight className="text-sm sm:text-base"/>
                        <NavLink to={`/offer/${id}`} className={"text-blue-600"}>
                            Update offer
                        </NavLink>
                    </div>
                    <h2 className="text-xl sm:text-2xl md:text-[35px] font-semibold mt-3 sm:mt-0">Update offer</h2>
                </div>
            </div>
            <form className="w-full px-4 sm:px-6 md:px-[30px] bg-white mt-4 sm:mt-8 min-h-screen" onSubmit={handleSubmit}>
                <div className="w-full flex flex-col sm:flex-row border-b-custom py-5 sm:py-10">
                    <div className="w-full sm:w-2/6 hidden sm:block">
                        <h5 className="text-lg sm:text-[20px] font-medium text-black text-color mt-0 sm:mt-5">
                            Thông tin offer
                        </h5>
                        <p className="text-[12px] text-[#888] line-clamp-2">
                            Thông tin chi tiết về offer
                        </p>
                    </div>
                    <div className="w-full sm:flex-1">
                        <Input 
                            label={"Name"} 
                            name={"name"}
                            onChange={handleChange}
                            value={formData?.name}
                        />
                        {
                            nameOffer && 
                            <p className="text-red-500 text-[11px] mt-1">
                                {nameOffer}
                            </p>
                        }
                        
                        <Input 
                            label={"Offer"} 
                            name={"offer"}
                            onChange={handleChange}
                            value={formData?.offer}
                        />
                        {
                            storeEmpty && 
                            <p className="text-red-500 text-[11px] mt-1">
                                {storeEmpty}
                            </p>
                        }
                        <Input 
                            label={"Code"} 
                            name={"code"}
                            onChange={handleChange}
                            value={formData?.code}
                        />
                        {
                            codeEmpty && 
                            <p className="text-red-500 text-[11px] mt-1">
                                {codeEmpty}
                            </p>
                        }
                        <Input 
                            label={"Url"} 
                            name={"url"}
                            placeholder={"Url"}
                            onChange={handleChange}
                            value={formData?.url}
                        />
                        <div className="mt-5"></div>
                        <Combobox
                            label={"Store"}
                            name={"store"}
                            data={store}
                            onChange={handleChange}
                            selected={formData?.store}
                        />
                        {
                            storeErr && 
                            <p className="text-red-500 text-[11px] mt-1">
                                {storeErr}
                            </p>
                        }
                        <Textarea 
                            label={"Mô tả"} 
                            name={"description"}
                            row={5}
                            onChange={handleChange}
                            children={formData?.description}
                        />

                        <div className="mt-5"></div>
                        <Combobox
                            label={"Verfied"}
                            name={"verified"}
                            data={status}
                            onChange={handleChange}
                            selected={formData?.verified}
                        />

                        <div className="mt-5"></div>
                        <Combobox
                            label={"Duyệt"}
                            name={"duyet"}
                            data={status}
                            onChange={handleChange}
                            selected={formData?.duyet}
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

export default OfferEdit