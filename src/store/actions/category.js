import actionTypes from "./actionTypes";
import * as apis from '../../apis/category';

export const resetMessage = () => ({
    type: "RESET_MESSAGE",
});

export const getCategory = (search='') => async (dispatch) => {
    try{
        const response = await apis.getCategory(search);
        if(response.status === 200){
            dispatch({
                type: actionTypes.GET_CATEGORY,
                payload: {
                    data: response.data,
                    search: !! search
                }
            })
        }else{
            dispatch({
                type: actionTypes.GET_CATEGORY_ERR,
                payload: response.data
            })
        }
    }catch(error){
        dispatch({
            type: actionTypes.GET_CATEGORY_ERR,
            payload: error.response
        })
    }
}

export const getCategoryEdit = (id) => async (dispatch) => {
    try{
        const response = await apis.getCategoryEdit(id);
        if(response.status === 200){
            dispatch({
                type: actionTypes.GET_CATEGORY_EDIT,
                payload: response.data
            })
        }else{
            dispatch({
                type: actionTypes.GET_CATEGORY_EDIT_ERR,
                payload: response.data
            })
        }
    }catch(error){
        dispatch({
            type: actionTypes.GET_CATEGORY_ERR,
            payload: error.response
        })
    }
}

export const updateCategory = (id, data) => async (dispatch) => {{
    try{
        const response = await apis.updateCategory(id, data);
        if(response.status === 200) {
            dispatch({
                type: actionTypes.UPDATE_CATEGORY,
                payload: response.data,
            })
        }else{
            dispatch({
                type: actionTypes.UPDATE_CATEGORY_ERR,
                payload: response.data
            })
        }
    }catch (error) {
        dispatch({
            type: actionTypes.UPDATE_CATEGORY_ERR,
            payload: error.response
        })
    }
}}

export const addCategory = (data) => async (dispatch) => {{
    try{
        const response = await apis.addCategory(data);
        if(response.status === 200) {
            dispatch({
                type: actionTypes.ADD_CATEGORY,
                payload: response.data
            })
        }else{
            dispatch({
                type: actionTypes.ADD_CATEGORY_ERR,
                payload: response.data
            })
        }
    }catch (error) {
            dispatch({
                type: actionTypes.ADD_CATEGORY_ERR,
                payload: error.response.data
            })
    }
}}

export const deleteCategory = (id) => async (dispatch) => {{
    try{
        const response = await apis.deleteCategory(id);
        if(response.status === 200) {
            dispatch({
                type: actionTypes.DELETE_CATEGORY,
                payload: response.data
            })
        }else{
            dispatch({
                type: actionTypes.DELETE_CATEGORY_ERR,
                payload: response.data
            })
        }
    }catch (error) {
            dispatch({
                type: actionTypes.DELETE_CATEGORY_ERR,
                payload: error.response.data
            })
    }
}}

export const deleteManyCategory = (data) => async (dispatch) => {{
    try{
        const response = await apis.deleteManyCategory(data);
        if(response.status === 200) {
            dispatch({
                type: actionTypes.DELETE_MANY_CATEGORY,
                payload: response.data
            })
        }else{
            dispatch({
                type: actionTypes.DELETE_MANY_CATEGORY_ERR,
                payload: response.data
            })
        }
    }catch (error) {
            dispatch({
                type: actionTypes.DELETE_MANY_CATEGORY_ERR,
                payload: error.response.data
            })
    }
}}