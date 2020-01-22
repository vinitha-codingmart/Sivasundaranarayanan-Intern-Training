const express = require('express')
const app = express()
const route = require('./router/appRoute')
const bodyParser = require('body-parser')
const cors = require('cors')

const port = 3001

app.listen(port, () => console.log('App running on ',port))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())

route(app)