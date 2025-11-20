import actionTypes from "./actionTypes";
import * as apis from '../../apis/authorConfig';

export const getAuthorConfigEdit = () => async (dispatch) => {
    try{
        const response = await apis.getAuthorConfigEdit();
        if(response.status === 200){
            dispatch({
                type: actionTypes.GET_AUTHOR,
                payload: response.data,
            })
        }else{
            dispatch({
                type: actionTypes.GET_AUTHOR_ERR,
                payload: response.data
            })
        }
    }catch(error){
        dispatch({
            type: actionTypes.GET_AUTHOR_ERR,
            payload: error.response
        })
    }
}

export const updateAuthorConfigEdit = (data) => async (dispatch) => {
    try{
        const response = await apis.updateAuthorConfigEdit(data);
        if(response.status === 200){
            dispatch({
                type: actionTypes.UPDATE_AUTHOR,
                payload: response.data,
            })
        }else{
            dispatch({
                type: actionTypes.UPDATE_AUTHOR_ERR,
                payload: response.data
            })
        }
    }catch(error){
        dispatch({
            type: actionTypes.UPDATE_AUTHOR_ERR,
            payload: error.response
        })
    }
}