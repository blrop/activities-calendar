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
    name: 'admin',
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

app.get('/is-logged-in', (request, response) => {
    const user = request.user ? { id: request.user.id, name: request.user.name } : null;

    response.json({
        isLoggedIn: request.isAuthenticated(),
        user,
    });
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

// function checkAuthenticated(request, response, next) {
//     if (!request.isAuthenticated()) {
//         response.status(403).send({ error: 'Authentication required' });
//     }
//     next();
// }

app.listen(3001);