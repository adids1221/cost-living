/*Developers Details:
* Adi Mordo - 313531634
* Stav Gallula - 205969868
*/

const Cost = require("../models/cost");

const categories = ['food', 'health', 'housing', 'sport', 'education', 'transportation', 'other'];

// Function to determine if the date the user sent is valid
const isValidDate = (day, month, year) => dayValidator(day) && monthValidator(month) && yearValidator(year);

// Function to determine if the date the user sent to generate report is valid
const reportDateValidator = (month, year) => monthValidator(month) && yearValidator(year);

// Validate day
const dayValidator = (day) => Number(day) > 0 && Number(day) <= 31;

// Validate month
const monthValidator = (month) => Number(month) > 0 && Number(month) <= 12;

// Validate year
const yearValidator = (year) => Number(year) >= 1900;

// If the user didn't sent one of the date parameters
const currentDateParameters = (year, month, day) => {
    const date = new Date();
    if (!year) {
        year = date.getFullYear();
    }
    if (!month) {
        month = date.getMonth() + 1;
    }
    if (!day) {
        day = date.getDate();
    }

    return { year, month, day };
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
            user_id,
            year,
            month
        });

        // If no costs were found, return an undefined | message sent to the user from the report.js file
        if (!costs.length) {
            return undefined;
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
    }
    catch (err) {
        // If there is an error while fetching the costs, return an undefined | message sent to the user from the report.js file
        console.error(err)
    }
};

module.exports = {
    isValidDate,
    reportDateValidator,
    monthFormat,
    currentDateParameters,
    getReport
};
