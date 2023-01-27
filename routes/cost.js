const express = require("express");
const router = express.Router();
const Cost = require("../models/cost");
const { getUserById } = require('../utils/userUtils');

/* GET cost page. */
router.get('/',function(req,res,next){
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
                category,
                sum,
                userId: id,
            });
            const result = await cost.save();
            res.status(200).json({ success: true, result });
        } catch (e) {
            console.log("my error" + e);
            res.status(401).json({ success: false, error: e });
        }
    } else {
        res.status(401).json({ success: true, message: 'Invalid user id' });
    }
});

module.exports = router;
