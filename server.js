const express = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const app = express();

app.use(express.json());

const data = [
    {
        userName: "Kadir",
        title: "Data-1"
    },
    {
        userName: "Kadir",
        title: "Data-2"
    },
    {
        userName: "Ahmet",
        title: "Data-1"
    },
    {
        userName: "Mustafa",
        title: "Data-1"
    },
    {
        userName: "Mustafa",
        title: "Data-2"
    }
]

app.get("/data", authenticate, (req, res) => {
    res.json(data.filter(dt => dt.userName === req.user.userName));
})

function authenticate(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader.split(" ")[1];

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);

        req.user = user;
        next();
    })
}

app.listen(process.env.MAIN_SERVER_PORT);