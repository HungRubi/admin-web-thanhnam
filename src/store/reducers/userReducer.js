import actionTypes from "../actions/actionTypes";

const initState = {
    currentUser: null,
    token: null,
    refreshToken: null,
    isAuthenticated: false,
    loading: false,
    error: null,
    initialized: false,
};

const withAuthSuccess = (state, payload = {}) => ({
    ...state,
    loading: false,
    error: null,
    currentUser: payload.user || null,
    token: payload.token || null,
    refreshToken: payload.refreshToken !== undefined ? payload.refreshToken : state.refreshToken,
    isAuthenticated: !!(payload.user && payload.token),
    initialized: true,
});

const withAuthFailure = (state, payload = {}) => ({
    ...state,
    loading: false,
    currentUser: null,
    token: null,
    isAuthenticated: false,
    error: payload.message || null,
    initialized: true,
});

const userReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.LOGIN_REQUEST:
        case actionTypes.REGISTER_REQUEST:
        case actionTypes.GET_CURRENT_USER_REQUEST:
        case actionTypes.LOGOUT_REQUEST:
        case actionTypes.REFRESH_TOKEN_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };

        case actionTypes.LOGIN_SUCCESS:
        case actionTypes.REGISTER_SUCCESS:
        case actionTypes.GET_CURRENT_USER_SUCCESS:
        case actionTypes.REFRESH_TOKEN_SUCCESS:
            return withAuthSuccess(state, action.payload);

        case actionTypes.LOGIN_FAILURE:
        case actionTypes.REGISTER_FAILURE:
        case actionTypes.GET_CURRENT_USER_FAILURE:
            return withAuthFailure(state, action.payload);

        case actionTypes.REFRESH_TOKEN_FAILURE:
            return {
                ...state,
                loading: false,
                token: null,
                isAuthenticated: false,
                error: action.payload?.message || null,
                initialized: true,
            };

        case actionTypes.LOGOUT_SUCCESS:
            return {
                ...initState,
                initialized: true,
            };

        case actionTypes.LOGOUT_FAILURE:
            return withAuthFailure(state, action.payload);

        case actionTypes.AUTH_INITIALIZED:
            return {
                ...state,
                initialized: true,
                loading: false,
                error: null,
            };

        default:
            return state;
    }
};

export default userReducer