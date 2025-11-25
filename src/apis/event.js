import axios from "../axios";

export const getEvent = async (search='') => {
    try {
        const response = await axios({
            url: `/event?timkiem=${search}`,
            method: 'GET',
        });
        console.log(response);
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

export const getEventEdit = async (id) => {
    try {
        const response = await axios({
            url: `/event/${id}`,
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

export const updateEvent = async (id, data) => {
    try{
        const response = await axios({
            method: "PUT",
            url: `/event/${id}`,
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

export const addEvent = async (data) => {
    try{
        const response = await axios({
            method: "POST",
            url: "/event",
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

export const deleteEvent = async (id) => {
    try{
        const response = await axios({
            method: "DELETE",
            url: `/event/${id}`
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

export const deleteManyEvent = async (data) => {
    try{
        const response = await axios({
            method: "DELETE",
            url: `/event/delete-many`,
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

