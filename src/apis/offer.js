import axios from "../axios";

export const getOffer = async (search='') => {
    try {
        const response = await axios({
            url: `/offer?timkiem=${search}`,
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

export const addOffer = async (data) => {
    try{
        const response = await axios({
            method: "POST",
            url: "/offer",
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

export const getOfferEdit = async (id) => {
    try {
        const response = await axios({
            url: `/offer/${id}`,
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

export const updateOffer = async (id, data) => {
    try{
        const response = await axios({
            method: "PUT",
            url: `/offer/${id}`,
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

export const deleteOffer = async (id) => {
    try{
        const response = await axios({
            method: "DELETE",
            url: `/offer/${id}`
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

export const deleteManyOffer = async (data) => {
    try{
        const response = await axios({
            method: "DELETE",
            url: `/offer/delete-many`,
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

export const filterOffer = async (filters) => {
    try{
        const params = new URLSearchParams();

        Object.entries(filters).forEach(([key, value]) => {
            if (value) params.append(key, value); // chỉ thêm nếu có value
        });
        const response = await axios({
            url: `/offer/filter?${params.toString()}`,
            method: 'GET',
        })
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