const mongoose = require('mongoose');
const mongoURI = "mongodb://localhost:27017/stormfactor?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false";
mongoose.set('strictQuery', true);

const connectToMongo = () =>{
    mongoose.connect(mongoURI, ()=>{
        console.log("Connected to mongo succesfully");
    });
}

module.exports = connectToMongo;