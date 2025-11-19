import actionTypes from "./actionTypes";
import * as apis from '../../apis/widget';

export const getWidget = (search='') => async (dispatch) => {
    try{
        const response = await apis.getWidget(search);
        if(response.status === 200){
            dispatch({
                type: actionTypes.GET_WIDGET,
                payload: {
                    data: response.data,
                    search: !! search
                }
            })
        }else{
            dispatch({
                type: actionTypes.GET_WIDGET_ERR,
                payload: response.data
            })
        }
    }catch(error){
        dispatch({
            type: actionTypes.GET_WIDGET_ERR,
            payload: error.response
        })
    }
}

export const addWidget = (data) => async (dispatch) => {{
    try{
        const response = await apis.addWidget(data);
        if(response.status === 200) {
            dispatch({
                type: actionTypes.ADD_WIDGET,
                payload: response.data
            })
        }else{
            dispatch({
                type: actionTypes.ADD_WIDGET_ERR,
                payload: response.data
            })
        }
    }catch (error) {
            dispatch({
                type: actionTypes.ADD_WIDGET_ERR,
                payload: error.response.data
            })
    }
}}

export const getWidgetEdit = (id) => async (dispatch) => {
    try{
        const response = await apis.getWidgetEdit(id);
        if(response.status === 200){
            dispatch({
                type: actionTypes.GET_WIDGET_EDIT,
                payload: response.data
            })
        }else{
            dispatch({
                type: actionTypes.GET_WIDGET_EDIT_ERR,
                payload: response.data
            })
        }
    }catch(error){
        dispatch({
            type: actionTypes.GET_WIDGET_EDIT_ERR,
            payload: error.response
        })
    }
}

export const updateWidget = (id, data) => async (dispatch) => {
    try {
        const response = await apis.updateWidget(id, data);
        if(response.status === 200) {
            dispatch({
                type: actionTypes.UPDATE_WIDGET,
                payload: response.data,
            })
        } else {
            dispatch({
                type: actionTypes.UPDATE_WIDGET_ERR,
                payload: response.data || {},
            })
        }
    } catch (error) {
        dispatch({
            type: actionTypes.UPDATE_WIDGET_ERR,
            payload: error.response.data || {},
        })
    }
}

export const deleteWidget = (id) => async (dispatch) => {{
    try{
        const response = await apis.deleteWidget(id);
        if(response.status === 200) {
            dispatch({
                type: actionTypes.DELETE_WIDGET,
                payload: response.data
            })
        }else{
            dispatch({
                type: actionTypes.DELETE_WIDGET_ERR,
                payload: response.data
            })
        }
    }catch (error) {
            dispatch({
                type: actionTypes.DELETE_WIDGET_ERR,
                payload: error.response.data
            })
    }
}}

export const deleteManyWidget = (data) => async (dispatch) => {{
    try{
        const response = await apis.deleteManyWidget(data);
        if(response.status === 200) {
            dispatch({
                type: actionTypes.DELETE_MANY_WIDGET,
                payload: response.data
            })
        }else{
            dispatch({
                type: actionTypes.DELETE_MANY_WIDGET_ERR,
                payload: response.data
            })
        }
    }catch (error) {
            dispatch({
                type: actionTypes.DELETE_MANY_WIDGET_ERR,
                payload: error.response.data
            })
    }
}}
