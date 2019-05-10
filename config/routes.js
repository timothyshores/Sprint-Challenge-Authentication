const axios = require('axios');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Users = require('./models.js');
const { authenticate } = require('../auth/authenticate');

module.exports = server => {
    server.post('/api/register', register);
    server.post('/api/login', login);
    server.get('/api/jokes', authenticate, getJokes);
};

function register(req, res) {
    let user = req.body;
    let { username, password } = user;
    const hash = bcrypt.hashSync(user.password, 12);
    user.password = hash;

    if (user && username && password) {
        Users.add(user)
            .then(saved => {
                const token = generateToken(user);
                res.status(201).json({ saved, token });
            })
            .catch(error => {
                console.log(error);
                res.status(500).json(error);
            });
    } else {
        console.log('error');
        console.log('user', user);
        console.log('username', username);
        console.log('password', password);
        res.status(500).json({ message: "User requires a username, password and department" });
    }
}

function login(req, res) {
    // implement user login
}

function getJokes(req, res) {
    const requestOptions = {
        headers: { accept: 'application/json' },
    };

    axios
        .get('https://icanhazdadjoke.com/search', requestOptions)
        .then(response => {
            res.status(200).json(response.data.results);
        })
        .catch(err => {
            res.status(500).json({ message: 'Error Fetching Jokes', error: err });
        });
}

function generateToken(user) {
    const payload = {
        subject: user.id,
        username: user.username,
    };

    const options = {
        expiresIn: '8h'
    }

    const secret = 'Keep It Secret, Keep It Safe'

    return jwt.sign(payload, secret, options)
}