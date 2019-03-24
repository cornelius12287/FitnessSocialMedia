// one controller file for each table in database

const express = require('express');
const comment = require('../models/comment');
//const conn = require('../models/mysql_connection');

const app = express.Router();

// get action/method/request
// this method used instead of sequelize from video
// controller does not know about sequel; model does not know about express
app.get("/", (req, res) => {
    comment.getAll((err, data) => {
        if(err) throw err;
        res.send(data);
    });
});

app.get("/:id", (req, res) => {

    comment.get(req.params.id, (err, data) => {
        if(err) throw err;
        res.send(data);
    });
});

//user.add({FirstName: "Steve", LastName: "Irwin"}, (err, data) => {
app.post("/", (req, res) => {
    console.log(req.body);
    comment.add(req.body, (err, data) => {
        if(err) throw err;
        res.send(data);
    });
});

// return value
module.exports = app;