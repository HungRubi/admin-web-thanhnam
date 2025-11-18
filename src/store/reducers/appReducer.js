import actionType from "../actions/actionTypes";

const initState = {
    message: null,

    category: [],
    categoryEdit: {},
    tendanhmucErr: "",
    slugErr: "",

    store: [],
    storeEdit: {},
    tenstoreErr: null,
    slugStoreErr: null,
}

const appReducer = (state = initState, action) => {
    switch (action.type) {

        case actionType.RESET_MESSAGE:
            return {
                ...state,
                message:null
            }

        /** CATEGORY */
        case actionType.GET_CATEGORY:
            return {
                ...state,
                category: action.payload.search 
                ? action.payload.data.data.searchCategory || [] 
                : action.payload.data.data.categoryFormat || [],
            }

        case actionType.GET_CATEGORY_EDIT:
            return {
                ...state,
                categoryEdit: action.payload.data.category || {},
            }

        case actionType.UPDATE_CATEGORY:
            return {
                ...state,
                message: action.payload.message
            }

        case actionType.UPDATE_CATEGORY_ERR:
            return {
                ...state,
                tendanhmucErr: action.payload.tendanhmucErr,
                slugErr: action.payload.slugErr
            }

        case actionType.ADD_CATEGORY:
            return {
                ...state,
                message: action.payload.message
            }

        case actionType.ADD_CATEGORY_ERR:
            return {
                ...state,
                tendanhmucErr: action.payload.tendanhmucErr,
                slugErr: action.payload.slugErr
            }

        case actionType.DELETE_CATEGORY:
            return {
                ...state,
                message: action.payload.message,
                category: action.payload.categoryFormat || []
            }
        
        case actionType.DELETE_MANY_CATEGORY:
            return {
                ...state,
                message: action.payload.message,
                category: action.payload.categoryFormat || []
            }

        /** STORE */
        case actionType.GET_STORE:
            return {
                ...state,
                store: action.payload.search 
                ? action.payload.data.data.searchStore || [] 
                : action.payload.data.data.storeFormat || [],
            }

        case actionType.ADD_STORE:
            return {
                ...state,
                message: action.payload.message
            }

        case actionType.ADD_STORE_ERR:
            return {
                ...state,
                danhmucErr: action.payload.danhmucErr,
                tenstoreErr: action.payload.tenstoreErr,
                slugErr: action.payload.slugErr
            }

        case actionType.DELETE_STORE:
            return {
                ...state,
                message: action.payload.message,
                store: action.payload.storeFormat || []
            }

        case actionType.DELETE_MANY_STORE:
            return {
                ...state,
                message: action.payload.message,
                store: action.payload.storeFormat || []
            }

         case actionType.GET_STORE_EDIT:
            return {
                ...state,
                storeEdit: action.payload.data.store || {},
            }

        case actionType.UPDATE_STORE:
            return {
                ...state,
                message: action.payload.message
            }

        case actionType.UPDATE_STORE_ERR:
            return {
                ...state,
                tenstoreErr: action.payload?.tenstoreErr || null,
                slugStoreErr: action.payload?.slugErr || null,
            }

        case actionType.FILTER_STORE:
            return {
                ...state,
                store: action.payload.stores || [],
            }
        case actionType.FILTER_STORE_ERR:
            return {
                ...state,
                message: "lỗi server vui lòng thử lại sau"
            }

        default:
            return state;
    }
}

export default appReducer;
