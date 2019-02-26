// imports mysql connection
const conn = require('./mysql_connection')

// model JSON object
// each method takes a cb callback parameter for asynchronous programming
const model = {
    getAll(cb){
        conn.query("SELECT * FROM MyApp_Friends", (err, data) => {
            cb(err, data);
        })
    },
    get(id, cb){},
    add(input, cb){
        conn.query("INSERT INTO MyApp_Users (FirstName,LastName,FriendsSince,created_at) VALUES (?)",
                    [[input.FirstName, input.LastName, input.FriendsSince, new Date()]],
                    (err, data) => {
                        cb(err, data);
                    })
    }
};

// returns above model object
module.exports = model;
