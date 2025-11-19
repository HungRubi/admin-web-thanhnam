import actionTypes from "./actionTypes";
import * as apis from '../../apis/menu';

export const getMenu = (search='') => async (dispatch) => {
    try{
        const response = await apis.getMenu(search);
        if(response.status === 200){
            dispatch({
                type: actionTypes.GET_MENU,
                payload: {
                    data: response.data,
                    search: !! search
                }
            })
        }else{
            dispatch({
                type: actionTypes.GET_MENU_ERR,
                payload: response.data
            })
        }
    }catch(error){
        dispatch({
            type: actionTypes.GET_MENU_ERR,
            payload: error.response
        })
    }
}

export const addMenu = (data) => async (dispatch) => {{
    try{
        const response = await apis.addMenu(data);
        if(response.status === 200) {
            dispatch({
                type: actionTypes.ADD_MENU,
                payload: response.data
            })
        }else{
            dispatch({
                type: actionTypes.ADD_MENU_ERR,
                payload: response.data
            })
        }
    }catch (error) {
            dispatch({
                type: actionTypes.ADD_MENU_ERR,
                payload: error.response.data
            })
    }
}}

export const deleteMenu = (id) => async (dispatch) => {{
    try{
        const response = await apis.deleteMenu(id);
        if(response.status === 200) {
            dispatch({
                type: actionTypes.DELETE_MENU,
                payload: response.data
            })
        }else{
            dispatch({
                type: actionTypes.DELETE_MENU_ERR,
                payload: response.data
            })
        }
    }catch (error) {
            dispatch({
                type: actionTypes.DELETE_MENU_ERR,
                payload: error.response.data
            })
    }
}}

export const deleteManyMenu = (data) => async (dispatch) => {{
    try{
        const response = await apis.deleteManyMenu(data);
        if(response.status === 200) {
            dispatch({
                type: actionTypes.DELETE_MANY_MENU,
                payload: response.data
            })
        }else{
            dispatch({
                type: actionTypes.DELETE_MANY_MENU_ERR,
                payload: response.data
            })
        }
    }catch (error) {
            dispatch({
                type: actionTypes.DELETE_MANY_MENU_ERR,
                payload: error.response.data
            })
    }
}}

export const getMenuEdit = (id) => async (dispatch) => {
    try{
        const response = await apis.getMenuEdit(id);
        if(response.status === 200){
            dispatch({
                type: actionTypes.GET_MENU_EDIT,
                payload: response.data
            })
        }else{
            dispatch({
                type: actionTypes.GET_MENU_EDIT_ERR,
                payload: response.data
            })
        }
    }catch(error){
        dispatch({
            type: actionTypes.GET_MENU_EDIT_ERR,
            payload: error.response
        })
    }
}

export const updateMenu = (id, data) => async (dispatch) => {
    try {
        const response = await apis.updateMenu(id, data);
        if(response.status === 200) {
            dispatch({
                type: actionTypes.UPDATE_MENU,
                payload: response.data,
            })
        } else {
            dispatch({
                type: actionTypes.UPDATE_MENU_ERR,
                payload: response.data || {},
            })
        }
    } catch (error) {
        dispatch({
            type: actionTypes.UPDATE_MENU_ERR,
            payload: error.response.data || {},
        })
    }
}

export const filterMenu = (filter) => async (dispatch)  => {
    try{
        const response = await apis.filterMenu(filter);
        if(response.status === 200) {
            dispatch({
                type: actionTypes.FILTER_MENU,
                payload: response.data
            })
        }else{
            dispatch({
                type: actionTypes.FILTER_MENU_ERR,
                payload: null
            })
        }
    }catch(err){
        dispatch({
            type: actionTypes.FILTER_MENU_ERR,
            payload: {
                message: "Có lỗi xảy ra, vui lòng thử lại sau",
                err
            }
        })
    }
}