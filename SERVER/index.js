const express = require("express");
const path = require("path");

const users = require("./controllers/users");
const friends = require("./controllers/friends");
const activities = require("./controllers/activities");
const goals = require("./controllers/goals");
//add others controllers HERE for all tables

const app = express();
const port = 3000;

// MIDDLE WEAR
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(express.static(path.join(__dirname, "../SemesterProject")));

app.get('/', (req, res) => res.send('Hello from the other app'));
app.use("/users", users);
app.use("/friends", friends);
app.use("/activities", activities);
app.use("/goals", goals);


app.listen(port, () => console.log(`Example app http://localhost:${port}`));