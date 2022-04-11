const express = require('express')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const bodyParser = require('body-parser')
const bugService = require('./services/bug-service.js')
const userService = require('./services/user.service.js')
const app = express()

app.use(cookieParser())

app.use(session({
    secret: 'missBug-9480930307-timi',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))

app.use(express.static('public'))
app.use(bodyParser.json())



// app.get('/puki', (req, res) => {

//     var visitCount = req.cookies.visitCount || 0;
//     visitCount++;
//     res.cookie('visitCount', visitCount)
   

//     res.send('Hello Puki')
// })
// app.get('/nono', (req, res) => res.redirect('/'))


//LIST
app.get('/api/bug', (req, res) => {
    console.log('Backend getting your bugs');
    const filterBy = { 
        txt: req.query.txt || '' ,
        page: req.query.page || 0,
    }
    bugService.query(filterBy)
        .then(bugs => {
            res.send(bugs)
        })
})


//UPDATE
app.put('/api/bug/:bugId', (req, res) => {
    const { theUser } = req.session
    if (!theUser) return res.status(401).send('Please login')

    console.log('Backend Saving Bug:', req.body.title);
    const { _id, title, description, severity, createdAt, owner} = req.body
    const bug = {
        _id, 
        title, 
        description,
        severity,
        createdAt,
        owner: {
            _id: theUser._id,
            fullname: theUser.fullname
        }
    }

    bugService.save(bug, theUser)
        .then((savedBug) => {
            res.send(savedBug)
        })
        .catch(err => {
            console.log('Backend had error: ', err);
            res.status(401).send('Cannot update Bug')
        })
})


//CREATE
app.post('/api/bug', (req, res) => {

    const { theUser } = req.session
    if (!theUser) return res.status(401).send('Please login')

    console.log('Backend Saving bug:', req.body.title);
    const { title, description, severity, createdAt} = req.body
    const bug = {
        title, 
        description,
        severity,
        createdAt,
        owner: {
            _id: theUser._id,
            fullname: theUser.fullname
        }
    }

    bugService.save(bug)
        .then((savedBug) => {
            userService.updateCount(theUser._id, 1)
            res.status(201).send(savedBug)
        })
        .catch(err => {
            console.log('Backend had error: ', err);
            res.status(401).send('Cannot create Bug')
        })
})

//READ
app.get('/api/bug/:bugId', (req, res) => {
    console.log('Backend getting your Bug:', req.params.bugId);
    bugService.getById(req.params.bugId)
        .then(bug => {
            res.send(bug)
        })
        .catch(err=> {
            console.log('Backend had error: ', err);
            res.status(404).send('No such Bug')
        })
})


//REMOVE
app.delete('/api/bug/:bugId', (req, res) => {

    const { theUser } = req.session
    if (!theUser) return res.status(401).send('Please login')
    

    console.log('Backend removing Bug:', req.params.bugId);
    bugService.remove(req.params.bugId, theUser)
        .then(() => {
            userService.updateCount(theUser._id, -1)
            res.send({ msg: 'Removed' })
        })
        .catch(err => {
            console.log('Backend had error: ', err);
            res.status(404).send('Cannot remove Bug')
        })
})


//USER/////////
app.post('/api/login', (req, res) => {

    const { username, password } = req.body

    userService.checkLogin(username, password)
        .then(user => {
            req.session.theUser = user
            res.send(user)
        })
        .catch(err => {
            console.log(`${username} attempt login failed`, err);
            res.status(401).send('Invalid Login')
        })
})

app.post('/api/signup', (req, res) => {
    const { username, password, fullname } = req.body
    userService.save(fullname, username, password)
        .then(user => {
            req.session.theUser = user
            res.send(user)
        })
        .catch(err => {
            console.log(`${username} attempt login failed`, err);
            res.status(401).send('Invalid Login')
        })
})

app.post('/api/logout', (req, res) => {
    req.session.destroy()
    // res.clearCookie('username')
    res.end()
    console.log('logging out');
})

//USER METHODS 
//LIST
app.get('/api/admin', (req, res) => {

    const { theUser } = req.session
    if (!theUser.isAdmin) return res.status(401).send('User is not Admin')
    console.log('Backend getting your Users');
    // const filterBy = { 
        //     txt: req.query.txt || '' ,
        //     page: req.query.page || 0,
        // }
        userService.query()
        .then(users => {
            res.send(users)
        })
        .catch(err => {
            console.log('err',err);
            res.status(401).send('User is not Admin')
        })
    })
    
    //READ
app.get('/api/user/:userId', (req, res) => {

    const { theUser } = req.session
    if (theUser._id !== req.params.userId && !theUser.isAdmin) return res.status(401).send('Not allowed')

    console.log('Backend getting your User:', req.params.userId);
    userService.getById(req.params.userId)
        .then(user => {
            res.send(user)
        })
        .catch(err=> {
            console.log('Backend had error: ', err);
            res.status(404).send('Not allowed')
        })
})

//REMOVE
app.delete('/api/user/:userId', (req, res) => {

    const { theUser } = req.session
    if (!theUser.isAdmin) return res.status(401).send('User is not Admin')

    console.log('Backend removing User:', req.params.userId);
    userService.remove(req.params.userId, theUser)
        .then(() => {
            res.send({ msg: 'Removed' })
        })
        .catch(err => {
            console.log('Backend had error: ', err);
            res.status(404).send('Cannot remove User')
        })
})

app.listen(3031,
    () => console.log('Server listening on port 3031'))
