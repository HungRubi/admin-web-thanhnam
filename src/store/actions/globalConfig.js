import actionTypes from "./actionTypes";
import * as apis from '../../apis/globalConfig';

export const getGlobalConfigEdit = () => async (dispatch) => {
    try{
        const response = await apis.getGlobalConfigEdit();
        if(response.status === 200){
            dispatch({
                type: actionTypes.GET_GLOBAL,
                payload: response.data,
            })
        }else{
            dispatch({
                type: actionTypes.GET_GLOBAL_ERR,
                payload: response.data
            })
        }
    }catch(error){
        dispatch({
            type: actionTypes.GET_GLOBAL_ERR,
            payload: error.response
        })
    }
}

export const updateGlobalConfigEdit = (data) => async (dispatch) => {
    try{
        const response = await apis.updateGlobalConfigEdit(data);
        if(response.status === 200){
            dispatch({
                type: actionTypes.UPDATE_GLOBAL,
                payload: {
                    ...response.data,
                    data: response.data.data || data,
                },
            })
        }else{
            dispatch({
                type: actionTypes.UPDATE_GLOBAL_ERR,
                payload: response.data
            })
        }
    }catch(error){
        dispatch({
            type: actionTypes.UPDATE_GLOBAL_ERR,
            payload: error.response
        })
    }
}