import actionTypes from "./actionTypes";
import * as apis from '../../apis/news';

export const getNews = (search='') => async (dispatch) => {
    try{
        const response = await apis.getNews(search);
        if(response.status === 200){
            dispatch({
                type: actionTypes.GET_NEW,
                payload: {
                    data: response.data,
                    search: !! search
                }
            })
        }else{
            dispatch({
                type: actionTypes.GET_NEW_ERR,
                payload: response.data
            })
        }
    }catch(error){
        dispatch({
            type: actionTypes.GET_NEW_ERR,
            payload: error.response
        })
    }
}

export const addNew = (data) => async (dispatch) => {{
    try{
        const response = await apis.addNew(data);
        if(response.status === 200) {
            dispatch({
                type: actionTypes.ADD_NEW,
                payload: response.data
            })
        }else{
            dispatch({
                type: actionTypes.ADD_NEW_ERR,
                payload: response.data
            })
        }
    }catch (error) {
            dispatch({
                type: actionTypes.ADD_NEW_ERR,
                payload: error.response.data
            })
    }
}}

export const getNewEdit = (id) => async (dispatch) => {
    try{
        const response = await apis.getNewEdit(id);
        if(response.status === 200){
            dispatch({
                type: actionTypes.GET_NEW_EDIT,
                payload: response.data
            })
        }else{
            dispatch({
                type: actionTypes.GET_NEW_EDIT_ERR,
                payload: response.data
            })
        }
    }catch(error){
        dispatch({
            type: actionTypes.GET_NEW_EDIT_ERR,
            payload: error.response
        })
    }
}

export const updateNew = (id, data) => async (dispatch) => {
    try {
        const response = await apis.updateNew(id, data);
        if(response.status === 200) {
            dispatch({
                type: actionTypes.UPDATE_NEW,
                payload: response.data,
            })
        } else {
            dispatch({
                type: actionTypes.UPDATE_NEW_ERR,
                payload: response.data || {},
            })
        }
    } catch (error) {
        dispatch({
            type: actionTypes.UPDATE_NEW_ERR,
            payload: error.response.data || {},
        })
    }
}

export const deleteNew = (id) => async (dispatch) => {{
    try{
        const response = await apis.deleteNew(id);
        if(response.status === 200) {
            dispatch({
                type: actionTypes.DELETE_NEW,
                payload: response.data
            })
        }else{
            dispatch({
                type: actionTypes.DELETE_NEW_ERR,
                payload: response.data
            })
        }
    }catch (error) {
            dispatch({
                type: actionTypes.DELETE_NEW_ERR,
                payload: error.response.data
            })
    }
}}

export const deleteManyNew = (data) => async (dispatch) => {{
    try{
        const response = await apis.deleteManyNew(data);
        if(response.status === 200) {
            dispatch({
                type: actionTypes.DELETE_MANY_NEW,
                payload: response.data
            })
        }else{
            dispatch({
                type: actionTypes.DELETE_MANY_NEW_ERR,
                payload: response.data
            })
        }
    }catch (error) {
            dispatch({
                type: actionTypes.DELETE_MANY_NEW_ERR,
                payload: error.response.data
            })
    }
}}

export const filterNew = (filter) => async (dispatch)  => {
    try{
        const response = await apis.filterNew(filter);
        if(response.status === 200) {
            dispatch({
                type: actionTypes.FILTER_NEW,
                payload: response.data
            })
        }else{
            dispatch({
                type: actionTypes.FILTER_NEW_ERR,
                payload: null
            })
        }
    }catch(err){
        dispatch({
            type: actionTypes.FILTER_NEW_ERR,
            payload: {
                message: "Có lỗi xảy ra, vui lòng thử lại sau",
                err
            }
        })
    }
}