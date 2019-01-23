require('dotenv').config();

let express = require('express');
let app = express();
let bodyParser = require('body-parser')
let sequelize = require('./db');
let auth = require('./controllers/authcontroller');
let locker = require('./controllers/lockercontroller')

sequelize.sync();

app.use(bodyParser.json());

app.use(require('./middleware/headers'));

app.use('/auth', auth);

app.use(require('./middleware/validate-sesh'));

app.use('/locker', locker);

app.listen(process.env.PORT, () => {
    console.log(`Heard on ${process.env.PORT}!`)
});