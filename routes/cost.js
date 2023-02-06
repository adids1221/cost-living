const express = require("express");
const router = express.Router();
const Cost = require("../models/cost");
const Category = require("../models/category")
const { getUserById } = require('../utils/userUtils');
const { isValidDate, monthFormat } = require("../utils/reportUtils");

/* POST - adding new cost item. */
router.post('/', async (req, res) => {
    // retrive the data from the req.body
    const { description, year, month, day, category, sum, user_id } = req.body;

    // check if the user exists
    const user = await getUserById(user_id);

    if (user) {
        // validate the date sent by the user
        if (isValidDate(month, year)) {
            try {
                // month format
                const fixedMonth = monthFormat(month)

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
                    userId: user_id,
                });

                // save the new cost to the db
                const result = await cost.save();

                // response with 200 and the new saved cost
                res.status(200).json({ success: true, result });
            } catch (e) {
                // if the user get any error during the addcost procces this will response with the error came from mongo
                const errorKey = Object.keys(e.errors)[0].replace('.', ' ')
                res.status(401).json({ success: false, error: errorKey, message: e._message });;
            }
        } else {
            // if the date parameters aren't valid
            res.status(400).send({ error: "Invalid date parameters" });
        }
    } else {
        // if the user doesn't exists response with error
        res.status(401).json({ success: false, message: 'Invalid user id' });
    }
});

module.exports = router;
