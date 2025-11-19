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

export const addNew = async (data) => {
    try{
        const response = await axios({
            method: "POST",
            url: "/new",
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

export const getNewEdit = async (id) => {
    try {
        const response = await axios({
            url: `/new/${id}`,
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

export const updateNew = async (id, data) => {
    try{
        const response = await axios({
            method: "PUT",
            url: `/new/${id}`,
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

export const deleteNew = async (id) => {
    try{
        const response = await axios({
            method: "DELETE",
            url: `/new/${id}`
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

export const deleteManyNew = async (data) => {
    try{
        const response = await axios({
            method: "DELETE",
            url: `/new/delete-many`,
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

export const filterNew = async (filters) => {
    try{
        const params = new URLSearchParams();
        Object.entries(filters).forEach(([key, value]) => {
            if (value) params.append(key, value); 
        });
        const response = await axios({
            url: `/new/filter?${params.toString()}`,
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