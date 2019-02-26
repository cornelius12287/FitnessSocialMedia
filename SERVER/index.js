const express = require("express");
const users = require("./controllers/users");
//add others controllers HERE for all tables

const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('Hello from the other app'));
app.use("/users", users);

app.listen(port, () => console.log(`Example app http://localhost:${port}`));