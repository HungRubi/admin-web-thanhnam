import actionTypes from "./actionTypes";
import * as apis from '../../apis/store';

export const getStore = (search='') => async (dispatch) => {
    try{
        const response = await apis.getStore(search);
        if(response.status === 200){
            dispatch({
                type: actionTypes.GET_STORE,
                payload: {
                    data: response.data,
                    search: !! search
                }
            })
        }else{
            dispatch({
                type: actionTypes.GET_STORE_ERR,
                payload: response.data
            })
        }
    }catch(error){
        dispatch({
            type: actionTypes.GET_STORE_ERR,
            payload: error.response
        })
    }
}

export const addStore = (data) => async (dispatch) => {{
    try{
        const response = await apis.addStore(data);
        if(response.status === 200) {
            dispatch({
                type: actionTypes.ADD_STORE,
                payload: response.data
            })
        }else{
            dispatch({
                type: actionTypes.ADD_STORE_ERR,
                payload: response.data
            })
        }
    }catch (error) {
            dispatch({
                type: actionTypes.ADD_STORE_ERR,
                payload: error.response.data
            })
    }
}}

export const deleteStore = (id) => async (dispatch) => {{
    try{
        const response = await apis.deleteStore(id);
        if(response.status === 200) {
            dispatch({
                type: actionTypes.DELETE_STORE,
                payload: response.data
            })
        }else{
            dispatch({
                type: actionTypes.DELETE_STORE_ERR,
                payload: response.data
            })
        }
    }catch (error) {
            dispatch({
                type: actionTypes.DELETE_STORE_ERR,
                payload: error.response.data
            })
    }
}}

export const deleteManyStore = (data) => async (dispatch) => {{
    try{
        const response = await apis.deleteManyStore(data);
        if(response.status === 200) {
            dispatch({
                type: actionTypes.DELETE_MANY_STORE,
                payload: response.data
            })
        }else{
            dispatch({
                type: actionTypes.DELETE_MANY_STORE_ERR,
                payload: response.data
            })
        }
    }catch (error) {
            dispatch({
                type: actionTypes.DELETE_MANY_STORE_ERR,
                payload: error.response.data
            })
    }
}}

export const getStoreEdit = (id) => async (dispatch) => {
    try{
        const response = await apis.getStoreEdit(id);
        if(response.status === 200){
            dispatch({
                type: actionTypes.GET_STORE_EDIT,
                payload: response.data
            })
        }else{
            dispatch({
                type: actionTypes.GET_STORE_EDIT_ERR,
                payload: response.data
            })
        }
    }catch(error){
        dispatch({
            type: actionTypes.GET_STORE_EDIT_ERR,
            payload: error.response
        })
    }
}

export const updateStore = (id, data) => async (dispatch) => {
    try {
        const response = await apis.updateStore(id, data);
        if(response.status === 200) {
            dispatch({
                type: actionTypes.UPDATE_STORE,
                payload: response.data,
            })
        } else {
            dispatch({
                type: actionTypes.UPDATE_STORE_ERR,
                payload: response.data || {},
            })
        }
    } catch (error) {
        dispatch({
            type: actionTypes.UPDATE_STORE_ERR,
            payload: error.response.data || {},
        })
    }
}

export const filterStore = (filter) => async (dispatch)  => {
    try{
        const response = await apis.filterStore(filter);
        console.log(response.data)
        if(response.status === 200) {
            dispatch({
                type: actionTypes.FILTER_STORE,
                payload: response.data
            })
        }else{
            dispatch({
                type: actionTypes.FILTER_STORE_ERR,
                payload: null
            })
        }
    }catch(err){
        dispatch({
            type: actionTypes.FILTER_STORE_ERR,
            payload: {
                message: "Có lỗi xảy ra, vui lòng thử lại sau",
                err
            }
        })
    }
}
