// one controller file for each table in database

const express = require('express');
const like = require('../models/like');
//const conn = require('../models/mysql_connection');

const app = express.Router();

// get action/method/request
// this method used instead of sequelize from video
// controller does not know about sequel; model does not know about express
app.get("/", (req, res) => {
    like.getAll((err, data) => {
        if(err) throw err;
        res.send(data);
    });
});

app.get("/:id", (req, res) => {

    like.get(req.params.id, (err, data) => {
        if(err) throw err;
        res.send(data);
    });
});

//user.add({FirstName: "Steve", LastName: "Irwin"}, (err, data) => {
app.post("/", (req, res) => {
    console.log(req.body);
    like.add(req.body, (err, data) => {
        if(err) throw err;
        res.send(data);
    });
});

// return value
module.exports = app;