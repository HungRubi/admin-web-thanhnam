import actionTypes from "./actionTypes";
import * as apis from '../../apis/socialConfig';

export const getSocialConfigEdit = () => async (dispatch) => {
    try{
        const response = await apis.getSocialConfigEdit();
        if(response.status === 200){
            dispatch({
                type: actionTypes.GET_SOCIAL,
                payload: response.data,
            })
        }else{
            dispatch({
                type: actionTypes.GET_SOCIAL_ERR,
                payload: response.data
            })
        }
    }catch(error){
        dispatch({
            type: actionTypes.GET_SOCIAL_ERR,
            payload: error.response
        })
    }
}

export const updateSocialConfigEdit = (data) => async (dispatch) => {
    try{
        const response = await apis.updateSocialConfigEdit(data);
        if(response.status === 200){
            dispatch({
                type: actionTypes.UPDATE_SOCIAL,
                payload: response.data,
            })
        }else{
            dispatch({
                type: actionTypes.UPDATE_SOCIAL_ERR,
                payload: response.data
            })
        }
    }catch(error){
        dispatch({
            type: actionTypes.UPDATE_SOCIAL_ERR,
            payload: error.response
        })
    }
}