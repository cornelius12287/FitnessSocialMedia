// imports mysql connection
const conn = require('./mysql_connection')

// model JSON object
// each method takes a cb callback parameter for asynchronous programming
const model = {
    async getAll(){
        return await conn.query("SELECT * FROM MyApp_Comments");
    },

    async get(id){
        const data = await conn.query("SELECT * FROM MyApp_Comments WHERE id=?", id);
        if(!data){
            throw Error('Comment Not Found');
        }
        return data[0];
    },

    async add(input){
        if(!input.Password){
            throw Error('Password Required');
        }
        if(input.Password.length < 8){
            throw Error('A Longer Password is Required');
        }
        const data = await conn.query("INSERT INTO MyApp_Comments (PageID,PosterID,CommentID,CommentText,created_at) VALUES (?)",
            [[input.PageID, input.PosterID, input.CommentID, input.CommentText, new Date()]],
        );
        return await model.get(data.insertId);
    },

    getFromToken(token){
        return jwt.verify(token, JWT_SECRET);
    }
};

// returns above model object
module.exports = model;
