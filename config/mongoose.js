/*Developers Details:
* Adi Mordo - 313531634
* Stav Gallula - 205969868
*/

const mongoose = require('mongoose');
const User = require("../models/user");

// Create a new User instance
const user = new User({
    id: '123123',
    first_name: 'moshe',
    last_name: 'israeli',
    birthday: new Date('January 10, 1990')
});

async function createUserIfNotExist(user) {
    // Check if a User with the same id already exists
    const existUser = await User.findOne({ id: user.id })
    // Create the new User if the user doesn't already exist
    if (existUser === null) {
        const newUser = await User.create(user);
        return newUser;
    }
}

//mongo connection
const connectDB = async () => {
    try {
        const url = 'mongodb+srv://cost-living:uSGJQ4P4Aa1PbDo7@cluster0.ktvsn8w.mongodb.net/CostLiving?retryWrites=true&w=majority';
        mongoose.set("strictQuery", false);
        const conn = await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })

        // Call the createUserIfNotExist function
        createUserIfNotExist(user);
    }
    catch (err) {
        console.error(err);
        process.exit(1);
    }
}

module.exports = connectDB;