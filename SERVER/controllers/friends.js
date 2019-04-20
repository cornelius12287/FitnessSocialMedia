// one controller file for each table in database

const express = require('express');
const friend = require('../models/friend');

const app = express.Router();

// get action/method/request
// this method used instead of sequelize from video
// controller does not know about sequel; model does not know about express
app.get("/", async (req, res, next) => {
    friend.getAll()
    .then(x=> res.send(x))
    .catch(next)
});

app.get("/:id", (req, res, next) => {
    friend.get(req.params.id)
    .then(x=> res.send(x))
    .catch(next)
});

app.post("/", (req, res, next) => {
    friend.add(req.body)
    .then(x=> res.send(x))
    .catch(next)
});

// return value
module.exports = app;