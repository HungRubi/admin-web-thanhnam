import axios from "../axios";

export const getStore = async (search='') => {
    try {
        const response = await axios({
            url: `/store?timkiem=${search}`,
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

export const addStore = async (data) => {
    try{
        const response = await axios({
            method: "POST",
            url: "/store",
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

export const deleteStore = async (id) => {
    try{
        const response = await axios({
            method: "DELETE",
            url: `/store/${id}`
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

export const deleteManyStore = async (data) => {
    try{
        const response = await axios({
            method: "DELETE",
            url: `/store/delete-many`,
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

export const getStoreEdit = async (id) => {
    try {
        const response = await axios({
            url: `/store/${id}`,
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

export const updateStore = async (id, data) => {
    try{
        const response = await axios({
            method: "PUT",
            url: `/store/${id}`,
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

export const filterStore = async (filters) => {
    try{
        const params = new URLSearchParams();

        Object.entries(filters).forEach(([key, value]) => {
            if (value) params.append(key, value); // chỉ thêm nếu có value
        });
        const response = await axios({
            url: `/store/filter?${params.toString()}`,
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