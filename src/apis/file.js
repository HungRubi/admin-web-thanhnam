import axios from "../axios";

export const getFile = async () => {
    try {
        const response = await axios({
            url: `/file`,
            method: 'GET',
        });
        return response; 
    } catch (error) {
        if(error.response){
            return error.response
        }
        return {
            status: 500,
            message: "Lỗi server: " + error
        }
    }
};

export const addFile = async (data) => {
    try {
        const response = await axios({
            url: `/file/folder`,
            method: 'POST',
            data: data
        });
        return response; 
    } catch (error) {
        if(error.response){
            return error.response
        }
        return {
            status: 500,
            message: "Lỗi server: " + error
        }
    }
};

export const upLoad = async (data) => {
    try {
        const response = await axios({
            url: `/file/upload`,
            method: 'POST',
            data: data
        });
        return response; 
    } catch (error) {
        if(error.response){
            return error.response
        }
        return {
            status: 500,
            message: "Lỗi server: " + error
        }
    }
};

export const getListFile = async (id) => {
    try {
        const response = await axios({
            url: `/file/${id}`,
            method: 'GET',
        });
        return response; 
    } catch (error) {
        if(error.response){
            return error.response
        }
        return {
            status: 500,
            message: "Lỗi server: " + error
        }
    }
};

export const updateFileName = async (data) => {
    try {
        const response = await axios({
            url: `/file/update-name`,
            method: 'PUT',
            data: data
        });
        return response; 
    } catch (error) {
        if(error.response){
            return error.response
        }
        return {
            status: 500,
            message: "Lỗi server: " + error
        }
    }
};

export const deleteFile = async (data) => {
    try {
        const response = await axios({
            url: `/file/delete`,
            method: 'DELETE',
            data: data
        });
        return response; 
    } catch (error) {
        if(error.response){
            return error.response
        }
        return {
            status: 500,
            message: "Lỗi server: " + error
        }
    }
};