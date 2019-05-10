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
        res.status(500).json({ message: "User requires a username, password and department" });
    }
}

function login(req, res) {
    let { username, password } = req.body;

    Users.findBy({ username })
        .first()
        .then(user => {
            if (user && bcrypt.compareSync(password, user.password)) {
                const token = generateToken(user);
                res.status(200).json({
                    message: `Welcome ${user.username}!`,
                    token,
                });
            } else {
                res.status(401).json({ message: 'Invalid Credentials' });
            }
        })
        .catch(error => {
            console.log('error', error);
            res.status(500).json(error);
        });
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

    const secret = process.env.JWT_SECRET;

    return jwt.sign(payload, secret, options)
}