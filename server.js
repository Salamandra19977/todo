import express from "express"
import mysql from "mysql2/promise"
import dotenv from "dotenv"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
dotenv.config()

const app = express()
const port = 3000

app.use(express.json())

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); 
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS'); 
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization'); 
    next();
})

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
})

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.post("/register", async (req, res) => {
    const {login, email, password} = req.body
    try {
        let result = await pool.query(
            `SELECT * FROM Users WHERE login = ? OR email = ?`,
            [login, email]
        )

        if (result[0].length > 0) {
            return res.status(400).send({
                error: "Error registering user."
            })
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        await pool.query(
            "INSERT INTO Users (login, email, password) VALUES (?, ?, ?)",
            [login, email, hashedPassword]
        )
        res.status(201).send({ message: "User registered successfully!"})
    } catch (error) {
        res.status(500).send({error: "Error registering user."})
    }
})

app.post("/login", async (req, res) => {
    const {email, password} = req.body
    try {
        const [users] = await pool.query(
            "SELECT * FROM Users WHERE email = ?",
            [email]
        )

        if (users.length === 0) {
            return res
                .status(401)
                .send({ error: "Invalid email or password."})
        }

        const user = users[0]

        const isValidPassword = await bcrypt.compare(password, user.password)
        if (!isValidPassword) {
             return res
                .status(401)
                .send({ error: "Invalid email or password."})
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
            expiresIn: "1h"
        })

        res.status(200).send({token})
    } catch (error) {
        res.status(500).send({error: "Error looging in."})
    }
})

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers.authorization
    const token = authHeader && authHeader.split(" ")[1]

    if (!token) {
        return res.status(403).send({ error: "Access denied."})
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).send({ error: "Invalid token."})
        }

        req.user = user
        next()
    })
}

app.get("/protected", authenticateToken, (req, res)=> {
    res.send({ message: `Hello, user ${req.user.id}`})
})

app.post("/add", authenticateToken, async (req, res) => {
    const data = req.body
    data.user_id = req.user.id
    await pool.query("INSERT INTO Events SET ?", data)
    let result = await pool.query("SELECT * FROM Events WHERE user_id = ?", [req.user.id])
    res.send(result[0])
})

app.post("/events", authenticateToken, async (req, res) => {
    let result = await pool.query("SELECT * FROM Events WHERE user_id = ?", [req.user.id])
    res.send(result[0])
    if (result[0].length === 0) {
        return res.status(404).send({error: "No events found"})
    }
    res.send(result[0])
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
