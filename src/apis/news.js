import axios from "../axios";

export const getNews = async (search='') => {
    try {
        const response = await axios({
            url: `/new?timkiem=${search}`,
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