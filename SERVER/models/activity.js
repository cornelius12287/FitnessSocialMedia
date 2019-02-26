// imports mysql connection
const conn = require('./mysql_connection')

// model JSON object
// each method takes a cb callback parameter for asynchronous programming
const model = {
    getAll(cb){
        conn.query("SELECT * FROM MyApp_Activities", (err, data) => {
            cb(err, data);
        })
    },
    get(id, cb){},
    add(input, cb){
        conn.query("INSERT INTO MyApp_Activities (Type,Group,Motion,Sets,Reps,Current,created_at) VALUES (?)",
                    [[input.Type, input.Group, input.Motion, input.Sets, input.Reps, input.Current, new Date()]],
                    (err, data) => {
                        cb(err, data);
                    })
    }
};

// returns above model object
module.exports = model;
