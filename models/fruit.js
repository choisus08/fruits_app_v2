const mongoose = require('./connection');

// schema that will go into model
const fruitSchema = new mongoose.Schema({
    name: String,
    color: String,
    readyToEat: Boolean,
    username: String
});

// fruit MODEL
const Fruit = mongoose.model('fruit', fruitSchema);

module.exports = Fruit;


/* Version 2:
const mongoose = require('./connection');


const fruitSchema = new mongoose.Schema({
    name: String,
    color: String, 
    readyToEat: Boolean
});


const Fruit = mongoose.model('fruit', fruitSchema);


module.exports = Fruit; */



/* Version 3:
const { Schema, model } = require('./connection');

const fruitSchema = new Schema({
    name: String,
    color: String, 
    readyToEat: Boolean
});

const Fruit = model('fruit', fruitSchema);


module.exports = Fruit; */