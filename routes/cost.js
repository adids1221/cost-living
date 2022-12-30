const express = require("express");
const router = express.Router();
const Cost = require("../models/cost");
const User = require("../models/user");

router.post("/addcost", async (req, res) => {
    const user = await User.findById(req.user.id);
    if (user) {
        const { description, date, category, price } = req.body;
        const cost = new Cost({
            description,
            date,
            category,
            price,
            userId: user._id,
        });
        cost.save((err) => {
            console.log(err);
            res.redirect("/expenses");
        });
    } else {
        res.status(401)
        throw new Error('Invalid user id.')
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