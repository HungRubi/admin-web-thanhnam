import actionTypes from "./actionTypes";
import * as apis from '../../apis/seoConfig';

export const getSeoConfigEdit = () => async (dispatch) => {
    try{
        const response = await apis.getSeoConfigEdit();
        if(response.status === 200){
            dispatch({
                type: actionTypes.GET_SEO,
                payload: response.data,
            })
        }else{
            dispatch({
                type: actionTypes.GET_SEO_ERR,
                payload: response.data
            })
        }
    }catch(error){
        dispatch({
            type: actionTypes.GET_SEO_ERR,
            payload: error.response
        })
    }
}

export const updateSeoConfigEdit = (data) => async (dispatch) => {
    try{
        const response = await apis.updateSeoConfigEdit(data);
        if(response.status === 200){
            dispatch({
                type: actionTypes.UPDATE_SEO,
                payload: response.data,
            })
        }else{
            dispatch({
                type: actionTypes.UPDATE_SEO_ERR,
                payload: response.data
            })
        }
    }catch(error){
        dispatch({
            type: actionTypes.UPDATE_SEO_ERR,
            payload: error.response
        })
    }
}