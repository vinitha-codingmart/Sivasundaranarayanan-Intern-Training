const express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    routes = require('./routes/appRoutes'),
    cors = require('cors');

var port = process.env.PORT || 3001;

app.listen(port);

console.log('API started at ' + port);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors())

routes(app);