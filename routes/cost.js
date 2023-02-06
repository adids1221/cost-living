const express = require("express");
const router = express.Router();
const Cost = require("../models/cost");
const Category = require("../models/category")
const { getUserById } = require('../utils/userUtils');
const { isValidDate, monthFormat } = require("../utils/reportUtils");

/* GET - cost page. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

/* POST - adding new cost item. */
router.post('/', async (req, res) => {
    const { description, year, month, day, category, sum, user_id } = req.body;
    const user = await getUserById(user_id);
    if (user) {
        if (isValidDate(month, year)) {
            try {
                let fixedMonth = monthFormat(month)
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
                const result = await cost.save();
                res.status(200).json({ success: true, result });
            } catch (e) {
                const errorKey = Object.keys(e.errors)[0].replace('.', ' ')
                console.log("my error: " + errorKey);
                res.status(401).json({ success: false, error: errorKey, message: e._message });;
            }
        } else {
            res.status(400).send({ error: "Invalid date parameters" });
        }
    } else {
        res.status(401).json({ success: false, message: 'Invalid user id' });
    }
});

module.exports = router;
