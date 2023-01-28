const User = require('../models/user');
const Cost = require('../models/cost');
const Category = require('../models/category');

const getUserById = async (userId) => {
    try {
        const user = await User.findOne({ Id: userId }).lean().orFail();
        return user;
    } catch (error) {
        console.log('ERROR - cannot find user!');
        return null;
    }
};

const updateUserCost = async (userId, requestParams) => {
    try {
        const user = await User.findOneAndUpdate({ id: userId }, [
            {
                $set: {
                    'cost_livings.records': {
                        $concatArrays: [
                            '$cost_livings.records',
                            [
                                new Cost({
                                    name: requestParams.name,
                                    category: new Category({
                                        name: requestParams.category,
                                    }),
                                    date: requestParams.date,
                                    price: requestParams.price,
                                }),
                            ],
                        ],
                    },
                    'cost_livings.total_sum': {
                        $sum: ['$cost_livings.total_sum', parseFloat(requestParams.price)],
                    },
                },
            },
        ]).exec();
        return user;
    } catch (error) {
        console.log('ERROR');
        return null;
    }
};

module.exports = {
    updateUserCost,
    getUserById,
};
