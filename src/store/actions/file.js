import actionTypes from "./actionTypes";
import * as apis from '../../apis/file';

export const getFile = () => async (dispatch) => {
    try{
        const response = await apis.getFile();
        if(response.status === 200){
            dispatch({
                type: actionTypes.GET_FILE,
                payload: response.data
            })
        }else{
            dispatch({
                type: actionTypes.GET_FILE_ERR,
                payload: response.data
            })
        }
    }catch(error){
        dispatch({
            type: actionTypes.GET_FILE_ERR,
            payload: error.response
        })
    }
}

export const addFile = (data) => async (dispatch) => {
    try{
        const response = await apis.addFile(data);
        if(response.status === 200){
            dispatch({
                type: actionTypes.ADD_FILE,
                payload: response.data
            })
        }else{
            dispatch({
                type: actionTypes.ADD_FILE_ERR,
                payload: response.data
            })
        }
    }catch(error){
        dispatch({
            type: actionTypes.ADD_FILE_ERR,
            payload: error.response
        })
    }
}

export const upLoad = (data) => async (dispatch) => {
    try{
        const response = await apis.upLoad(data);
        console.log(response)
        if(response.status === 200){
            dispatch({
                type: actionTypes.UPLOAD_FILE,
                payload: response.data
            })
        }else{
            dispatch({
                type: actionTypes.UPLOAD_FILE_ERR,
                payload: response.data
            })
        }
    }catch(error){
        dispatch({
            type: actionTypes.UPLOAD_FILE_ERR,
            payload: error.response
        })
    }
}

export const getListFile = (id) => async (dispatch) => {
    try{
        const response = await apis.getListFile(id);
        if(response.status === 200){
            dispatch({
                type: actionTypes.GET_LIST_FILE,
                payload: response.data
            })
        }else{
            dispatch({
                type: actionTypes.GET_LIST_FILE_ERR,
                payload: response.data
            })
        }
    }catch(error){
        dispatch({
            type: actionTypes.GET_LIST_FILE_ERR,
            payload: error.response
        })
    }
}

export const updateFileName = (data) => async (dispatch) => {
    try{
        const response = await apis.updateFileName(data);
        if(response.status === 200){
            dispatch({
                type: actionTypes.UPDATE_FILE_NAME,
                payload: response.data
            })
        }else{
            dispatch({
                type: actionTypes.UPDATE_FILE_NAME_ERR,
                payload: response.data
            })
        }
    }catch(error){
        dispatch({
            type: actionTypes.UPDATE_FILE_NAME_ERR,
            payload: error.response
        })
    }
}

export const deleteFile = (data) => async (dispatch) => {
    try{
        const response = await apis.deleteFile(data);
        if(response.status === 200){
            dispatch({
                type: actionTypes.DELETE_FILE,
                payload: response.data
            })
        }else{
            dispatch({
                type: actionTypes.DELETE_FILE_ERR,
                payload: response.data
            })
        }
    }catch(error){
        dispatch({
            type: actionTypes.DELETE_FILE_ERR,
            payload: error.response
        })
    }
}