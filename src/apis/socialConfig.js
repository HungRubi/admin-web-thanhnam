import axios from "../axios";

export const getSocialConfigEdit = async () => {
    try {
        const response = await axios({
            url: `/social/`,
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

export const updateSocialConfigEdit = async (data) => {
    try {
        const response = await axios({
            url: `/social/`,
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