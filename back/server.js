require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const utils = require('./utils');

const app =  express();
const port = process.env.PORT || 6899;

const users = [
    {
        email: "leesugar90@naver.com",
        password: "1234",
    },
    {
        email: "leesugar90@google.com",
        password: "1234",
    }
];

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next){
    var token =  req.headers['authorization'];
    if(!token) return next();   // if no token, continue
    
    token = token.replace('Bearer ', '');
    jwt.verify(token, process.env.JWT_SECRET, function(err, user){
        if(err){
            return res.status(401).json({
                error: true,
                message: 'Invalid user.'
            })
        } else{
            req.user = user;
            next();
        }
    })
});

app.get('/', (req, res)=>{
    if(!req.user) return res.status(401).json({ success: false, message: 'Invalid user to access it.'});
    res.send('Welcome to the node.js tutorial! - '+req.user.email);
})

app.post('/users/signin', function(req, res){
    const email = req.body.email;
    const password = req.body.password;

    if(!email || !password) {
        return res.status(400).json({
            error: true,
            message: 'email or password required.'
        })
    }
    
    if( users.filter(function (user) { return user.email == email }).length === 0 || password !== users.filter(function (user) { return user.email == email })[0].password ){
        return res.status(401).json({
            error: true,
            message: 'email or password is wrong'
        })
    }

    const userData = {
        email,
        password
    }

    const token = utils.generateToken(userData);
    const userObj = utils.getCleanUser(userData);

    return res.json({ user: userObj, token });

});

app.post('/users/signup', function(req, res){
    const email = req.body.email;
    const password = req.body.password;

    if(!email || !password) {
        return res.status(400).json({
            error: true,
            message: 'email or password required.'
        })
    }
    
    if( users.filter(function (user) { return user.email == email }).length !== 0 ){
        return res.status(401).json({
            error: true,
            message: '이미 가입된 email입니다.'
        })
    }

    const userData = {
        email,
        password
    }

    users.push(userData);

    const token = utils.generateToken(userData);
    const userObj = utils.getCleanUser(userData);

    return res.json({ user: userObj, token });

});

app.get('/verifyToken', function(req, res){
    var token = req.body.token || req.query.token;
    if(!token) {
        return res.status(400).json({
            error: true,
            message: 'Token is required'
        });
    }

    jwt.verify(token, process.env.JWT_SECRET, function(err, user){
        if(err) return res.status(401).json({
            error: true,
            message: 'Invalid token'
        })

        if(user.email !== userData.email){
            return res.status(401).json({
                error: true,
                message: 'Invalid user.'
            })
        }

    })


    var userObj = utils.getCleanUser(userData);
    return res.json({ user: userObj, token })
});

app.listen(port, () => {
    console.log('Server started on: ' + port);
});


