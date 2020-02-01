const express = require('express')
const cors = require('cors')
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
const _url = 'mongodb://localhost:27017'
const dbName = 'Todoist'
const routes = require('../Backend/routes/appRoutes')

const client = new MongoClient(_url, { useUnifiedTopology: true })

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

client.connect(err => {
    if (err) return console.log(err)
    else {
        const db = client.db(dbName)
        app.listen(3000, () => {
            console.log('listening to port 3000')
        })
        routes(app, db)
    }
})

