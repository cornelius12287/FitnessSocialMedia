const express = require("express");
const users = require("./controllers/users");
const friends = require("./controllers/friends");
const activities = require("./controllers/activities");
const goals = require("./controllers/goals");
//add others controllers HERE for all tables

const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('Hello from the other app'));
app.use("/users", users);
app.use("/friends", friends);
app.use("/activities", activities);
app.use("/goals", goals);


app.listen(port, () => console.log(`Example app http://localhost:${port}`));