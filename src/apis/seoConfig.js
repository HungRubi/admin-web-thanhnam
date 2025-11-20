import axios from "../axios";

export const getSeoConfigEdit = async () => {
    try {
        const response = await axios({
            url: `/seo/`,
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

export const updateSeoConfigEdit = async (data) => {
    try {
        const response = await axios({
            url: `/seo/`,
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