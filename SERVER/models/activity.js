// imports mysql connection
const conn = require('./mysql_connection')

// model JSON object
// each method takes a cb callback parameter for asynchronous programming
const model = {
    async getAll(){
        return await conn.query("SELECT * FROM MyApp_Activities");
    },

    async get(id){
        const data = await conn.query("SELECT * FROM MyApp_Activities WHERE UserId=?", id);
        if(!data){
            throw Error('Activity Not Found');
        }
        //return data[0];
        return data;
    },

    async add(input){
        const data = await conn.query(
            "INSERT INTO MyApp_Activities (Category,Motion,Sets,Reps,UserId,created_at) VALUES (?)", 
            [[input.Category, input.Motion, input.Sets, input.Reps, input.UserId, new Date()]] );
        return await model.get(data.insertId);
    },

    async remove(input){
        const data = await conn.query(
            "DELETE FROM MyApp_Activities WHERE id=?", input.id);
        return await model.get(data.insertId);
    },

    getFromToken(token){
        return jwt.verify(token, JWT_SECRET);
    }
};

// returns above model object
module.exports = model;
