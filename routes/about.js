const express = require("express");
const router = express.Router();

/* GET about page. */
router.get('/', function(req, res, next) {
    const aboutJson = {
        "developer1": {
            "first_name": "Adi",
            "last_name": "Mordo",
            "id": "313531634",
            "email": "adids1221@gmail.com",
        },
        "developer2": {
            "first_name": "Stav",
            "last_name": "Gallula",
            "id": "205969868",
            "email": "stavgallula@gmail.com",
        },
    };
    res.render('about', {title:aboutJson});
});

module.exports = router;