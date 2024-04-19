import { instance } from '../axios/index'

async function userRegister(username, password) {
    try {
        const response = await instance.post('/user/register', {username, password})
        return response.data
    } catch (error) {
        throw new Error(error.response.data.message || 'Something went wrong');
    }
}

async function userLogin(username, password) {
    try {
        const response = await instance.post('/user/login',{username, password})
        console.log(response.data)
        return response.data
    } catch (error) {
        throw new Error(error.response.data.message || 'Something went wrong');
    }
}

async function userGetSpecific(user_id) {
    try {
        const response = await instance.get(`/user/${user_id}`)
        return response.data
    } catch (error) {
        throw new Error(error.response.data.message || 'Something went wrong');
    }
}

export { userRegister, userLogin, userGetSpecific }