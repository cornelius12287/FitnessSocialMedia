// imports mysql connection
const conn = require('./mysql_connection')

// model JSON object
// each method takes a cb callback parameter for asynchronous programming
const model = {
    async getAll(){
        return await conn.query("SELECT * FROM MyApp_Goals");
    },

    async get(id){
        const data = await conn.query("SELECT * FROM MyApp_Goals WHERE id=?", id);
        if(!data){
            throw Error('Goal Not Found');
        }
        return data[0];
    },

    async add(input){
        const data = await conn.query("INSERT INTO MyApp_Goals (Type,Motion,Sets,Reps,Achieved,created_at) VALUES (?)",
            [[input.Type, input.Motion, input.Sets, input.Reps, input.Achieved, new Date()]],
        );
        return await model.get(data.insertId);
    },

    async met(input){
        return await conn.query("DELETE from MyApp_Goals where id=?", input);
    },

    getFromToken(token){
        return jwt.verify(token, JWT_SECRET);
    }
};

// returns above model object
module.exports = model;
