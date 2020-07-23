if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const passport = require('passport');
const session = require('express-session');

let activities = [{
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
}];

const initializePassport = require('./passport-config');
initializePassport(passport, getUserByName, getUserById);

app.use(express.json());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());

// db connection

const mysql = require("mysql2");

const pool = mysql.createPool({
    connectionLimit: 5,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});
const promisePool = pool.promise();

// user endpoints

app.get('/user', async (request, response) => {
    if (request.user) {
        const userId = request.user.id;
        const [rows] = await promisePool.query("SELECT id, name FROM users WHERE id = ?", [userId]);
        if (!rows.length) {
            response.json({ success: false, message: `No user with id=${userId}` });
        }
        response.json(rows[0]);
    } else {
        response.json(null);
    }
});

app.post('/user/login', passport.authenticate('local'), async (request, response) => {
    await promisePool.query("UPDATE users SET last_login_on = NOW() WHERE id = ?", [request.user.id]);
    response.json({
        isLoggedIn: true,
        user: { id: request.user.id, name: request.user.name },
    });
});

app.post('/user/register', async (request, response) => {
    const hashedPassword = await bcrypt.hash(request.body.password, 10);

    const [rows] = await promisePool.query("SELECT COUNT(*) AS count FROM users WHERE name = ?", [request.body.name]);
    if (rows[0].count > 0) {
        response.json({ success: false, message: `User with name ${request.body.name} already exists` });
        return;
    }

    await promisePool.query("INSERT INTO users(name, password, registered_on, last_login_on) VALUES(?, ?, NOW(), NOW())", [request.body.name, hashedPassword]);
    response.json({ success: true });
});

app.post('/user/logout', (request, response) => {
    request.logOut();
    response.json({ success: true });
});

app.post('/user/password-change', checkAuthenticated, async (request, response) => {
    const isOldPasswordCorrect = await bcrypt.compare(request.body.password, request.user.password);
    if (!isOldPasswordCorrect) {
        response.json({ success: false, message: 'Old password is incorrect' });
        return;
    }

    const hashedPassword = await bcrypt.hash(request.body.newPassword, 10);
    await promisePool.query("UPDATE users SET password = ? WHERE id = ?", [hashedPassword, request.user.id]);
    response.json({ success: true });
});

// activities endpoints

app.get('/activities', checkAuthenticated, async (request, response) => {
    const [rows] = await promisePool.query("SELECT activities FROM users WHERE id = ?", [request.user.id]);
    if (!rows.length) {
        response.json({ success: false, message: `No users with id=${request.user.id}` });
        return;
    }
    response.json(rows[0]);
});

app.post('/activities', checkAuthenticated, (request, response) => {
    pool.query("UPDATE users SET activities = ? WHERE id = ?", [JSON.stringify(request.body), request.user.id], (error, data) => {
        response.json({
            success: true,
        });
    });
});

// activity log endpoints

app.get('/activity-log', (request, response) => {
    pool.query("SELECT date, content FROM activity_log WHERE user_id = ?", [request.user.id], (error, data) => {
        
    });

    response.json({
        log: [],
    });
});

app.post('/activity-log', (request, response) => {
    pool.query("", [], (error, data) => {

    });

    response.json({
        success: true,
    });
});

app.delete('/activity-log/last', (request, response) => {
    pool.query("", [], (error, data) => {

    });

    response.json({
        success: true,
    });
});

function checkAuthenticated(request, response, next) {
    if (!request.isAuthenticated()) {
        response.status(403).send({ error: 'Authentication required' });
    }
    next();
}

async function getUserByName(name) {
    const [rows] = await promisePool.query("SELECT id, name, password FROM users WHERE name = ?", [name]);
    if (!rows.length) {
        return null;
    }
    return rows[0];
}

async function getUserById(userId) {
    const [rows] = await promisePool.query("SELECT id, name, password FROM users WHERE id = ?", [userId]);
    if (!rows.length) {
        return null;
    }
    return rows[0];
}

app.listen(3001);