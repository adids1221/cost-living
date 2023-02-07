const User = require('../models/user');

// Check if the user exists, if yes return the user else will handle the error in the relevant place
const getUserById = async (id) => {
    try {
        const user = await User.findOne({ id }).lean().orFail();
        return user;
    } catch (error) {
        console.log('ERROR - cannot find user! ', error);
        return null;
    }
};

module.exports = {
    getUserById,
};
