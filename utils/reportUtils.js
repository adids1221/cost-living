const Cost = require("../models/cost");

const categories = ["food", "health", "housing", "sport", "education", "transportation", "other",];

// Function to determine if the date the user sent is valid
const isValidDate = (month, year) => {
    return Number(month) > 0 && Number(month) <= 12 && Number(year) >= 1900;
};

// Month format add 0 at the beginning of the month, keep all the dates the same
const monthFormat = (month) => {
    const monthPrefix = '0';
    return (typeof month !== 'string' && month < 10 || month.length < 2) ? monthPrefix.concat('', month) : month;
}

const getReport = async (year, month, user_id) => {

    try {
        // Find costs documents in the database based on user_id, year, and month
        const costs = await Cost.find({
            userId: user_id,
            year,
            month
        });
        // If no costs were found, return a message to the client
        if (!costs.length) {
            res.send({ message: "No costs found for specified user_id and month/year" });
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
        // If there is an error while fetching the costs, return an undefined | error handling is in the report.js file
        return undefined;
    }
};

module.exports = {
    isValidDate,
    monthFormat,
    getReport
};
