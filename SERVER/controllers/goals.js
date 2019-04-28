const express = require('express');
const goal = require('../models/goal');

const app = express.Router();

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

app.post("/remove", (req, res, next) => {
    goal.remove(req.body)
    .then(x=> res.send(x))
    .catch(next)
});

// return value
module.exports = app;