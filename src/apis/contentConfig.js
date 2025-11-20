import axios from "../axios";

export const getContentConfigEdit = async () => {
    try {
        const response = await axios({
            url: `/content-config/`,
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

export const updateContentConfigEdit = async (data) => {
    try {
        const response = await axios({
            url: `/content-config/`,
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