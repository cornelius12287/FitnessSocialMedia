// one controller file for each table in database

const express = require('express');
const update = require('../models/update');

const app = express.Router();

// get action/method/request
// this method used instead of sequelize from video
// controller does not know about sequel; model does not know about express
app.get("/", (req, res) => {
    update.getAll((err, data) => {
        if(err) throw err;
        res.send(data);
    });
});

app.get("/:id", (req, res) => {

    update.get(req.params.id, (err, data) => {
        if(err) throw err;
        res.send(data);
    });
});

//activity.add({Type: "Weights", Group: "Arms", Motion: "BicepCurls", Sets: "5", Reps: "5", Current: "Y"}, (err, data) => {
app.post("/", (req, res) => {
    console.log(req.body);
    update.add(req.body, (err, data) => {
        if(err) throw err;
        res.send(data);
    });
});


// return value
module.exports = app;