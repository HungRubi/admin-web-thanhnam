import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../store/actions";

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error, isAuthenticated } = useSelector(state => state.user);
    const [account, setAccount] = useState("");
    const [password, setPassword] = useState("");
    const [formError, setFormError] = useState("");

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/", { replace: true });
        }
    }, [isAuthenticated, navigate]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!account || !password) {
            setFormError("Vui lòng nhập tài khoản và mật khẩu.");
            return;
        }
        setFormError("");
        try {
            await dispatch(actions.login({ tendangnhap: account, matkhau: password }));
        } catch {
            // lỗi được hiển thị qua state.error
        }
    };
    const displayError = formError || error;
    return (
        <div className="w-full h-screen bg-linear-to-r from-[#fdf2e9] to-white relative flex">
            <div className="login_form absolute bg-white px-10 py-8 rounded-md w-[420px]">
                <div className="flex flex-col gap-1 mb-8 text-center">
                    <h1 className="text-2xl font-semibold text-gray-800">
                        Admin Login
                    </h1>
                    <p className="text-sm text-gray-500">
                        Đăng nhập để tiếp tục sử dụng hệ thống quản trị.
                    </p>
                </div>
                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-1.5">
                        <label htmlFor="account" className="text-sm text-gray-600">
                            Tài khoản
                        </label>
                        <input
                            id="account"
                            type="text"
                            value={account}
                            onChange={(e) => setAccount(e.target.value)}
                            className="border border-gray-200 rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#ffa357]"
                            placeholder="Nhập tài khoản"
                        />
                    </div>
                    <div className="flex flex-col gap-1.5">
                        <label htmlFor="password" className="text-sm text-gray-600">
                            Mật khẩu
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="border border-gray-200 rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#ffa357]"
                            placeholder="Nhập mật khẩu"
                        />
                    </div>
                    {displayError && (
                        <p className="text-sm text-red-500">{displayError}</p>
                    )}
                    <button
                        type="submit"
                        disabled={loading}
                        className={`mt-2 bg-[#ffa357] hover:bg-[#ff9232] text-white font-medium py-2 rounded-md transition-colors ${
                            loading ? "opacity-70 cursor-not-allowed" : ""
                        }`}
                    >
                        {loading ? "Đang xử lý..." : "Đăng nhập"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;