import actionTypes from "./actionTypes";
import * as apis from '../../apis/offer';

export const addOffer = (data) => async (dispatch) => {{
    try{
        const response = await apis.addOffer(data);
        if(response.status === 200) {
            dispatch({
                type: actionTypes.ADD_OFFER,
                payload: response.data
            })
        }else{
            dispatch({
                type: actionTypes.ADD_OFFER_ERR,
                payload: response.data
            })
        }
    }catch (error) {
            dispatch({
                type: actionTypes.ADD_OFFER_ERR,
                payload: error.response.data
            })
    }
}}

export const getOffer = (search='') => async (dispatch) => {
    try{
        const response = await apis.getOffer(search);
        if(response.status === 200){
            dispatch({
                type: actionTypes.GET_OFFER,
                payload: {
                    data: response.data,
                    search: !! search
                }
            })
        }else{
            dispatch({
                type: actionTypes.GET_OFFER_ERR,
                payload: response.data
            })
        }
    }catch(error){
        dispatch({
            type: actionTypes.GET_OFFER_ERR,
            payload: error.response
        })
    }
}

export const getOfferEdit = (id) => async (dispatch) => {
    try{
        const response = await apis.getOfferEdit(id);
        if(response.status === 200){
            dispatch({
                type: actionTypes.GET_OFFER_EDIT,
                payload: response.data
            })
        }else{
            dispatch({
                type: actionTypes.GET_OFFER_EDIT_ERR,
                payload: response.data
            })
        }
    }catch(error){
        dispatch({
            type: actionTypes.GET_OFFER_EDIT_ERR,
            payload: error.response
        })
    }
}

export const updateOffer = (id, data) => async (dispatch) => {
    try {
        const response = await apis.updateOffer(id, data);
        if(response.status === 200) {
            dispatch({
                type: actionTypes.UPDATE_OFFER,
                payload: response.data,
            })
        } else {
            dispatch({
                type: actionTypes.UPDATE_OFFER_ERR,
                payload: response.data || {},
            })
        }
    } catch (error) {
        dispatch({
            type: actionTypes.UPDATE_OFFER_ERR,
            payload: error.response.data || {},
        })
    }
}

export const deleteOffer = (id) => async (dispatch) => {{
    try{
        const response = await apis.deleteOffer(id);
        if(response.status === 200) {
            dispatch({
                type: actionTypes.DELETE_OFFER,
                payload: response.data
            })
        }else{
            dispatch({
                type: actionTypes.DELETE_OFFER_ERR,
                payload: response.data
            })
        }
    }catch (error) {
            dispatch({
                type: actionTypes.DELETE_OFFER_ERR,
                payload: error.response.data
            })
    }
}}

export const deleteManyOffer = (data) => async (dispatch) => {{
    try{
        const response = await apis.deleteManyOffer(data);
        if(response.status === 200) {
            dispatch({
                type: actionTypes.DELETE_MANY_OFFER,
                payload: response.data
            })
        }else{
            dispatch({
                type: actionTypes.DELETE_MANY_OFFER_ERR,
                payload: response.data
            })
        }
    }catch (error) {
            dispatch({
                type: actionTypes.DELETE_MANY_OFFER_ERR,
                payload: error.response.data
            })
    }
}}

export const filterOffer = (filter) => async (dispatch)  => {
    try{
        const response = await apis.filterOffer(filter);
        if(response.status === 200) {
            dispatch({
                type: actionTypes.FILTER_OFFER,
                payload: response.data
            })
        }else{
            dispatch({
                type: actionTypes.FILTER_OFFER_ERR,
                payload: null
            })
        }
    }catch(err){
        dispatch({
            type: actionTypes.FILTER_OFFER_ERR,
            payload: {
                message: "Có lỗi xảy ra, vui lòng thử lại sau",
                err
            }
        })
    }
}