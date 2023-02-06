const User = require('../models/user');

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
