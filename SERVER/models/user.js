// imports mysql connection
const conn = require('./mysql_connection')
const bcrypt = require('bcryptjs');
const SALT_ROUNDS = 8;

const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'some long string here';

const axios = require('axios');

// model JSON object
// each method takes a cb callback parameter for asynchronous programming
const model = {
    async getAll(){
        return await conn.query("SELECT * FROM MyApp_Users");
    },

    async get(id){
        const data = await conn.query("SELECT * FROM MyApp_Users WHERE id=?", id);
        if(!data){
            throw Error("User Not Found");
        }
        return data[0];
    },

    async add(input){
        if(!input.Password){
            throw Error('Password Required');
        }
        if(input.Password.length < 8){
            throw Error('A Longer Password Is Required');
        }
        const data2 = await conn.query(`SELECT * FROM MyApp_Users WHERE Email=?`, [[input.email]]);
        if(data2.length != 0){
            throw Error('A user already exists for that email');
        }
        const hashedPassword = await bcrypt.hash(input.Password, SALT_ROUNDS);
        const data = await conn.query(
            "INSERT INTO MyApp_Users (FirstName,LastName,Birthday,Email,Password,created_at) VALUES (?)",
            [[input.FirstName, input.LastName, input.Birthday, input.Email, hashedPassword, new Date()]]);
        return await model.get(data.insertId);
    },

    getFromToken(token){
        return jwt.verify(token, JWT_SECRET);
    },

    //REGULAR LOGIN
    async login(email, password){
        if(!password){
            throw Error('Password Required for Login');
        }
        const data = await conn.query(`SELECT * FROM MyApp_Users WHERE Email=?`, [[email]]);
        if(data.length == 0){
            throw Error('User Not Found');
        }
        const x = await bcrypt.compare(password, data[0].Password);
        const n = data[0].FirstName;
        const i = data[0].id;
        if(x){
            const user = {...data[0], Password: null, name: n, UserId: i};
            return {user, token: jwt.sign(user, JWT_SECRET)};
        }else{
            throw Error('Wrong Password');
        }
    },

    //FACEBOOK LOGIN
    async facebookLogin(token){
        const fbme = await axios.get(`https://graph.facebook.com/me?fields=id,name,email&access_token=${token}`);
        console.log({fbme});
        const data = await conn.query(`SELECT * FROM MyApp_Users P Join
            MyApp_ContactMethods CM On CM.UserId = P.id
            WHERE CM.Type='Facebook' AND CM.Value=?`, fbme.data.id);
        if (data.length == 0){
            //insert statement that creates a new user with data from fbme, instead of error below
            throw Error('User Not Found');
        }
        const user = {...data[0], Password: null};
        return {user, token: jwt.sign(user, JWT_SECRET), oAuthUser: fbMe.data };
    },

    async changePassword(email, oldPassword, newPassword){
        const data = await conn.query(`SELECT * FROM MyApp_Users P Join MyApp_ContactMethods CM On CM.UserId = P.id WHERE CM.Value=?`, email);
        if(data.length == 0){
            throw Error('User Not Found')
        }
        if(data[0].Password == "" || await bcrypt.compare(oldPassword, data[0].password)){
            const hashedPassword = await bcrypt.hash(newPassword, SALT_ROUNDS);
            await conn.query(`Update MyApp_Users P Set ? WHERE P.id=?`, [ {Password: hashedPassword}, data[0].id]);
            return { status: "success", message: "Password Successfully Changed" };
        }else{
            throw Error('Wrong Password');
        }
    }
};

// returns above model object
module.exports = model;
