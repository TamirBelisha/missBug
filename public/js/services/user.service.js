import { utilService } from './util.service.js'

const USER_URL = '/api/user/'

export const userService = {
    login,
    logout,
    getLoggedinUser,
    signup,
    getById,
    query,
    remove
}

function login(username, password) {

    return axios.post('/api/login', { username, password })
        .then(res => res.data)
        .then(username => {
            utilService.saveToStorage('loggedinUser', username)
            return username
        })
}

function signup(fullname, username, password) {
    return axios.post('/api/signup', { fullname, username, password })
        .then(res => res.data)
        .then(user => {
            utilService.saveToStorage('loggedinUser', user)
            return user
        })
}

function logout() {
    
    return axios.post('/api/logout')
        .then(() => {
            utilService.saveToStorage('loggedinUser', '')
            return ''
        })
}

function getLoggedinUser() {
    return utilService.loadFromStorage('loggedinUser')
}

function getById(id) {
    return axios.get(USER_URL + id)
        .then(res => res.data)
}

function query() {
    return axios.get('/api/admin')
        .then(res => res.data)
}

function remove(userId) {
    return axios.delete(USER_URL + userId)
        .then(res => res.data)
    // return storageService.remove(CAR_KEY, carId)
}