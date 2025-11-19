import actionTypes from "./actionTypes";
import * as apis from '../../apis/content';

export const getContent = (search='') => async (dispatch) => {
    try{
        const response = await apis.getContent(search);
        if(response.status === 200){
            dispatch({
                type: actionTypes.GET_CONTENT,
                payload: {
                    data: response.data,
                    search: !! search
                }
            })
        }else{
            dispatch({
                type: actionTypes.GET_CONTENT_ERR,
                payload: response.data
            })
        }
    }catch(error){
        dispatch({
            type: actionTypes.GET_CONTENT_ERR,
            payload: error.response
        })
    }
}

export const addContent = (data) => async (dispatch) => {{
    try{
        const response = await apis.addContent(data);
        if(response.status === 200) {
            dispatch({
                type: actionTypes.ADD_CONTENT,
                payload: response.data
            })
        }else{
            dispatch({
                type: actionTypes.ADD_CONTENT_ERR,
                payload: response.data
            })
        }
    }catch (error) {
            dispatch({
                type: actionTypes.ADD_CONTENT_ERR,
                payload: error.response.data
            })
    }
}}

export const getContentEdit = (id) => async (dispatch) => {
    try{
        const response = await apis.getContentEdit(id);
        if(response.status === 200){
            dispatch({
                type: actionTypes.GET_CONTENT_EDIT,
                payload: response.data
            })
        }else{
            dispatch({
                type: actionTypes.GET_CONTENT_EDIT_ERR,
                payload: response.data
            })
        }
    }catch(error){
        dispatch({
            type: actionTypes.GET_CONTENT_EDIT_ERR,
            payload: error.response
        })
    }
}


export const updateContent = (id, data) => async (dispatch) => {
    try {
        const response = await apis.updateContent(id, data);
        if(response.status === 200) {
            dispatch({
                type: actionTypes.UPDATE_CONTENT,
                payload: response.data,
            })
        } else {
            dispatch({
                type: actionTypes.UPDATE_CONTENT_ERR,
                payload: response.data || {},
            })
        }
    } catch (error) {
        dispatch({
            type: actionTypes.UPDATE_CONTENT_ERR,
            payload: error.response.data || {},
        })
    }
}

export const deleteContent = (id) => async (dispatch) => {{
    try{
        const response = await apis.deleteContent(id);
        if(response.status === 200) {
            dispatch({
                type: actionTypes.DELETE_CONTENT,
                payload: response.data
            })
        }else{
            dispatch({
                type: actionTypes.DELETE_CONTENT_ERR,
                payload: response.data
            })
        }
    }catch (error) {
            dispatch({
                type: actionTypes.DELETE_CONTENT_ERR,
                payload: error.response.data
            })
    }
}}

export const deleteManyContent = (data) => async (dispatch) => {{
    try{
        const response = await apis.deleteManyContent(data);
        if(response.status === 200) {
            dispatch({
                type: actionTypes.DELETE_MANY_CONTENT,
                payload: response.data
            })
        }else{
            dispatch({
                type: actionTypes.DELETE_MANY_CONTENT_ERR,
                payload: response.data
            })
        }
    }catch (error) {
            dispatch({
                type: actionTypes.DELETE_MANY_CONTENT_ERR,
                payload: error.response.data
            })
    }
}}