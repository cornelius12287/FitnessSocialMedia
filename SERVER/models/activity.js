// imports mysql connection
const conn = require('./mysql_connection')

// model JSON object
// each method takes a cb callback parameter for asynchronous programming
const model = {
    async getAll(){
        return await conn.query("SELECT * FROM MyApp_Activities");
    },

    async get(id){
        const data = await conn.query("SELECT * FROM MyApp_Activities WHERE id=?", id);
        if(!data){
            throw Error('Activity Not Found');
        }
        return data[0];
    },

    async add(input){
        const data = await conn.query("INSERT INTO MyApp_Activities (Type,Motion,Sets,Reps,Current,created_at) VALUES (?)",
                    [[input.Type, input.Motion, input.Sets, input.Reps, input.Current, new Date()]]
        );
        return await model.get(data.insertId);
    },

    getFromToken(token){
        return jwt.verify(token, JWT_SECRET);
    }
};

// returns above model object
module.exports = model;
