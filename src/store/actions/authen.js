import actionTypes from "./actionTypes";
import * as apis from "../../apis/authen";
import { setAuthToken } from "../../axios";

const handleErrorMessage = (error, fallback) =>
    error?.response?.data?.message || error?.message || fallback;

const normalizeAuthPayload = (data = {}) => {
    // Backend trả về accessToken, cần map sang token
    const token = data.accessToken || data.token || null;
    const refreshToken = data.refreshToken || null;
    
    // Normalize user object để match với structure frontend expect
    const user = data.user ? {
        _id: data.user.id || data.user._id,
        name: data.user.hovaten || data.user.name,
        tendangnhap: data.user.tendangnhap,
        email: data.user.email,
        sodienthoai: data.user.sodienthoai,
        avatar: data.user.avatar || null,
        ...data.user, // Giữ lại tất cả các field khác
    } : null;

    return {
        user,
        token,
        refreshToken,
        message: data.message || null,
    };
};

export const login = (credentials) => async (dispatch) => {
    dispatch({ type: actionTypes.LOGIN_REQUEST });
    try {
        const response = await apis.login(credentials);
        if (response.status === 200) {
            const payload = normalizeAuthPayload(response.data);
            setAuthToken(payload.token);
            dispatch({
                type: actionTypes.LOGIN_SUCCESS,
                payload,
            });
            return payload;
        } else {
            throw response;
        }
    } catch (error) {
        setAuthToken(null);
        const message = handleErrorMessage(error, "Đăng nhập thất bại");
        dispatch({
            type: actionTypes.LOGIN_FAILURE,
            payload: { message },
        });
        throw new Error(message);
    }
};

export const register = (data) => async (dispatch) => {
    dispatch({ type: actionTypes.REGISTER_REQUEST });
    try {
        const response = await apis.register(data);
        if (response.status === 200) {
            const payload = normalizeAuthPayload(response.data);
            setAuthToken(payload.token);
            dispatch({
                type: actionTypes.REGISTER_SUCCESS,
                payload,
            });
            return payload;
        } else {
            throw response;
        }
    } catch (error) {
        setAuthToken(null);
        const message = handleErrorMessage(error, "Đăng ký thất bại");
        dispatch({
            type: actionTypes.REGISTER_FAILURE,
            payload: { message },
        });
        throw new Error(message);
    }
};

export const logout = () => async (dispatch) => {
    dispatch({ type: actionTypes.LOGOUT_REQUEST });
    try {
        await apis.logout();
        dispatch({
            type: actionTypes.LOGOUT_SUCCESS,
        });
        return true;
    } catch (error) {
        const message = handleErrorMessage(error, "Đăng xuất thất bại");
        dispatch({
            type: actionTypes.LOGOUT_FAILURE,
            payload: { message },
        });
        throw new Error(message);
    } finally {
        setAuthToken(null);
    }
};

export const refreshTokenAction = (refreshTokenValue) => async (dispatch) => {
    dispatch({ type: actionTypes.REFRESH_TOKEN_REQUEST });
    try {
        const response = await apis.refreshToken(refreshTokenValue);
        if (response.status === 200) {
            const payload = normalizeAuthPayload(response.data);
            setAuthToken(payload.token);
            dispatch({
                type: actionTypes.REFRESH_TOKEN_SUCCESS,
                payload,
            });
            return payload;
        } else {
            throw response;
        }
    } catch (error) {
        setAuthToken(null);
        const message = handleErrorMessage(error, "Làm mới token thất bại");
        dispatch({
            type: actionTypes.REFRESH_TOKEN_FAILURE,
            payload: { message },
        });
        throw new Error(message);
    }
};

export const getCurrentUser = () => async (dispatch, getState) => {
    const {
        user: { token, refreshToken: refreshTokenValue },
    } = getState();
    
    // Nếu không có token, thử refresh nếu có refreshToken hoặc thử từ cookie
    if (!token) {
        if (refreshTokenValue) {
            try {
                await dispatch(refreshTokenAction(refreshTokenValue));
                // Sau khi refresh thành công, lấy lại state mới
                const newState = getState();
                if (newState.user.token) {
                    setAuthToken(newState.user.token);
                    // Tiếp tục với getCurrentUser
                } else {
                    dispatch({ type: actionTypes.AUTH_INITIALIZED });
                    return;
                }
            } catch {
                // Refresh thất bại, thử từ cookie
                try {
                    await dispatch(refreshTokenAction(null));
                    const newState = getState();
                    if (newState.user.token) {
                        setAuthToken(newState.user.token);
                    } else {
                        dispatch({ type: actionTypes.AUTH_INITIALIZED });
                        return;
                    }
                } catch {
                    // Cả 2 cách đều thất bại
                    dispatch({ type: actionTypes.AUTH_INITIALIZED });
                    return;
                }
            }
        } else {
            // Không có refreshToken trong state, thử từ cookie
            try {
                await dispatch(refreshTokenAction(null));
                const newState = getState();
                if (newState.user.token) {
                    setAuthToken(newState.user.token);
                } else {
                    dispatch({ type: actionTypes.AUTH_INITIALIZED });
                    return;
                }
            } catch {
                // Refresh từ cookie thất bại
                dispatch({ type: actionTypes.AUTH_INITIALIZED });
                return;
            }
        }
    }
    
    setAuthToken(token);
    dispatch({ type: actionTypes.GET_CURRENT_USER_REQUEST });
    try {
        const response = await apis.getCurrentUser();
        if (response.status === 200) {
            // Server có thể tự động refresh và trả về accessToken mới
            const newAccessToken = response.data?.accessToken;
            const finalToken = newAccessToken || token;
            
            // Cập nhật token nếu server trả về accessToken mới
            if (newAccessToken) {
                setAuthToken(newAccessToken);
            }

            // Normalize user object tương tự như login
            const userData = response.data?.user || response.data;
            const user = userData ? {
                _id: userData.id || userData._id,
                name: userData.hovaten || userData.name,
                tendangnhap: userData.tendangnhap,
                email: userData.email,
                sodienthoai: userData.sodienthoai,
                avatar: userData.avatar || null,
                ...userData, // Giữ lại tất cả các field khác
            } : null;

            dispatch({
                type: actionTypes.GET_CURRENT_USER_SUCCESS,
                payload: {
                    user,
                    token: finalToken,
                    refreshToken: refreshTokenValue || getState().user.refreshToken, // Giữ lại refreshToken
                    message: response.data?.message || null,
                },
            });
            return user;
        } else {
            throw response;
        }
    } catch (error) {
        // Xử lý lỗi 404 - endpoint không tồn tại hoặc user không tìm thấy
        if (error?.response?.status === 404) {
            setAuthToken(null);
            dispatch({
                type: actionTypes.GET_CURRENT_USER_FAILURE,
                payload: { message: error?.response?.data?.message || "Không tìm thấy người dùng" },
            });
            // Không throw error để app không crash, chỉ đánh dấu là đã initialized
            return null;
        }
        
        // Nếu lỗi 401, server có thể đã tự động thử refresh nhưng thất bại
        if (error?.response?.status === 401) {
            // Server đã thử refresh nhưng thất bại, clear state
            setAuthToken(null);
            dispatch({
                type: actionTypes.GET_CURRENT_USER_FAILURE,
                payload: { 
                    message: error?.response?.data?.message || "Phiên đăng nhập đã hết hạn" 
                },
            });
            // Không throw error để app không crash
            return null;
        }
        
        // Các lỗi khác
        setAuthToken(null);
        const message = handleErrorMessage(error, "Lỗi khi lấy thông tin người dùng");
        dispatch({
            type: actionTypes.GET_CURRENT_USER_FAILURE,
            payload: { message },
        });
        // Không throw error để app không crash
        return null;
    }
};
