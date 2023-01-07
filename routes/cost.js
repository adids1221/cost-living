const express = require("express");
const router = express.Router();
const Cost = require("../models/cost");
const { getUserById } = require('../utils/userUtils');

router.post("/addcost", async (req, res) => {
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
            res.status(401).json({ success: false, error: e });
        }
    } else {
        res.status(401).json({ success: true, message: 'Invalid user id' });
    }
});

router.get("/about", (req, res) => {
    res.json({
        developer1: {
            first_name: "Adi",
            last_name: "Mordo",
            id: "313531634",
            email: "adids1221@gmail.com",
        },
        developer2: {
            first_name: "Stav",
            last_name: "Gallula",
            id: "205969868",
            email: "",
        },
    });
});

module.exports = router;