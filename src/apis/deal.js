import axios from "../axios";

export const getDeal = async (search='') => {
    try {
        const response = await axios({
            url: `/deal?timkiem=${search}`,
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

export const addDeal = async (data) => {
    try{
        const response = await axios({
            method: "POST",
            url: "/deal",
            data: data
        })
        return response;
    }catch(error) {
        if(error.response) {
            return error.response
        }
        return {
            status: 500,
            message: "Lỗi server vui lòng thử lại sau"
        }
    }
}

export const getDealEdit = async (id) => {
    try {
        const response = await axios({
            url: `/deal/${id}`,
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

export const updateDeal = async (id, data) => {
    try{
        const response = await axios({
            method: "PUT",
            url: `/deal/${id}`,
            data: data
        })
        return response;
    }catch(error) {
        if(error.response) {
            return error.response
        }
        return {
            status: 500,
            message: "Lỗi server vui lòng thử lại sau"
        }
    }
}

export const deleteDeal = async (id) => {
    try{
        const response = await axios({
            method: "DELETE",
            url: `/deal/${id}`
        })
        return response;
    }catch(error) {
        if(error.response) {
            return error.response
        }
        return {
            status: 500,
            message: "Lỗi server vui lòng thử lại sau"
        }
    }
}

export const deleteManyDeal = async (data) => {
    try{
        const response = await axios({
            method: "DELETE",
            url: `/deal/delete-many`,
            data: data
        })
        return response;
    }catch(error) {
        if(error.response) {
            return error.response
        }
        return {
            status: 500,
            message: "Lỗi server vui lòng thử lại sau"
        }
    }
}

export const filterDeal = async (filters) => {
    try{
        const params = new URLSearchParams();

        Object.entries(filters).forEach(([key, value]) => {
            if (value) params.append(key, value); 
        });
        const response = await axios({
            url: `/deal/filter?${params.toString()}`,
            method: 'GET',
        })
        console.log(response);
        return response;
    }catch(error){
        if (error.response) {
            return error.response;
        }
        return {
            status: 500,
            message: "Có lỗi xảy ra, vui lòng thử lại sau"
        };
    }
}