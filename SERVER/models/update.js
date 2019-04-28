// imports mysql connection
const conn = require('./mysql_connection')

// model JSON object
// each method takes a cb callback parameter for asynchronous programming
const model = {
    async getAll(){
        return await conn.query("SELECT * FROM MyApp_Updates");
    },

    async get(id){
        const data = await conn.query("SELECT * FROM MyApp_Updates WHERE UserId=?", id);
        if(!data){
            throw Error('Update Not Found');
        }
        //return data[0];
        return data;
    },

    async add(input){
        const data = await conn.query("INSERT INTO MyApp_Updates (UpdateText,FirstName,LastName,UserId,created_at) VALUES (?)",
            [[input.UpdateText, input.FirstName, input.LastName, input.UserId, new Date()]],
        );
        return await model.get(data.insertId);
    },

    getFromToken(token){
        return jwt.verify(token, JWT_SECRET);
    }
};

// returns above model object
module.exports = model;
