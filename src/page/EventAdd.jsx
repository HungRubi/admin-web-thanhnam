import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Input, Button, Combobox, Textarea, FilePicker } from "../components";
import icon from "../util/icon";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../store/actions";
import generateSlug from "../util/slug";
import generateDescription from "../util/generateDescription";

const { MdChevronRight } = icon;

const EventAdd = () => {
    const dispatch = useDispatch();
    const { event, message, slugErr, tendanhmucErr } = useSelector((state) => state.app);

    useEffect(() => {
        dispatch(actions.getEvent());
    }, [dispatch]);

    const [formData, setFormData] = useState({
        tendanhmuc: "",
        slug: "",
        danhmuccha: "",
        image: "",
        mota: "",
        metatitle: "",
        metakeywords: "",
        metadescription: "",
        sapxep: "99999",
    });

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
            image: file?.path || "",
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const submitData = { ...formData };
        // Auto-fill mota if empty
        if (!submitData.mota || submitData.mota.trim() === '') {
            submitData.mota = generateDescription('event', submitData.tendanhmuc);
        }
        dispatch(actions.addEvent(submitData));
    };

    const navigate = useNavigate();
    useEffect(() => {
        const successMessages = [
            "Thêm sự kiện thành công!",
            "Thêm event thành công!",
        ];
        if (message && successMessages.includes(message)) {
            navigate("/");
        }
    }, [message, navigate]);

    return (
        <div className="full pt-3 sm:pt-5">
            <div className="w-full px-4 sm:px-6 md:px-[30px] flex gap-4 sm:gap-8">
                <div className="w-full">
                    <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm md:text-[15px] text-color">
                        <NavLink to={"/"} className={"hover:text-blue-600 transition duration-300 ease-linear"}>
                            Home
                        </NavLink>
                        <MdChevronRight className="text-sm sm:text-base" />
                        <NavLink to={"/"} className={"text-blue-600"}>
                            Event
                        </NavLink>
                        <MdChevronRight className="text-sm sm:text-base" />
                        <NavLink to={"/event/add"} className={"text-blue-600"}>
                            Thêm mới sự kiện
                        </NavLink>
                    </div>
                    <h2 className="text-xl sm:text-2xl md:text-[35px] font-semibold mt-3 sm:mt-0">
                        Thêm mới sự kiện
                    </h2>
                </div>
            </div>
            <form className="w-full px-4 sm:px-6 md:px-[30px] bg-white mt-4 sm:mt-8 min-h-screen" onSubmit={handleSubmit}>
                <div className="w-full flex flex-col sm:flex-row border-b-custom py-5 sm:py-10">
                    <div className="w-full sm:w-2/6 hidden sm:block">
                        <h5 className="text-lg sm:text-[20px] font-medium text-black text-color mt-0 sm:mt-5">
                            Thông tin sự kiện
                        </h5>
                        <p className="text-[12px] text-[#888] line-clamp-2">
                            Thông tin chi tiết về sự kiện
                        </p>
                    </div>
                    <div className="w-full sm:flex-1">
                        <Input
                            label={"Tên sự kiện"}
                            name={"tendanhmuc"}
                            onChange={handleChange}
                            value={formData?.tendanhmuc}
                        />
                        {tendanhmucErr && (
                            <p className="text-red-500 text-[11px] mt-1">
                                {tendanhmucErr}
                            </p>
                        )}

                        <Input
                            label={"Slug"}
                            name={"slug"}
                            onChange={handleChange}
                            value={formData?.slug}
                        />
                        {slugErr && (
                            <p className="text-red-500 text-[11px] mt-1">
                                {slugErr}
                            </p>
                        )}

                        <Input
                            label={"Thứ tự"}
                            type={"number"}
                            name={"sapxep"}
                            onChange={handleChange}
                            value={formData?.sapxep}
                        />

                        <div className="mt-5"></div>
                        <Combobox
                            label={"Sự kiện cha"}
                            name={"danhmuccha"}
                            data={event}
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
                            children={formData?.mota}
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
                    <Button
                        type="button"
                        className={"absolute left-[77.777%] transform -translate-x-[210%] top-[50%] border-none! -translate-y-[50%] font-medium "}
                    >
                        <NavLink to={"/product"}>
                            Cancel
                        </NavLink>
                    </Button>
                    <Button
                        type="submit"
                        className={"absolute left-[77.777%] transform -translate-x-full top-[50%] -translate-y-[50%] shadow-md py-1! font-medium text-white bg-blue-500"}
                    >
                        Save
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default EventAdd;


