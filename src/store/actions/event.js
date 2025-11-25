import actionTypes from "./actionTypes";
import * as apis from '../../apis/event';

export const getEvent = (search='') => async (dispatch) => {
    try{
        const response = await apis.getEvent(search);
        if(response.status === 200){
            dispatch({
                type: actionTypes.GET_EVENT,
                payload: {
                    data: response.data,
                    search: !! search
                }
            })
        }else{
            dispatch({
                type: actionTypes.GET_EVENT_ERR,
                payload: response.data
            })
        }
    }catch(error){
        dispatch({
            type: actionTypes.GET_EVENT_ERR,
            payload: error.response
        })
    }
}

export const getEventEdit = (id) => async (dispatch) => {
    try{
        const response = await apis.getEventEdit(id);
        if(response.status === 200){
            dispatch({
                type: actionTypes.GET_EVENT_EDIT,
                payload: response.data
            })
        }else{
            dispatch({
                type: actionTypes.GET_EVENT_EDIT_ERR,
                payload: response.data
            })
        }
    }catch(error){
        dispatch({
            type: actionTypes.GET_EVENT_ERR,
            payload: error.response
        })
    }
}

export const updateEvent = (id, data) => async (dispatch) => {
    try{
        const response = await apis.updateEvent(id, data);
        if(response.status === 200) {
            dispatch({
                type: actionTypes.UPDATE_EVENT,
                payload: response.data,
            })
        }else{
            dispatch({
                type: actionTypes.UPDATE_EVENT_ERR,
                payload: response.data
            })
        }
    }catch (error) {
        dispatch({
            type: actionTypes.UPDATE_EVENT_ERR,
            payload: error.response
        })
    }
}

export const addEvent = (data) => async (dispatch) => {
    try{
        const response = await apis.addEvent(data);
        if(response.status === 200) {
            dispatch({
                type: actionTypes.ADD_EVENT,
                payload: response.data
            })
        }else{
            dispatch({
                type: actionTypes.ADD_EVENT_ERR,
                payload: response.data
            })
        }
    }catch (error) {
            dispatch({
                type: actionTypes.ADD_EVENT_ERR,
                payload: error.response.data
            })
    }
}

export const deleteEvent = (id) => async (dispatch) => {
    try{
        const response = await apis.deleteEvent(id);
        if(response.status === 200) {
            dispatch({
                type: actionTypes.DELETE_EVENT,
                payload: response.data
            })
        }else{
            dispatch({
                type: actionTypes.DELETE_EVENT_ERR,
                payload: response.data
            })
        }
    }catch (error) {
            dispatch({
                type: actionTypes.DELETE_EVENT_ERR,
                payload: error.response.data
            })
    }
}

export const deleteManyEvent = (data) => async (dispatch) => {
    try{
        const response = await apis.deleteManyEvent(data);
        if(response.status === 200) {
            dispatch({
                type: actionTypes.DELETE_MANY_EVENT,
                payload: response.data
            })
        }else{
            dispatch({
                type: actionTypes.DELETE_MANY_EVENT_ERR,
                payload: response.data
            })
        }
    }catch (error) {
            dispatch({
                type: actionTypes.DELETE_MANY_EVENT_ERR,
                payload: error.response.data
            })
    }
}

