if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const passport = require('passport');
const session = require('express-session');

const users = [{
    id: 0,
    name: 'example',
    password: '1234',
}];

const initializePassport = require('./passport-config');
initializePassport(
    passport,
    name => users.find(user => user.name === name),
    id => users.find(user => user.id === id),
);

app.use(express.json());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());

app.get('/user', (request, response) => {
    const user = request.user ? { id: request.user.id, name: request.user.name } : null;

    response.json(user);
});

app.post('/login', passport.authenticate('local'), (request, response) => {
    response.json({
        isLoggedIn: true,
        user: { id: request.user.id, name: request.user.name },
    });
});

app.post('/register', async (request, response) => {
    const hashedPassword = await bcrypt.hash(request.body.password, 10);
    users.push({
        id: Date.now().toString(),
        name: request.body.name,
        email: request.body.email,
        password: hashedPassword,
    });
});

app.post('/logout', (request, response) => {
    request.logOut();
    response.json({ success: true });
});

app.get('/activities', checkAuthenticated, (request, response) => {
    response.json([
        {
            title: 'Activity 1',
            colorId: '8',
        }, {
            title: 'Activity 2',
            colorId: '9',
        }, {
            title: 'Activity 3',
            colorId: '10',
        }, {
            title: 'Activity 4',
            colorId: '11',
        }, {
            title: 'Activity 5',
            colorId: '12',
        }, {
            title: 'Activity 6',
            colorId: '13',
        }, {
            title: 'Activity 7',
            colorId: '14',
        },
    ]);
});

function checkAuthenticated(request, response, next) {
    if (!request.isAuthenticated()) {
        response.status(403).send({ error: 'Authentication required' });
    }
    next();
}

app.listen(3001);