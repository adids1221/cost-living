/*Developers Details:
* Adi Mordo - 313531634
* Stav Gallula - 205969868
*/

const express = require("express");
const router = express.Router();
const Cost = require("../models/cost");
const Category = require("../models/category");
const { getUserById } = require('../utils/userUtils');
const { isValidDate, monthFormat, currentDateParameters } = require("../utils/reportUtils");

/* POST - adding new cost item. */
router.post('/', async (req, res) => {
    // retrieve the data from the req.body
    const { description, category, sum, user_id } = req.body;
    // if the one of date paramaters wasn't sent by the user, the current date paramater will be set
    let { day, month, year } = req.body;

    // check if the user exists
    const user = await getUserById(user_id);

    //If the user did not send date parameters
    const currentDate = currentDateParameters(year, month, day);
    if (!year) {
        year = currentDate.year;
    }
    if (!month) {
        month = currentDate.month;
    }
    if (!day) {
        day = currentDate.day;
    }

    if (user) {
        // validate the date sent by the user
        if (isValidDate(day, month, year)) {
            try {
                // month format
                const fixedMonth = monthFormat(month);

                // create new Cost object
                const cost = new Cost({
                    description,
                    year,
                    month: fixedMonth,
                    day,
                    category: new Category({
                        name: category,
                    }),
                    sum,
                    user_id,
                });

                // save the new cost to the db
                const result = await cost.save();

                // response with 200 and the new saved cost
                return res.status(200).json({ success: true, result });
            } catch (e) {
                // if the user get any error during the addcost process this will response with the error came from mongo
                const errorKey = Object.keys(e.errors)[0].replace('.', ' ');
                return res.status(401).json({ success: false, error: errorKey, message: e._message });
            }
        } else {
            // if the date parameters aren't valid
            return res.status(400).send({ error: 'Invalid date parameters' });
        }
    } else {
        // if the user doesn't exist response with error
        return res.status(401).json({ success: false, message: 'Invalid user id' });
    }
});

module.exports = router;
