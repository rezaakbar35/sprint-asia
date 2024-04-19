import { instance } from '../axios/index'

async function getAllToDo() {
    try{
        const response = await instance.get("/todo")
        return response.data
    } catch(error){
        throw new Error(error.response.data.message || "Something went wrong");
    }
}

async function getUniqueToDo(id){
    try {
        const response = await instance.get(`/todo/${id}`)
        return response.data
    } catch (error) {
        throw new Error(error.response.data.message || "Something went wrong");
    }
}

async function getUserToDo(id){
    try {
        const response = await instance.get(`/todo/user/${id}`)
        return response.data
    } catch (error) {
        throw new Error(error.response.data.message || "Something went wrong");
    }
}

async function createToDo(todo_title, user_id, is_done) {
    try {
        const response = await instance.post('/todo/create', {todo_title, user_id, is_done})
        return response.data
    } catch (error) {
        throw new Error(error.response.data.message || "Something went wrong"); 
    }
}

async function updateToDo(todo_id, todo_title, user_id, is_done) {
    try {
        const response = await instance.put(`/todo/update/${todo_id}`, {todo_title, user_id, is_done})
        return response.data
    } catch (error) {
        throw new Error(error.response.data.message || "Something went wrong");
    }
}

async function deleteToDo(id){
    try {
        const response = await instance.delete(`/todo/delete/${id}`)
        return response.data
    } catch (error) {
        throw new Error(error.response.data.message || "Something went wrong");
    }
}

export {
    getAllToDo,
    getUniqueToDo,
    getUserToDo,
    updateToDo,
    createToDo,
    deleteToDo
}