const mongoose = require('mongoose');

//Atlas connection
const connectDB = async ()=>{
    try {
        const url = process.env.DB_CONNECT;
        mongoose.set("strictQuery", false);
        const conn = await mongoose.connect(url,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log("connected to db")
    }
    catch (err){
        console.error(err)
        process.exit(1)
    }
}

module.exports = connectDB;