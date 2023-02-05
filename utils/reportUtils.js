const Cost = require("../models/cost");

const categories = ['Home', 'Health', 'Housing', 'Sport', 'Education', 'Transportation', 'Other'];

const isValidDate = (month, year) => {
    return month > 0 && month <= 12 && year >= 1900;
};

const getReport = async (year, month, user_id) => {
    try {
        // Find costs documents in the database based on user_id, year, and month
        const costs = await Cost.find({
            userId: user_id,
            year: year,
            month: month
        });
        // If no costs were found, return a message to the client
        if (!costs.length) {
            return res.send({ message: "No costs found for specified user_id and month/year" });
        }

        // Create a report object by grouping the costs by category
        const report = categories.reduce((result, category) => {
            result[category] = costs
                .filter(cost => cost.category.name === category)
                .map(cost => ({
                    day: cost.day,
                    description: cost.description,
                    sum: cost.sum
                }));
            return result;
        }, {});
        if (report) {
            return report;
        }
        return undefined;
    }
    catch (err) {
        // If there is an error while fetching the costs, return an error
        return undefined
    }
};

module.exports = {
    isValidDate,
    getReport
};