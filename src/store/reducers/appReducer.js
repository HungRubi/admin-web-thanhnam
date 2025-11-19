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

    offer: [],
    offerEdit: {},

    deal: [],
    dealEdit: {},

    news: [],
    newEdit: {},

    contents: [],
    contentEdit: {},

    widgets: [],
    widgetEdit: {},
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

        /** OFFER */
        case actionType.ADD_OFFER:
            return {
                ...state,
                message: action.payload.message
            }

        case actionType.ADD_OFFER_ERR:
            return {
                ...state,
                nameOffer: action.payload.nameEmpty,
                storeEmpty: action.payload.storeEmpty,
                codeEmpty: action.payload.codeEmpty,
            }

        case actionType.GET_OFFER:
            return {
                ...state,
                offer: action.payload.search 
                ? action.payload.data.data.searchOffer || [] 
                : action.payload.data.data.offerFormat || [],
            }

        case actionType.GET_OFFER_EDIT:
            return {
                ...state,
                offerEdit: action.payload.data.offer || {},
            }
        
        case actionType.UPDATE_OFFER:
            return {
                ...state,
                message: action.payload.message
            }

        case actionType.UPDATE_OFFER_ERR:
            return {
                ...state,
                nameOffer: action.payload.nameEmpty,
                storeEmpty: action.payload.storeEmpty,
                codeEmpty: action.payload.codeEmpty,
            }

        case actionType.DELETE_OFFER:
            return {
                ...state,
                message: action.payload.message,
                offer: action.payload.offerFormat || []
            }

        case actionType.DELETE_MANY_OFFER:
            return {
                ...state,
                message: action.payload.message,
                offer: action.payload.offerFormat || []
            }

        case actionType.FILTER_OFFER:
            return {
                ...state,
                offer: action.payload.offer || [],
            }

        /** DEAL */
        case actionType.GET_DEAL:
            return {
                ...state,
                deal: action.payload.search 
                ? action.payload.data.data.searchDeal || [] 
                : action.payload.data.data.dealFormat || [],
            }

        case actionType.ADD_DEAL:
            return {
                ...state,
                message: action.payload.message
            }

        case actionType.ADD_DEAL_ERR:
            return {
                ...state,
                nameErr: action.payload.nameErr,
                slugErr: action.payload.slugErr,
            }

        case actionType.GET_DEAL_EDIT:
            return {
                ...state,
                dealEdit: action.payload.data.deal || {},
            }
        
        case actionType.UPDATE_DEAL:
            return {
                ...state,
                message: action.payload.message
            }

        case actionType.UPDATE_DEAL_ERR:
            return {
                ...state,
                nameErr: action.payload.nameErr,
                slugErr: action.payload.slugErr,
            }

        case actionType.DELETE_DEAL:
            return {
                ...state,
                message: action.payload.message,
                deal: action.payload.deal || []
            }

        case actionType.DELETE_MANY_DEAL:
            return {
                ...state,
                message: action.payload.message,
                deal: action.payload.dealFormat || []
            }

        case actionType.FILTER_DEAL:
            return {
                ...state,
                deal: action.payload.deals || [],
            }

        /** NEWS */
        case actionType.GET_NEW:
            return {
                ...state,
                news: action.payload.search 
                ? action.payload.data.data.searchNew || [] 
                : action.payload.data.data.newFormat || [],
            }

        case actionType.ADD_NEW:
            return {
                ...state,
                message: action.payload.message
            }

        case actionType.ADD_NEW_ERR:
            return {
                ...state,
                nameErr: action.payload.nameErr,
                slugErr: action.payload.slugErr,
                categoryErr: action.payload.categoryErr
            }

        case actionType.GET_NEW_EDIT:
            return {
                ...state,
                newEdit: action.payload.data.news || {},
            }

        case actionType.UPDATE_NEW:
            return {
                ...state,
                message: action.payload.message || {},
            }

        case actionType.UPDATE_NEW_ERR:
            return {
                ...state,
                nameErr: action.payload.nameErr,
                slugErr: action.payload.slugErr,
                categoryErr: action.payload.categoryErr
            }

        case actionType.DELETE_NEW:
            return {
                ...state,
                message: action.payload.message,
                news: action.payload.newFormat || []
            }

        case actionType.DELETE_MANY_NEW:
            return {
                ...state,
                message: action.payload.message,
                news: action.payload.newFormat || []
            }
        
        case actionType.FILTER_NEW:
            return {
                ...state,
                news: action.payload.newsList || [],
            }

        /** PAGE-CONTENT */
        case actionType.GET_CONTENT:
            return {
                ...state,
                contents: action.payload.search 
                ? action.payload.data.data.searchContent || [] 
                : action.payload.data.data.contentFormat || [],
            }

        case actionType.ADD_CONTENT:
            return {
                ...state,
                message: action.payload.message
            }

        case actionType.ADD_CONTENT_ERR:
            return {
                ...state,
                nameErr: action.payload.nameErr,
                slugErr: action.payload.slugErr,
            }

        case actionType.GET_CONTENT_EDIT:
            return {
                ...state,
                contentEdit: action.payload.data.content || {},
            }

        case actionType.UPDATE_CONTENT:
            return {
                ...state,
                message: action.payload.message,
            }

        case actionType.UPDATE_CONTENT_ERR:
            return {
                ...state,
                nameErr: action.payload.nameErr,
                slugErr: action.payload.slugErr,
            }

        case actionType.DELETE_CONTENT:
            return {
                ...state,
                message: action.payload.message,
                contents: action.payload.contentFormat || []
            }

        case actionType.DELETE_MANY_CONTENT:
            return {
                ...state,
                message: action.payload.message,
                contents: action.payload.contentFormat || []
            }

        /** WIDGET */
        case actionType.GET_WIDGET:
            return {
                ...state,
                widgets: action.payload.search 
                ? action.payload.data.data.searchWidget || [] 
                : action.payload.data.data.widgetFormat || [],
            }

        case actionType.ADD_WIDGET:
            return {
                ...state,
                message: action.payload.message
            }

        case actionType.ADD_WIDGET_ERR:
            return {
                ...state,
                nameErr: action.payload.nameErr,
            }

        case actionType.GET_WIDGET_EDIT:
            return {
                ...state,
                widgetEdit: action.payload.data.content || {},
            }

        case actionType.UPDATE_WIDGET:
            return {
                ...state,
                message: action.payload.message,
            }

        case actionType.UPDATE_WIDGET_ERR:
            return {
                ...state,
                nameErr: action.payload.nameErr,
                slugErr: action.payload.slugErr,
            }

        case actionType.DELETE_WIDGET:
            return {
                ...state,
                message: action.payload.message,
                widgets: action.payload.widgetFormat || []
            }

        case actionType.DELETE_MANY_WIDGET:
            return {
                ...state,
                message: action.payload.message,
                widgets: action.payload.widgetFormat || []
            }

        default:
            return state;
    }
}

export default appReducer;
