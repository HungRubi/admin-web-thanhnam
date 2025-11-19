import axios from "../axios";

export const getMenu = async (search='') => {
    try {
        const response = await axios({
            url: `/menu?timkiem=${search}`,
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

export const addMenu = async (data) => {
    try{
        const response = await axios({
            method: "POST",
            url: "/menu",
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

export const getMenuEdit = async (id) => {
    try {
        const response = await axios({
            url: `/menu/${id}`,
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

export const updateMenu = async (id, data) => {
    try{
        const response = await axios({
            method: "PUT",
            url: `/menu/${id}`,
            data: data
        })
        console.log(response)
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

export const deleteMenu = async (id) => {
    try{
        const response = await axios({
            method: "DELETE",
            url: `/menu/${id}`
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

export const deleteManyMenu = async (data) => {
    try{
        const response = await axios({
            method: "DELETE",
            url: `/menu/delete-many`,
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

export const filterMenu = async (filters) => {
    try{
        const params = new URLSearchParams();
        Object.entries(filters).forEach(([key, value]) => {
            if (value) params.append(key, value); 
        });
        const response = await axios({
            url: `/menu/filter?${params.toString()}`,
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
