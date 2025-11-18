import actionTypes from "./actionTypes";
import * as apis from '../../apis/deal';

export const getDeal = (search='') => async (dispatch) => {
    try{
        const response = await apis.getDeal(search);
        if(response.status === 200){
            dispatch({
                type: actionTypes.GET_DEAL,
                payload: {
                    data: response.data,
                    search: !! search
                }
            })
        }else{
            dispatch({
                type: actionTypes.GET_DEAL_ERR,
                payload: response.data
            })
        }
    }catch(error){
        dispatch({
            type: actionTypes.GET_DEAL_ERR,
            payload: error.response
        })
    }
}

export const addDeal = (data) => async (dispatch) => {{
    try{
        const response = await apis.addDeal(data);
        if(response.status === 200) {
            dispatch({
                type: actionTypes.ADD_DEAL,
                payload: response.data
            })
        }else{
            dispatch({
                type: actionTypes.ADD_DEAL_ERR,
                payload: response.data
            })
        }
    }catch (error) {
            dispatch({
                type: actionTypes.ADD_DEAL_ERR,
                payload: error.response.data
            })
    }
}}

export const getDealEdit = (id) => async (dispatch) => {
    try{
        const response = await apis.getDealEdit(id);
        if(response.status === 200){
            dispatch({
                type: actionTypes.GET_DEAL_EDIT,
                payload: response.data
            })
        }else{
            dispatch({
                type: actionTypes.GET_DEAL_EDIT_ERR,
                payload: response.data
            })
        }
    }catch(error){
        dispatch({
            type: actionTypes.GET_DEAL_EDIT_ERR,
            payload: error.response
        })
    }
}

export const updateDeal = (id, data) => async (dispatch) => {
    try {
        const response = await apis.updateDeal(id, data);
        if(response.status === 200) {
            dispatch({
                type: actionTypes.UPDATE_DEAL,
                payload: response.data,
            })
        } else {
            dispatch({
                type: actionTypes.UPDATE_DEAL_ERR,
                payload: response.data || {},
            })
        }
    } catch (error) {
        dispatch({
            type: actionTypes.UPDATE_DEAL_ERR,
            payload: error.response.data || {},
        })
    }
}

export const deleteDeal = (id) => async (dispatch) => {{
    try{
        const response = await apis.deleteDeal(id);
        if(response.status === 200) {
            dispatch({
                type: actionTypes.DELETE_DEAL,
                payload: response.data
            })
        }else{
            dispatch({
                type: actionTypes.DELETE_DEAL_ERR,
                payload: response.data
            })
        }
    }catch (error) {
            dispatch({
                type: actionTypes.DELETE_DEAL_ERR,
                payload: error.response.data
            })
    }
}}

export const deleteManyDeal = (data) => async (dispatch) => {{
    try{
        const response = await apis.deleteManyDeal(data);
        if(response.status === 200) {
            dispatch({
                type: actionTypes.DELETE_MANY_DEAL,
                payload: response.data
            })
        }else{
            dispatch({
                type: actionTypes.DELETE_MANY_DEAL_ERR,
                payload: response.data
            })
        }
    }catch (error) {
            dispatch({
                type: actionTypes.DELETE_MANY_DEAL_ERR,
                payload: error.response.data
            })
    }
}}

export const filterDeal = (filter) => async (dispatch)  => {
    try{
        const response = await apis.filterDeal(filter);
        if(response.status === 200) {
            dispatch({
                type: actionTypes.FILTER_DEAL,
                payload: response.data
            })
        }else{
            dispatch({
                type: actionTypes.FILTER_DEAL_ERR,
                payload: null
            })
        }
    }catch(err){
        dispatch({
            type: actionTypes.FILTER_DEAL_ERR,
            payload: {
                message: "Có lỗi xảy ra, vui lòng thử lại sau",
                err
            }
        })
    }
}