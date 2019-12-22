const express = require('express');
const router = express.Router();
const sequelize = require('../db');
const User = sequelize.import('../models/auth');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// new user sign up
router.post('/signup', (req, res) => {
    const newUser = {
    username: req.body.username,
    email: req.body.email,
    passwordhash: bcrypt.hashSync(req.body.password, 10)
    }

    User.create(newUser)
        .then(
            createSuccess = (user) => {
                let token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24});

                res.status(200).json({
                    user: user,
                    message: 'User created.',
                    sessionToken: token
                });
            },
            createError = err => {
                res.status(500).json({error: err})
        }
    );
});

// user log in
router.post('/login', (req, res) => {
    User.findOne({where: {email: req.body.email}}).then(
        user => {
            if(user){
                console.log(user)
                bcrypt.compare(req.body.password, user.passwordhash, (err, matches) => {
                    if(matches) {
                        let token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24});
                        res.json({
                            user: user,
                            message: 'Success!',
                            sessionToken: token
                        });
                    } else {
                        res.status(502).send({error: 'Sign in failed'});
                    }
                });
            } else {
                res.status(500).send({error: 'Not Authorized'});
            }
        },
        err => {
            res.status(501).send({error: 'FAILED'});
        }
    );
});

module.exports = router;
