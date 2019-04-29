const conn = require('./mysql_connection');

const model = {
    async getAll(){
        return await conn.query("SELECT * FROM MyApp_Friends");
    },

    async get(id){
        const data = await conn.query("SELECT * FROM MyApp_Friends WHERE userId=?", id);
        if(!data){
            throw Error('Friend Not Found');
        }
        return data;
    },

    async add(input){
        const data = await conn.query("SELECT * FROM MyApp_Users WHERE (FirstName,LastName)=(?)",
        [[input.FriendFirst, input.FriendLast]]);
        if(!data){
            throw Error('User not found');
        }else{
            const u = data[0].id;
            const data2 = await conn.query("INSERT IGNORE INTO MyApp_Friends (FriendFirst,FriendLast,friendId,userId,created_at) VALUES (?)",
            [[input.FriendFirst, input.FriendLast, u, input.UserId, new Date()]]);
            return await model.get(data2.insertId);
        }
    },

    async set(input){
        const data = await conn.query("SELECT * FROM MyApp_Users WHERE id=?", input.friendId);
        //const n = data[0].FirstName;
        //const i = data[0].id;
        //return {name: n, id: i};
        const friend = {...data[0], name: data[0].FirstName, id: data[0].id};
        return {friend};
    },

    getFromToken(token){
        return jwt.verify(token, JWT_SECRET);
    }
};

module.exports = model;
