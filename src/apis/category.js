import axios from "../axios";

export const getCategory = async (search='') => {
    try {
        const response = await axios({
            url: `/category?timkiem=${search}`,
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

export const getCategoryEdit = async (id) => {
    try {
        const response = await axios({
            url: `/category/${id}`,
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

export const updateCategory = async (id, data) => {
    try{
        const response = await axios({
            method: "PUT",
            url: `/category/${id}`,
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

export const addCategory = async (data) => {
    try{
        const response = await axios({
            method: "POST",
            url: "/category",
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

export const deleteCategory = async (id) => {
    try{
        const response = await axios({
            method: "DELETE",
            url: `/category/${id}`
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

export const deleteManyCategory = async (data) => {
    try{
        const response = await axios({
            method: "DELETE",
            url: `/category/delete-many`,
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