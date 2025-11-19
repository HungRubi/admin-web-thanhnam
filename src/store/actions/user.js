import actionTypes from "./actionTypes";
import * as apis from '../../apis/user';

export const getUser = (search='') => async (dispatch) => {
    try{
        const response = await apis.getUser(search);
        if(response.status === 200){
            dispatch({
                type: actionTypes.GET_USER,
                payload: {
                    data: response.data,
                    search: !! search
                }
            })
        }else{
            dispatch({
                type: actionTypes.GET_USER_ERR,
                payload: response.data
            })
        }
    }catch(error){
        dispatch({
            type: actionTypes.GET_USER_ERR,
            payload: error.response
        })
    }
}

export const addUser = (data) => async (dispatch) => {{
    try{
        const response = await apis.addUser(data);
        if(response.status === 200) {
            dispatch({
                type: actionTypes.ADD_USER,
                payload: response.data
            })
        }else{
            dispatch({
                type: actionTypes.ADD_USER_ERR,
                payload: response.data
            })
        }
    }catch (error) {
            dispatch({
                type: actionTypes.ADD_USER_ERR,
                payload: error.response.data
            })
    }
}}

export const deleteUser = (id) => async (dispatch) => {{
    try{
        const response = await apis.deleteUser(id);
        if(response.status === 200) {
            dispatch({
                type: actionTypes.DELETE_USER,
                payload: response.data
            })
        }else{
            dispatch({
                type: actionTypes.DELETE_USER_ERR,
                payload: response.data
            })
        }
    }catch (error) {
            dispatch({
                type: actionTypes.DELETE_USER_ERR,
                payload: error.response.data
            })
    }
}}

export const deleteManyUser = (data) => async (dispatch) => {{
    try{
        const response = await apis.deleteManyUser(data);
        if(response.status === 200) {
            dispatch({
                type: actionTypes.DELETE_MANY_USER,
                payload: response.data
            })
        }else{
            dispatch({
                type: actionTypes.DELETE_MANY_USER_ERR,
                payload: response.data
            })
        }
    }catch (error) {
            dispatch({
                type: actionTypes.DELETE_MANY_USER_ERR,
                payload: error.response.data
            })
    }
}}

export const getUserEdit = (id) => async (dispatch) => {
    try{
        const response = await apis.getUserEdit(id);
        if(response.status === 200){
            dispatch({
                type: actionTypes.GET_USER_EDIT,
                payload: response.data
            })
        }else{
            dispatch({
                type: actionTypes.GET_USER_EDIT_ERR,
                payload: response.data
            })
        }
    }catch(error){
        dispatch({
            type: actionTypes.GET_USER_EDIT_ERR,
            payload: error.response
        })
    }
}

export const updateUser = (id, data) => async (dispatch) => {
    try {
        const response = await apis.updateUser(id, data);
        if(response.status === 200) {
            dispatch({
                type: actionTypes.UPDATE_USER,
                payload: response.data,
            })
        } else {
            dispatch({
                type: actionTypes.UPDATE_USER_ERR,
                payload: response.data || {},
            })
        }
    } catch (error) {
        dispatch({
            type: actionTypes.UPDATE_USER_ERR,
            payload: error.response.data || {},
        })
    }
}

