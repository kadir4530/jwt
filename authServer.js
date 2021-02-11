const express = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const app = express();

app.use(express.json());

// Login
// Logout
// AccessToken
// RefreshToken

let refreshTokens = [];


app.post("/login", (req, res) => {
    const userName = req.body.userName;
    const user = { userName }

    const accessToken = generateAccessToken(user);
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
    refreshTokens.push(refreshToken);

    return res.json({ accessToken, refreshToken })
})

app.post("/token", (req, res) => {
    const token = req.body.token;
    if (token == null) return res.sendStatus(401);
    if (!refreshTokens.includes(token)) return sendStatus(403)

    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);

        const accessToken = generateAccessToken({ userName = user.userName });
        return res.json({ accessToken })
    })
})

app.delete("/logout", (req, res) => {
    refreshTokens = refreshTokens.filter(token => token !== req.body.token);
})

function generateAccessToken(user) {
    jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
}

app.listen(process.env.AUTH_SERVER_PORT);