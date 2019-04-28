// imports mysql connection
const conn = require('./mysql_connection')

// model JSON object
// each method takes a cb callback parameter for asynchronous programming
const model = {
    async getAll(){
        return await conn.query("SELECT * FROM MyApp_Goals");
    },

    async get(id){
        const data = await conn.query("SELECT * FROM MyApp_Goals WHERE UserId=?", id);
        if(!data){
            throw Error('Goal Not Found');
        }
        //return data[0];
        return data;
    },

    async add(input){
        const data = await conn.query("INSERT INTO MyApp_Goals (Category,Motion,Sets,Reps,UserId,Achieved,created_at) VALUES (?)",
            [[input.Category, input.Motion, input.Sets, input.Reps, input.UserId, input.Achieved, new Date()]],
        );
        return await model.get(data.insertId);
    },

    async met(input){
        return await conn.query("UPDATE MyApp_Goals SET Achieved=1 WHERE id=?", input.id);
    },

    async remove(input){
        const data = await conn.query(
            "DELETE FROM MyApp_Goals WHERE id=?", input.id);
        return await model.get(data.insertId);
    },

    getFromToken(token){
        return jwt.verify(token, JWT_SECRET);
    }
};

// returns above model object
module.exports = model;
