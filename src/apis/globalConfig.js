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