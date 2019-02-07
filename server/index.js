require('dotenv').config()
const { SERVER_PORT, SESSION_SECRET, CONNECTION_STRING } = process.env
const express = require('express')
const { json } = require('express')
const massive = require('massive')
const session = require('express-session')
const ctrl = require('./controller')

const app = express();

app.use(json())
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    maxAge: null
}))

massive(CONNECTION_STRING) .then(db => {
    app.set('db', db)
    const port = SERVER_PORT || 3005
    app.listen(port, console.log('The server is running on port', port))
})

app.post("/auth/register", ctrl.register)
app.post('/auth/login', ctrl.login)