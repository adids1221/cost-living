const mongoose = require('mongoose');

//Atlas connection
const connectDB = async () => {
    try {
        const url = "mongodb+srv://cost-living:uSGJQ4P4Aa1PbDo7@cluster0.ktvsn8w.mongodb.net/CostLiving?retryWrites=true&w=majority";
        mongoose.set("strictQuery", false);
        const conn = await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log("connected to db")
    }
    catch (err) {
        console.error(err)
        process.exit(1)
    }
}

module.exports = connectDB;