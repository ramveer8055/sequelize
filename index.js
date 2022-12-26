const express = require('express')
const bodyParser = require('body-parser')
require('./models')
const userCtrl = require('./controllers/userController')
const app = express()
const PORT = 4242


app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.status(200).json({
        status: true,
        message: "Hello"
    })
})

app.get('/add', userCtrl.addUser)

app.get('/users', userCtrl.getUsers)

app.get('/user/:id', userCtrl.getUser)

app.post('/postUser', userCtrl.postUser)

app.delete('/user/:id', userCtrl.deleteUser)

app.patch('/user/:id', userCtrl.patchUser)

app.get('/query', userCtrl.queryUser)


app.get('/finders', userCtrl.finderUSer)

// User.sync({force: true})
// User.drop()

app.listen(PORT, (req, res) => {
    console.log(`your server is running on http://localhost:${PORT}`)
})