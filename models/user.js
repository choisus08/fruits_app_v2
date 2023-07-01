const mongoose = require('./connection');


const {Schema, model} = mongoose;

// same as model/fruit.js line 4; DESTRUCTURING below
const userSchema = new Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true}, 
});

const User = model('user', userSchema);
module.exports = User;