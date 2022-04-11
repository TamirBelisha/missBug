import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'
import { userService } from './user.service.js'

const BUG_URL = '/api/bug/'

export const bugService = {
    query,
    remove,
    save,
    getEmptyBug,
    getById,
}

function query(filterBy) {
    return axios.get(BUG_URL, {params: filterBy})
        .then(res => res.data)

    // return storageService.query(CAR_KEY)
}

function getById(id) {
    return axios.get(BUG_URL + id)
        .then(res => res.data)
    // return storageService.get(CAR_KEY, id)
}

function remove(bugId) {
    return axios.delete(BUG_URL + bugId)
        .then(res => res.data)
    // return storageService.remove(CAR_KEY, carId)
}

function save(bug) {
    if (bug._id) {
        return axios.put(BUG_URL + bug._id, bug)
        // return storageService.put(CAR_KEY, car)
    } else {
        return axios.post(BUG_URL, bug)
        // return storageService.post(CAR_KEY, car)
    }
}


function getEmptyBug() {
    return {
        _id: '', 
        title: '', 
        description: '',
        severity: 1,
        createdAt: Date.now(),
    }
}