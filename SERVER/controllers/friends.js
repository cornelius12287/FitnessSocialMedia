// one controller file for each table in database

const express = require('express');
const friends = require('../models/friend');

const app = express.Router();

// get action/method/request
// this method used instead of sequelize from video
// controller does not know about sequel; model does not know about express
app.get("/", (req, res) => {
    user.getAll((err, data) => {
        if(err) throw err;
        res.send(data);
    });
});

app.post("/", (req, res) => {
    user.add({FirstName: "Arnold", LastName: "Schwarzenegger", FriendsSince: "2-26-19"}, (err, data) => {
        if(err) throw err;
        res.send(data);
    });
});

// return value
module.exports = app;