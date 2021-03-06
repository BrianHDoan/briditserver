var jwt = require('jsonwebtoken');
var User = require('../db').import('../models/user');

const validateSession = (req, res, next) => {
    if (req.method != "OPTIONS") {
        var sessionToken = req.headers.authorization; //1
        if (!sessionToken) return res.status(403).send({ auth: false, message: 'No token provided.' }); //3
        else {
            jwt.verify(sessionToken, process.env.JWT_SECRET, (err, decoded) => { 
                if(decoded){
                    User.findOne({where: { id: decoded.id}}).then(user => { 
                        req.user = user;
                        next();
                    },
                    function(){ 
                        res.status(401).send({error: 'Not authorized'});
                    });
                } else { 
                    res.status(400).send({error: 'Not authorized'});
                }
            });
        }
    } else {
        next()
    }
}

module.exports = validateSession;