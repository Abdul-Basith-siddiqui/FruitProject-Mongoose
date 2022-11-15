const mongoose = require('mongoose'); //requiring the moongose

//initializing  moongose
mongoose.connect('mongodb://0.0.0.0:27017/fruitDB', { useNewUrlParser: true}); //here fruitDB is the database Server
// this .connect will connect to the server, if not there then Create the database server

mongoose.connection
  .once("open", () =>console.log("Connected"))
  .on("error", error=>{
    console.log("eeeeerror",error);
  });


//D: creating the scheme or rather structure(bluePrint) of the document
const fruitSchema = new mongoose.Schema ({
  name:{
    type:String,
    required:[true,"name is required"]  //here instead of true we can use 1 also
  },
  rating:{
    type:Number,   // validation --Built-in Validators , in mongodb native drivers we use assert
    min:1,
    max:10
  },
  review:String
});

//D:creating a model to generate the collections
const Fruit = mongoose.model("Fruit", fruitSchema); // here in model method we have written "Fruit", then, mongoose create a collection by name fruits (plural from)
                          // D:follows the structure of schema
//now we are ready to create our document which follows the structure of Schema
const fruit = new Fruit({

  rating:8,
  review:"pretty solid"
});

fruit.save(); //this cause save method in mongoose to save the fruit document into a fruits collection insides our fruitDB.

const sencondSchema = new mongoose.Schema({
  name:String,
  age:Number
});

const persons = mongoose.model("person", sencondSchema);

const person= new persons({
  name:"radish",
  age:33
});

//person.save();


const orange= new Fruit({
  name:"orange",
  rating:8,
  review:"cool"
});

const kiwi= new Fruit({
  name:"kiwi",
  rating:9,
  review:" yo  cool"
});

const litchi= new Fruit({
  name:"litchi",
  rating:10,
  review:"yes cool"
});

// Fruit.insertMany([orange,litchi,kiwi], function(err){
//   if(err)
//   console.log("error");
//   else
//   console.log("working");
// });


/// reading
Fruit.find(function(err,fruits){    //model/collection.find method if fond then console.log fruits or err
 if(err){
   console.log(err);
 }else{
   console.log(fruits);
   mongoose.connection.close();      // closing the connection
 }
});


Fruit.find(function(err,fruits){    //model/collection.find method if fond then console.log fruits or err
 fruits.map(function(fruit){         //just printing the names of the fruits for the array of objects

   console.log(fruit.name);
 });
});
