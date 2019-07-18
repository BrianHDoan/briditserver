const router = require('express').Router();
const User = require('../db').import('../models/user')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/signup', (req, res) => {
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10)
    })
    .then(user => {
            let token = jwt.sign({id:user.id}, process.env.JWT_SECRET, {expiresIn: 60 * 60 * 24})
            res.json({
                user: user,
                message: 'user created',
                sessionToken: token
            })
        },
        err => {
            res.json({
                err
            })
        }
    )
})

router.post('/login', (req, res) => {
    User.findOne({where: {email: req.body.email}})
    .then(user => {
        if (user) {
            bcrypt.compare(req.body.password, user.password, (err, matches) => {
                if (matches) {
                    let token = jwt.sign({id:user.id}, process.env.JWT_SECRET, {expiresIn: 60 * 60 * 24})
                    res.json({
                        user: user,
                        message: 'verified user',
                        sessionToken: token
                    })
                } else {
                    res.status(502).send({error: 'Bad Gateway'})
                }
            })
        } else {
            res.status(500).send({error: 'Failed Verification'})
        }
    },
    err => res.status(501).send({error: 'Unable to process'})
    )
})

module.exports = router;