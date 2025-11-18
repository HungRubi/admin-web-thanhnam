import actionTypes from "./actionTypes";
import * as apis from '../../apis/news';

export const getNews = (search='') => async (dispatch) => {
    try{
        const response = await apis.getNews(search);
        if(response.status === 200){
            dispatch({
                type: actionTypes.GET_NEW,
                payload: {
                    data: response.data,
                    search: !! search
                }
            })
        }else{
            dispatch({
                type: actionTypes.GET_NEW_ERR,
                payload: response.data
            })
        }
    }catch(error){
        dispatch({
            type: actionTypes.GET_NEW_ERR,
            payload: error.response
        })
    }
}