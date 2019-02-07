require('dotenv').config()
const { SERVER_PORT, SESSION_SECRET, CONNECTION_STRING } = process.env
const express = require('express')
const massive = require('massive')

const app = express();

massive(CONNECTION_STRING) .then(db => {
    app.set('db', db)
    const port = SERVER_PORT || 3005
    app.listen(port, console.log('The server is running on port', port))
})