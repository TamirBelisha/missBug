
const fs = require('fs')


// CRUDL : CREATE, READ, UPDATE, DELETE, LIST

const gBugs = require('../data/bug.json')

const PAGE_SIZE = 4

function query(filterBy) {
    const regex = new RegExp(filterBy.txt, 'i')
    var bugs = gBugs.filter(bug => regex.test(bug.title) || regex.test(bug.description))

    if(filterBy.page === 0 || filterBy.page){
        console.log('got to paging');
        startIdx = filterBy.page * PAGE_SIZE
        bugs = bugs.slice(startIdx, startIdx + PAGE_SIZE)
    }
    return Promise.resolve(bugs)
}

function getById(bugId) {
    const bug = gBugs.find(bug => bug._id === bugId)
    return Promise.resolve(bug)
}

function remove(bugId, loggedinUser) {
    const idx = gBugs.findIndex(bug => bug._id === bugId)
    if (idx === -1) return Promise.reject('No such Bug')
    if (!loggedinUser.isAdmin && gBugs[idx].owner._id !== loggedinUser._id) return Promise.reject('Not your Bug')
    gBugs.splice(idx, 1)
    return _saveBugsToFile()
}

function save({_id, title, description, severity, createdAt, owner}, loggedinUser) {
    const bugToSave = {
        _id, 
        title, 
        description,
        severity,
        createdAt,
        owner
    }
    
    if (_id) {
        const idx = gBugs.findIndex(bug => bug._id === _id)
        if (idx === -1)  return Promise.reject('No such Bug')
        if (gBugs[idx].owner._id !== loggedinUser._id) return Promise.reject('Not your Bug')
        gBugs[idx] = bugToSave
    } else {
        // CREATE
        bugToSave._id = _makeId()
        gBugs.unshift(bugToSave)
    }
    return _saveBugsToFile().then(()=>bugToSave)
}


function _saveBugsToFile() {
    return new Promise((resolve, reject)=>{
        fs.writeFile('data/bug.json', JSON.stringify(gBugs, null, 2), (err)=>{
            if (err) return reject(err)
            resolve();
        })
    })
}

function _makeId(length =5){
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for(let i=0; i < length; i++)   {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}

module.exports = {
    query,
    getById,
    remove,
    save
}