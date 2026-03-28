import express from 'express';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

dotenv.config();

const app = express();
const port = 3000;

app.use(express.json());

const db = await open({
    filename: './database.db',
    driver: sqlite3.Database
});

await db.exec(`
CREATE TABLE IF NOT EXISTS Users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    login TEXT NOT NULL UNIQUE,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL
);
`);

await db.exec(`
CREATE TABLE IF NOT EXISTS Events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    title TEXT NOT NULL,
    date TEXT NOT NULL,
    time TEXT NOT NULL,
    color TEXT NOT NULL,
    FOREIGN KEY(user_id) REFERENCES Users(id) ON DELETE CASCADE
);
`);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.post("/register", async (req, res) => {
    const { login, email, password } = req.body;

    if (!login || !email || !password) {
        return res.status(400).send({ error: "All fields are required." });
    }

    try {
        const existingUser = await db.get(
            `SELECT * FROM Users WHERE login = ? OR email = ?`,
            [login, email]
        );

        if (existingUser) {
            return res.status(400).send({ error: "Error registering user." });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        await db.run(
            "INSERT INTO Users (login, email, password) VALUES (?, ?, ?)",
            [login, email, hashedPassword]
        );

        res.status(201).send({ message: "User registered successfully!" });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Error registering user." });
    }
});

app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await db.get(
            "SELECT * FROM Users WHERE email = ?",
            [email]
        );

        if (!user) {
            return res.status(401).send({ error: "Invalid email or password." });
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(401).send({ error: "Invalid email or password." });
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
            expiresIn: "1h"
        });

        res.status(200).send({ token });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Error logging in." });
    }
});

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) return res.status(403).send({ error: "Access denied." });

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).send({ error: "Invalid token." });
        req.user = user;
        next();
    });
};

app.post("/add", authenticateToken, async (req, res) => {
    const { title, date } = req.body;
    user_id = req.user.id
    await db.run("INSERT INTO Events (user_id, title, date) VALUES (?, ?, ?)", [user_id, title, date])
    let result = await db.get("SELECT * FROM Events WHERE user_id = ?", [req.user.id])
    res.send(result[0])
})

app.post("/events", authenticateToken, async (req, res) => {
    let result = await db.get("SELECT * FROM Events WHERE user_id = ?", [req.user.id])
    res.send(result[0])
    if (result[0].length === 0) {
        return res.status(404).send({error: "No events found"})
    }
    res.send(result[0])
})


app.get("/protected", authenticateToken, (req, res) => {
    res.send({ message: `Hello, user ${req.user.id}!` });
});

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});