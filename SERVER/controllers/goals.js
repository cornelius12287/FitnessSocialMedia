// one controller file for each table in database

const express = require('express');
const goal = require('../models/goal');

const app = express.Router();

// get action/method/request
// this method used instead of sequelize from video
// controller does not know about sequel; model does not know about express
app.get("/", async (req, res, next) => {
    goal.getAll()
    .then(x=> res.send(x))
    .catch(next)
});

app.get("/:id", (req, res, next) => {
    goal.get(req.params.id)
    .then(x=> res.send(x))
    .catch(next)
});

app.post("/", (req, res, next) => {
    goal.add(req.body)
    .then(x=> res.send(x))
    .catch(next)
});

app.post("/met", (req, res, next) => {
    goal.met(req.body)
    .then(x=> res.send(x))
    .catch(next)
});

// return value
module.exports = app;