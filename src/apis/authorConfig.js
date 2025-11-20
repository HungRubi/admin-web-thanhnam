import axios from "../axios";

export const getAuthorConfigEdit = async () => {
    try {
        const response = await axios({
            url: `/author/`,
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

export const updateAuthorConfigEdit = async (data) => {
    try {
        const response = await axios({
            url: `/author/`,
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