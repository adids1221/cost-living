const express = require("express");
const router = express.Router();
const Cost = require("../models/cost");
const Category = require("../models/category")
const { getUserById } = require('../utils/userUtils');

/* GET cost page. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

router.post('/', async (req, res) => {
    const user = await getUserById(req.body.id);
    if (user) {
        const { description, year, month, day, category, sum, id } = req.body;
        try {
            const cost = new Cost({
                description,
                year,
                month,
                day,
                category: new Category({
                    name: category,
                }),
                sum,
                userId: id,
            });
            const result = await cost.save();
            res.status(200).json({ success: true, result });
        } catch (e) {
            const errorKey = Object.keys(e.errors)[0].replace('.', ' ')
            console.log("my error: " + errorKey);
            res.status(401).render('error', { success: false, error: errorKey, message: e._message });;
        }
    } else {
        res.status(401).json({ success: true, message: 'Invalid user id' });
    }
});

module.exports = router;
