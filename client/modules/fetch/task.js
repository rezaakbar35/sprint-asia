import { instance } from '../axios/index'

async function getAllTask() {
    try{
        const response = await instance.get("/task")
        return response.data
    } catch(error){
        throw new Error(error.response.data.message || "Something went wrong");
    }
}

async function getUniqueTask(id){
    try {
        const response = await instance.get(`/task/${id}`)
        return response.data
    } catch (error) {
        throw new Error(error.response.data.message || "Something went wrong");
    }
}

async function getTodoTask(id){
    try {
        const response = await instance.get(`/task/todo/${id}`)
        return response.data
    } catch (error) {
        throw new Error(error.response.data.message || "Something went wrong");
    }
}

async function createTask(task_title, todo_id, is_done, is_urgent, is_important, due_date) {
    try {
        const response = await instance.post('/task/create', {task_title, todo_id, is_done, is_urgent, is_important, due_date})
        return response.data
    } catch (error) {
        throw new Error(error.response.data.message || "Something went wrong"); 
    }
}

async function updateTask(task_id, task_title, todo_id, is_done, is_urgent, is_important, due_date) {
    try {
        const response = await instance.put(`/task/update/${task_id}`, {task_title, todo_id, is_done, is_urgent, is_important, due_date})
        return response.data
    } catch (error) {
        throw new Error(error.response.data.message || "Something went wrong");
    }
}

async function deleteTask(id){
    try {
        const response = await instance.delete(`/task/delete/${id}`)
        return response.data
    } catch (error) {
        throw new Error(error.response.data.message || "Something went wrong");
    }
}

async function filterByTrueUrgent(){
    try {
        const response = await instance.get('/task/filter/is_urgent')
        return response.data
    } catch (error) {
        throw new Error(error.response.data.message || "Something went wrong")
    }
}

async function filterByTrueImportant(){
    try {
        const response = await instance.get('/task/filter/is_important')
        return response.data
    } catch (error) {
        throw new Error(error.response.data.message || "Something went wrong")
    }
}

async function sortByDueDateAscending(){
    try {
        const response = await instance.get('/sort/due_date/asc')
        return response.data
    } catch (error) {
        throw new Error(error.response.data.message || "Something went wrong")
    }
}

async function sortByDueDateDescending(){
    try {
        const response = await instance.get('/sort/due_date/desc')
        return response.data
    } catch (error) {
        throw new Error(error.response.data.message || "Something went wrong")
    }
}

export {
    getAllTask,
    getUniqueTask,
    getTodoTask,
    updateTask,
    createTask,
    deleteTask,
    filterByTrueImportant,
    filterByTrueUrgent,
    sortByDueDateAscending,
    sortByDueDateDescending,
}