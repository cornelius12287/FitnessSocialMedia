// one controller file for each table in database

const express = require('express');
const goal = require('../models/goal');

const app = express.Router();

// get action/method/request
// this method used instead of sequelize from video
// controller does not know about sequel; model does not know about express
app.get("/", (req, res) => {
    goal.getAll((err, data) => {
        if(err) throw err;
        res.send(data);
    });
});

app.post("/", (req, res) => {
    goal.add({Type: "Weights", Group: "Arms", Motion: "BicepCurls", Sets: "5", Reps: "5", Achieved: "Y"}, (err, data) => {
        if(err) throw err;
        res.send(data);
    });
});

// return value
module.exports = app;