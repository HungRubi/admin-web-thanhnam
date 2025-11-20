import actionTypes from "./actionTypes";
import * as apis from '../../apis/contentConfig';

export const getContentConfigEdit = () => async (dispatch) => {
    try{
        const response = await apis.getContentConfigEdit();
        if(response.status === 200){
            dispatch({
                type: actionTypes.GET_CONTENT_CONFIG,
                payload: response.data,
            })
        }else{
            dispatch({
                type: actionTypes.GET_CONTENT_CONFIG_ERR,
                payload: response.data
            })
        }
    }catch(error){
        dispatch({
            type: actionTypes.GET_CONTENT_CONFIG_ERR,
            payload: error.response
        })
    }
}

export const updateContentConfigEdit = (data) => async (dispatch) => {
    try{
        const response = await apis.updateContentConfigEdit(data);
        if(response.status === 200){
            dispatch({
                type: actionTypes.UPDATE_CONTENT_CONFIG,
                payload: response.data,
            })
        }else{
            dispatch({
                type: actionTypes.UPDATE_CONTENT_CONFIG_ERR,
                payload: response.data
            })
        }
    }catch(error){
        dispatch({
            type: actionTypes.UPDATE_CONTENT_CONFIG_ERR,
            payload: error.response
        })
    }
}