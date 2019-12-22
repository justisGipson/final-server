require('dotenv').config();

const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const sequelize = require('./db');
const http = require('http');
const auth = require('./controllers/authcontroller');
const locker = require('./controllers/lockercontroller');

sequelize.sync();

setInterval(() => {
    http.get('http://jg-gear-locker.herokuapp.com')
}, 30000) // wake every 5 minutes

app.use(bodyParser.json());

app.use(require('./middleware/headers'));

app.use('/auth', auth);

app.use(require('./middleware/validate-sesh'));

app.use('/locker', locker);

app.listen(process.env.PORT, () => {
    console.log(`Heard on ${process.env.PORT}!`)
});
