import axios from "../axios";

export const getContent = async (search='') => {
    try {
        const response = await axios({
            url: `/content?timkiem=${search}`,
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

export const addContent = async (data) => {
    try{
        const response = await axios({
            method: "POST",
            url: "/content",
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

export const getContentEdit = async (id) => {
    try {
        const response = await axios({
            url: `/content/${id}`,
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

export const updateContent = async (id, data) => {
    try{
        const response = await axios({
            method: "PUT",
            url: `/content/${id}`,
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
};

export const deleteContent = async (id) => {
    try{
        const response = await axios({
            method: "DELETE",
            url: `/content/${id}`
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
};

export const deleteManyContent = async (data) => {
    try{
        const response = await axios({
            method: "DELETE",
            url: `/content/delete-many`,
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