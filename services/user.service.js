
const fs = require('fs')


// CRUDL : CREATE, READ, UPDATE, DELETE, LIST

const gUsers = require('../data/user.json')

const PAGE_SIZE = 3

function query() {
    return Promise.resolve(gUsers)
}

function getById(userId) {
    const user = gUsers.find(user => user._id === userId)
    if (!user) return Promise.reject('No Such User')
    return Promise.resolve(user)
}

function checkLogin(username, password) {
    var user = gUsers.find(user => user.username === username && user.password === password)
    if (!user) return Promise.reject('Invalid Credentials')

    user = {...user}
    delete user.password
    return Promise.resolve(user)
}

function remove(userId) {
    const idx = gUsers.findIndex(user => user._id === userId)
    if (idx === -1) return Promise.reject('No such User')
    gUsers.splice(idx, 1)
    return _saveUsersToFile()
}

function save(fullname, username, password) {
    const userToSave = {
        _id : _makeId(),
        fullname,
        username,
        password,
        createdAt: Date.now(),
        isAdmin: false,
        bugCount: 0     
    }
    gUsers.unshift(userToSave)
    return _saveUsersToFile().then(() => {
        const user = {...userToSave}
        delete user.password
        return user
    })
}
function updateCount(userId, val) {
        const idx = gUsers.findIndex(user => user._id === userId)
        if (idx === -1)  return Promise.reject('No such User')
        gUsers[idx].bugCount += val
    return _saveUsersToFile().then(()=>gUsers[idx])
}

function _saveUsersToFile() {
    return new Promise((resolve, reject) => {
        fs.writeFile('data/user.json', JSON.stringify(gUsers, null, 2), (err) => {
            if (err) return reject(err)
            resolve();
        })
    })
}

function _makeId(length = 5) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}

module.exports = {
    checkLogin,
    getById,
    save,
    query,
    remove,
    updateCount
}